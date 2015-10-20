Template.TEMPLATE_NAME.rendered = function() {
	function resizeEditor() {
		if(!$(".CodeMirror").length) {
			return;
		}
		var viewHeight = $(window).height();
		var footerHeight = $("#footer").outerHeight();
		var codeTop = $(".CodeMirror").offset().top;

		var availableHeight = viewHeight - footerHeight - codeTop;
		if(availableHeight < 200) {
			availableHeight = 200;
		}

		$(".CodeMirror").height(availableHeight);
	}

	resizeEditor();

	$(window).on('resize', function() {
		resizeEditor();
	});
}

Template.TEMPLATE_NAME.helpers({
	"editorOptions": function() {
		return {
            styleActiveLine: true,
			lineNumbers: true,
			mode: "application/ld+json",
			keyMap: "sublime",
			theme: "blackboard",
			gutters: ["CodeMirror-lint-markers","CodeMirror-linenumbers","CodeMirror-foldgutter"],
			lint: true
		}
	},

	"editorCode": function() {
		var data = this.application.data;
		simplifyObject(data, this.metadata.data);
		objectRemoveMetadata(data);
		return JSON.stringify(data, null, '\t');
	}
});

Template.TEMPLATE_NAME.events({
	"click .save-button": function(e, t) {
		e.preventDefault();
		var code = t.$("#json-editor").val();
		var data = {};
		try {
			data = JSON.parse(code);
		} catch(e) {
			t.$("#app-editor-error-title").text("Error parsing JSON:");
			t.$("#app-editor-error-message").text(e.message);
			t.$(".app-editor-error").show();
			return;
		}
		t.$(".app-editor-error").hide();
		$(".save-button").button("loading");

		convertToVersion70(data);

		extendWithMetadata(data, "root", this.metadata.data);

		Applications.update({ _id: this.application._id }, { $set: { data: data }}, function(e) {
			$(".save-button").button("reset");
			if(e) {
				t.$("#app-editor-error-title").text("Error saving data:");
				t.$("#app-editor-error-message").text(e.message);
				t.$(".app-editor-error").show();
				return;
			}
		});
	},

	"click .app-editor-error-close": function(e, t) {
		e.preventDefault();
		$(".app-editor-error").hide();
	},

	"click .github-push-button": function(e, t) {
		bootboxDialog("GithubDialog", this, {
			title: "<span class=\"fa fa-github\"></span> Push to GitHub",
			animate: false
		});
	}
});


Template.GithubDialog.rendered = function() {
	pageSession.set("errorMessage", "");
	pageSession.set("githubRepos", {});

	Meteor.call("githubListRepos", function(e, r) {
		if(e) {
			console.log(e);
			pageSession.set("errorMessage", e.message);
		}
		pageSession.set("githubRepos", r);
	});
}

Template.GithubDialog.helpers({
	"errorMessage": function() {
		return pageSession.get("errorMessage");
	},

	"githubError": function() {
		var data = pageSession.get("githubRepos");
		if(data && data.status) {
			return data.message;
		}
		return "";
	},

	"githubRepos": function() {
		var self = this;

		if(!this.application) {
			return [];
		}

		var repos = pageSession.get("githubRepos");
		if(!repos || repos.status) {
			return [];
		}

		var result = [];
		_.each(repos.data, function(repo) {
			result.push({
				name: repo,
				selected: repo == self.application.githubRepo ? "selected": ""
			});
		});
		return result;
	}
});

Template.GithubDialog.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("errorMessage", "");
		var self = this;

		var submitButton = $(e.currentTarget).find("#form-submit-button");
		submitButton.button("loading");

		function errorAction(msg) {
			var message = msg || "Error.";
			pageSession.set("errorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				Meteor.call("githubPushInputJson", self.application._id, self.metadata._id, values.githubRepo, values.commitMessage, function(e, r) {
					submitButton.button("reset");
					if(e) {
						errorAction(e.message);
						return;
					} else {
						// set as default
						Applications.update({ _id: self.application._id }, { $set: { githubRepo: values.githubRepo }});
					}

					bootbox.hideAll();
				});
			}
		);
		return false;
	},
	"click #form-cancel-button": function(e, t) {
		bootbox.hideAll();
	}
});

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
			lineNumbers: true,
			mode: "application/ld+json",
			keyMap: "sublime",
			theme: "blackboard",
			gutters: ["CodeMirror-lint-markers"],
			lint: true
		}
	},

	"editorCode": function() {
		var data = this.application.data;
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

		var hasFreeZone = data.application.free_zone;

		extendWithMetadata(data, "root", this.metadata.data);

		if(hasFreeZone) {
			delete data.application.public_zone;
			delete data.application.private_zone;
		} else {
			delete data.application.free_zone;
		}

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
	}
});

var pageSession = new ReactiveDict();

Template.ApplicationsDetailsJsonView.rendered = function() {
	
};

Template.ApplicationsDetailsJsonView.events({
	
});

Template.ApplicationsDetailsJsonView.helpers({
	
});




function expandParents(item) {
	var closestLi = item.parent().parents("li.collapsed").first();
	if(closestLi.length) {
		closestLi.removeClass("collapsed");

		var span = closestLi.find("span.fa").first();
		span.removeClass("fa-caret-right");
		span.addClass("fa-caret-down");

		var link = closestLi.find("a").first();
		expandParents(link);
	}
}

function selectInCodeMirror( params ) {
	
	// console.log("selectInCodeMirror params=",params);
	// selectInCodeMirror({ applicationId: this.rootId, objectId: objectId, propertyName: propertyName });
	
	var propertyName = params.propertyName;
	
	var cm = $("#json-editor").next(".CodeMirror");
	
	if( cm == null || cm[0]  == null) {
		console.log("No CodeMirror found, but that's ok. ");
		return;
	} 
	
	if( propertyName == null || propertyName == "")
		return;
	 
	cm = cm[0].CodeMirror;
	
	cm.eachLine( function f(line) {
		
		var index = line.text.indexOf(propertyName);
		if( index > -1 ) {
			var lineNumber = cm.doc.getLineNumber( line );
			cm.doc.setSelection( {line: lineNumber} );
			cm.scrollIntoView( { line: lineNumber}, 200 );
			
			// cm.doc.markText( {line: lineNumber}, {line: lineNumber }, {clearOnEnter:true} );
			return true;	
		}
		
	}); 
	
	
}
function selectItem(link) {
	var li = link.parent();
	var container = link.closest("div");
	var span = link.find("span.fa").first();

	if(link.hasClass("collapsable-item") && li.hasClass("active")) {
		li.toggleClass("collapsed");

		if(li.hasClass("collapsed")) {
			span.removeClass("fa-caret-down");
			span.addClass("fa-caret-right");
		} else {
			span.removeClass("fa-caret-right");
			span.addClass("fa-caret-down");
		}
	} else {
		container.find("li.active").removeClass("active");
		li.addClass("active");
	}
	
	
	
	
}

function selectRequestedOrFirstItem() {
	// highlight object passed as param or first object found in tree
	if(Router.current() && Router.current().params) {
		var routeName = Router.current().route.getName();
		if(routeName != "applications.details.json_view") {
			return;
		}
		var objectId = Router.current().params.objectId || "";
		var propertyName = Router.current().params.propertyName || "";

		if(objectId == "null") objectId = "";
		if(propertyName == "null") propertyName = "";

		if(objectId) {
			var link = null;
			if(propertyName) {
				link = $(".object-tree-array[data-object-id='" + objectId + "'][data-property-name='" + propertyName + "']").first();
			} else {
				link = $(".object-tree-link[data-object-id='" + objectId + "']").first();
			}
			expandParents(link);
			selectItem(link);
		} else {
			$(".object-tree-link").first().click();
			return;
		}
	}	
}

Template.ApplicationsDetailsJsonViewJsonTree.rendered = function() {
	function resizeTree() {
		if(!$(".object-tree-container").length) {
			return;
		}
		var viewHeight = $(window).height();
		var footerHeight = $("#footer").outerHeight();
		var treeTop = $(".object-tree-container").offset().top;
		var treeHeight = $(".object-tree-container").height();
		var treeOuterHeight = $(".object-tree-container").outerHeight();
		var treeMarginTop = parseInt($(".object-tree-container").css("margin-top") || "0");
		var treeMarginBottom = parseInt($(".object-tree-container").css("margin-bottom") || "0");
		var availableHeight = viewHeight - footerHeight - treeTop - ((treeOuterHeight - treeHeight) + treeMarginTop + treeMarginBottom);
		if(availableHeight < 200) {
			availableHeight = 200;
		}

		$(".object-tree-container").height(availableHeight);
	}

	$(window).on('resize', function() {
		resizeTree();
	});

	resizeTree();
	selectRequestedOrFirstItem();
};

Template.ApplicationsDetailsJsonViewJsonTree.events({

});

Template.ApplicationsDetailsJsonViewJsonTree.helpers({
});


Template.jsonTreeView.rendered = function() {
}

// Deps.autorun(function() {
// 	if(Router.current() && Router.current().url) {
// 		selectRequestedOrFirstItem();
// 	}
// });

Template.jsonTreeView.helpers({
	"objectMembers": function(rootId, object, meta) {
	
		var properties = [];
		for(var propertyName in object) {
			var property = object[propertyName];

			var isObject = false;
			var isArray = false;
			var id = "";
			var collapsable = false;
			var cssClass = "";

			if(_.isArray(property)) {
				id = object._id || "";
				var type = object.objectType || "";
				var arrayItemType = getObjectArrayItemType(type, propertyName, meta);
				isArray = arrayItemType != "string";
				collapsable = true;
				cssClass = "collapsable-item";
			} else {
				if(_.isObject(property)) {
					id = property._id || "";
					var type = property.objectType || "";
					isObject = type != "";
					// make everything collapsable
					collapsable = true;
					cssClass = "collapsable-item";
				}
			}
			
			
			if(isArray || isObject) {
				properties.push({
					rootId: rootId,
					objectId: id,
					name: propertyName,
					isObject: isObject,
					isArray: isArray,
					data: property,
					meta: meta,
					collapsable: collapsable,
					cssClass: cssClass
				});
			}
		}
		return properties;	
	},
	"objectArray": function(rootId, array, meta) {
		var objects = [];
		_.each(array, function(item, index) {
			if(_.isObject(item)) {
				var id = item._id || "";
				var name = item.name || item.title || item.source || item.objectType + " " + (index + 1);

				objects.push({ rootId: rootId, objectId: id, name: name, data: item, meta: meta, collapsable: true, cssClass: "object-item collapsable-item" });
			}
		});
		return objects;
	},

	"arrayItemCount": function(array) {
		return array ? array.length : 0;
	}
});

Template.jsonTreeView.events({
	"click .object-tree-link": function(e, t) {
		e.preventDefault();
		
		
		var link = $(e.currentTarget);
		var objectId = this.objectId || "";

		if(objectId) {
			var propertyName = link.attr("data-property-name") || "";

			var redirect = false;
			if(Router.current() && Router.current().route) {
				var routeName = Router.current().route.getName();
				if(routeName != "applications.details.json_view") {
					return false;
				}
				var currentObjectId = Router.current().params.objectId || "";
				var currentPropertyName = Router.current().params.propertyName || "";

				if(currentObjectId == "null") currentObjectId = "";
				if(currentPropertyName == "null") currentPropertyName = "";

				if(objectId == currentObjectId && propertyName == currentPropertyName) {
					redirect = false;
				}
			}

			if(propertyName) {
				if(redirect) {
					console.log( 'Router.go("applications.details.json_view", { applicationId: this.rootId, objectId: objectId, propertyName: propertyName });');
				} else {
					selectItem(link);
					selectInCodeMirror({ applicationId: this.rootId, objectId: objectId, propertyName: propertyName });
				}
			} else {
				if(redirect) {
					console.log( 'Router.go("applications.details.json_view", { applicationId: this.rootId, objectId: objectId, propertyName: null });');
				} else {
					selectItem(link);
					selectInCodeMirror({ applicationId: this.rootId, objectId: objectId, propertyName: propertyName });
				}
			}
		}
		return false;
	}
});


Template.ApplicationsDetailsJsonViewForm.rendered = function() {
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

Template.ApplicationsDetailsJsonViewForm.helpers({
	"editorOptions": function() {
		return {
            styleActiveLine: true,
			lineNumbers: true,
			extraKeys: {"Ctrl-Q": function(cm){ cm.foldCode(cm.getCursor()); }},
    		foldGutter: true,
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

Template.ApplicationsDetailsJsonViewForm.events({
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

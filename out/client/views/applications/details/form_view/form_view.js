var pageSession = new ReactiveDict();

Template.ApplicationsDetailsFormView.rendered = function() {
	
};

Template.ApplicationsDetailsFormView.events({
	
});

Template.ApplicationsDetailsFormView.helpers({
	
});



function expandParentsObjectTree(item) {
	var closestLi = item.parent().parents("li.collapsed").first();
	if(closestLi.length) {
		closestLi.removeClass("collapsed");

		var span = closestLi.find("span.fa").first();
		span.removeClass("fa-caret-right");
		span.addClass("fa-caret-down");

		var link = closestLi.find("a").first();
		expandParentsObjectTree(link);
	}
}

function selectItemObjectTree(link) {
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

function selectRequestedOrFirstItemObjectTree() {
	// highlight object passed as param or first object found in tree
	if(Router.current() && Router.current().params) {
		var routeName = Router.current().route.getName();
		if(routeName != "applications.details.form_view") {
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
			expandParentsObjectTree(link);
			selectItemObjectTree(link);
		} else {
			$(".object-tree-link").first().click();
			return;
		}
	}	
}

Template.ApplicationsDetailsFormViewTree.rendered = function() {
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
	selectRequestedOrFirstItemObjectTree();
};

Template.ApplicationsDetailsFormViewTree.events({

});

Template.ApplicationsDetailsFormViewTree.helpers({
});


Template.objectTreeView.rendered = function() {
}

/*
Deps.autorun(function() {
	if(Router.current() && Router.current().url) {
		selectRequestedOrFirstItemObjectTree();
	}
});

*/

Template.objectTreeView.helpers({
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

Template.objectTreeView.events({
	"click .object-tree-link": function(e, t) {
		e.preventDefault();

		var link = $(e.currentTarget);
		var objectId = this.objectId || "";

		if(objectId) {
			var propertyName = link.attr("data-property-name") || "";

			var redirect = true;
			if(Router.current() && Router.current().route) {
				var routeName = Router.current().route.getName();
				if(routeName != "applications.details.form_view") {
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
					selectItemObjectTree(link);
					Router.go("applications.details.form_view", { applicationId: this.rootId, objectId: objectId, propertyName: propertyName });
				} else {
					selectItemObjectTree(link);
				}
			} else {
				if(redirect) {
					selectItemObjectTree(link);
					Router.go("applications.details.form_view", { applicationId: this.rootId, objectId: objectId, propertyName: null });
				} else {
					selectItemObjectTree(link);
				}
			}
		}
		return false;
	}
});


function resizeForm() {
	if(!$(".object-form-container").length) {
		return;
	}
	var viewHeight = $(window).height();

	var footerHeight = $("#footer").outerHeight();
	var formTop = $(".object-form-container").offset().top;
	var formHeight = $(".object-form-container").height();
	var formOuterHeight = $(".object-form-container").outerHeight();
	var formMarginTop = parseInt($(".object-form-container").css("margin-top") || "0");
	var formMarginBottom = parseInt($(".object-form-container").css("margin-bottom") || "0");
	var availableHeight = viewHeight - footerHeight - formTop - ((formOuterHeight - formHeight) + formMarginTop + formMarginBottom);

	if(availableHeight < 200) {
		availableHeight = 200;
	}

	$(".object-form-container").height(availableHeight);
}

Template.ApplicationsDetailsFormViewForm.rendered = function() {

	$(window).on('resize', function() {
		resizeForm();
	});

	resizeForm();

	pageSession.set("mode", "defaultMode");
};

Deps.autorun(function() {
	if(Router.current() && Router.current().url) {
		pageSession.set("mode", "");
		Meteor.defer(function() {
			pageSession.set("mode", "defaultMode");
			resizeForm();
		});
	}
});

Template.ApplicationsDetailsFormViewForm.helpers({
	"defaultMode": function() {
		return pageSession.get("mode") == "defaultMode";
	},

	"chooseTypeMode": function() {
		return pageSession.get("mode") == "chooseTypeMode";
	},

	"newObjectMode": function() {
		return pageSession.get("mode") == "newObjectMode";
	},

	"newObjectType": function() {
		return pageSession.get("newObjectType");
	},

	"title": function() {
		if(!this.application) return "";
 		var containerObject = this.application.data;
 		var objectId = this.params.objectId;
 		var meta = this.metadata.data;

 		var object = findObjectById(containerObject, objectId);

 		if(!object || !object.objectType) {
 			return false;
 		}

 		var title = object.objectType;
 		if(_.isArray(object[this.params.propertyName])) {
 			title = this.params.propertyName;
 		}

 		return title;
	},

	"objectTabs": function(showParent) {
		var tabs = [];
		if(!this.application) return false;
		var containerObject = this.application.data;
		var objectId = this.params.objectId;
		var meta = this.metadata.data;
		var applicationId = this.params.applicationId;

		var object = findObjectById(containerObject, objectId);

		if(!object || !object.objectType) {
			return [];
		}

		var title = object.objectType;
		var propertyName = this.params.propertyName;
		var parent = findDirectParent(containerObject, objectId);
		if(parent && !_.isArray(parent) && object.objectType != "application") {
			if(showParent) {
				propertyName = parentPropertyName(parent, object);
				object = parent;
				objectId = parent._id;
				title = object.objectType;
			} else {
				title = parentPropertyName(parent, object) || title;
			}
		} else {
			if(!showParent) return [];
		}

		tabs.push({
			itemTitle: title,
			propertyName: "null",
			cssClass: propertyName == "null" ? "active" : "",
			objectId: object._id,
			applicationId: applicationId
		});

		for(var key in object) {
			if(_.isArray(object[key]) && getObjectArrayItemType(object.objectType, key, meta) != "string") {
				tabs.push({
					itemTitle: key,
					propertyName: key,
					cssClass: propertyName == key ? "active" : "",
					objectId: object._id,
					applicationId: applicationId
				});
			}
			if(_.isObject(object[key]) && object[key].objectType) {
				tabs.push({
					itemTitle: key,
					propertyName: "null",
					cssClass: propertyName == key ? "active" : "",
					objectId: object[key]._id,
					applicationId: applicationId
				});
			}
		}

		if(tabs.length < 2) return [];

		return tabs;
	},


	"isObject": function() {
		if(!this.application) return false;
 		var containerObject = this.application.data;
 		var objectId = this.params.objectId;
 		var meta = this.metadata.data;

 		var object = findObjectById(containerObject, objectId);

 		if(!object || !object.objectType) {
 			return false;
 		}

 		return !_.isArray(object[this.params.propertyName]);
	},

	"isArray": function() {
		if(!this.application) return false;
		var containerObject = this.application.data;
		var objectId = this.params.objectId;
		var meta = this.metadata.data;

		var object = findObjectById(containerObject, objectId);

		if(!object || !object.objectType) {
			return false;
		}

		return _.isArray(object[this.params.propertyName]);
	},

	"newObjectForm": function() {
		var containerObject = this.application.data;
		var objectId = this.params.objectId;
		var propertyName = this.params.propertyName;
		var meta = this.metadata.data;

		var object = findObjectById(containerObject, objectId);

		if(!object || !object.objectType) {
			return null;
		}

		var newObjectType = pageSession.get("newObjectType");
		if(!newObjectType) {
			return null;
		}

		var objectMeta = getObjectMetadata(newObjectType, meta);
		if(!objectMeta) {
			return null;
		}


		// generate form fields from object and objectMeta
		var fieldCounter = 0;
		var formFields = [];
		var editableFieldCounter = 0;
		_.each(objectMeta.members, function(member) {
			var control = "";
			var controlType = "";
			var choiceItems = [];
			var required = member.required ? true : false;
			var dataType = "";
			var description = member.description;

			switch(member.input) {
				case "text": {
					control = "input";
					controlType = "text";
				}; break;

				case "static": {
					control = "static";
				}; break;

				case "textarea": {
					control = "textarea";
				}; break;

				case "checkbox": {
				control = "checkbox";
					var items = member.choice_items || [];
					if(!items.length) {
						choiceItems.push({ title: member.name });
					} else {
						_.each(items, function(item) {
							choiceItems.push({ value: item, title: item});
						});
					}
				}; break;

				case "select": {
					control = "select";
					var items = member.choice_items || [];
					_.each(items, function(item) {
						choiceItems.push({ value: item, title: item });
					});
				}; break;

				case "radio": {
					control = "radio";
					var items = member.choice_items || [];
					_.each(items, function(item) {
						choiceItems.push({ value: item, title: item });
					});
				}; break;

				case "stringlist": {
					control = "textarea";
					dataType = "array";
				}; break;

				case "json": {
					control = "json";
					dataType = "json";
				}; break;

				case "javascript": {
					control = "javascript";
				}; break;

				case "html": {
					control = "html";
				}; break;

				case "markdown": {
					control = "markdown";
				}; break;

				case "select_collection": {
					control = "select";
					choiceItems.push({ value: "", title: "" });
					choiceItems.push({ value: "users", title: "users" });
					if(containerObject && containerObject.application) {
						_.each(containerObject.application.collections, function(collection) {
							choiceItems.push({ value: collection.name, title: collection.name });
						});
					}
				}; break;

				case "select_query": {
					control = "select";
					choiceItems.push({ value: "", title: "" });
					if(containerObject && containerObject.application) {
						_.each(containerObject.application.queries, function(query) {
							choiceItems.push({ value: query.name, title: query.name });
						});
					}
				}; break;

				case "select_route": {
					control = "select";
					choiceItems.push({ value: "", title: "" });

					if(containerObject && containerObject.application) {
						var routes = getAllRoutesInCurrentZone(containerObject.application, objectId);
						_.each(routes, function(route) {
							choiceItems.push({ value: route, title: route });
						});
					}
				}; break;
			}

			if(control) {
				formFields.push({
					name: member.name,
					title: member.title,
					control: control,
					type: controlType,
					dataType: dataType,
					items: choiceItems,
					required: required,
					autofocus: fieldCounter == 0,
					description: description
				});
				fieldCounter++;
				if(control != "static") {
					editableFieldCounter++;
				}
			}
		});

		var self = this;

		var newObject = {};
		extendWithMetadata(newObject, newObjectType, meta);

		var submitButton = editableFieldCounter > 0 ? "Save" : "";
		var cancelButton = editableFieldCounter > 0 ? "Cancel" : "";

		return {
			title: "New " + newObjectType,
			data: newObject,

			cssClass: "",
			formStyle: "horizontal",

			fields: formFields,

			submitButton: submitButton,
			cancelButton: cancelButton,

			onSubmit: function(values) {
				$(".submit-button").button("loading");
				var array = object[propertyName];
				if(!_.isArray(array)) {
					return false;
				}
				extendWithMetadata(values, newObjectType, meta);
				array.push(values);

				Applications.update({ _id: self.application._id }, { $set: { data: containerObject }}, function(e) {
					$(".submit-button").button("reset");
					if(e) {
						// show error !!!
					}
					pageSession.set("mode", "defaultMode");
				});
			},

			onCancel: function(values) {
				pageSession.set("mode", "defaultMode");
			}
		}
	},

	"editObjectForm": function() {
		var containerObject = this.application.data;
		var objectId = this.params.objectId;
		var meta = this.metadata.data;

		var object = findObjectById(containerObject, objectId);
		if(!object || !object.objectType) {
			return null;
		}

		var objectMeta = getObjectMetadata(object.objectType, meta);
		if(!objectMeta) {
			return null;
		}

		// generate form fields from object and objectMeta
		var fieldCounter = 0;
		var editableFieldCounter = 0;
		var formFields = [];
		_.each(objectMeta.members, function(member) {
			var control = "";
			var controlType = "";
			var choiceItems = [];
			var required = member.required ? true : false;
			var dataType = "";
			var description = member.description;

			switch(member.input) {
				case "text": {
					control = "input";
					controlType = "text";
				}; break;

				case "static": {
					control = "static";
				}; break;

				case "textarea": {
					control = "textarea";
				}; break;

				case "checkbox": {
				control = "checkbox";
					var items = member.choice_items || [];
					if(!items.length) {
						choiceItems.push({ title: member.name });
					} else {
						_.each(items, function(item) {
							choiceItems.push({ value: item, title: item});
						});
					}
				}; break;

				case "select": {
					control = "select";
					var items = member.choice_items || [];
					_.each(items, function(item) {
						choiceItems.push({ value: item, title: item });
					});
				}; break;

				case "radio": {
					control = "radio";
					var items = member.choice_items || [];
					_.each(items, function(item) {
						choiceItems.push({ value: item, title: item });
					});
				}; break;

				case "stringlist": {
					control = "textarea";
					dataType = "array";
				}; break;

				case "json": {
					control = "json";
					dataType = "json";
				}; break;

				case "javascript": {
					control = "javascript";
				}; break;

				case "html": {
					control = "html";
				}; break;

				case "markdown": {
					control = "markdown";
				}; break;

				case "select_collection": {
					control = "select";
					choiceItems.push({ value: "", title: "" });
					choiceItems.push({ value: "users", title: "users" });
					if(containerObject && containerObject.application) {
						_.each(containerObject.application.collections, function(collection) {
							choiceItems.push({ value: collection.name, title: collection.name });
						});
					}
				}; break;

				case "select_query": {
					control = "select";
					choiceItems.push({ value: "", title: "" });
					if(containerObject && containerObject.application) {
						_.each(containerObject.application.queries, function(query) {
							choiceItems.push({ value: query.name, title: query.name });
						});
					}
				}; break;

				case "select_route": {
					control = "select";
					choiceItems.push({ value: "", title: "" });

					if(containerObject && containerObject.application) {
						var routes = getAllRoutesInCurrentZone(containerObject.application, objectId);
						_.each(routes, function(route) {
							choiceItems.push({ value: route, title: route });
						});
					}
				}; break;
			}

			if(control) {
				formFields.push({
					name: member.name,
					title: member.title,
					control: control,
					type: controlType,
					dataType: dataType,
					items: choiceItems,
					required: required,
					autofocus: fieldCounter == 0,
					description: description
				});
				fieldCounter++;
				if(control != "static") {
					editableFieldCounter++;
				}
			}
		});

		var self = this;

		var title = object.objectType;
		if(object.name) {
			title = object.objectType + ": " + object.name;
		} else {
			var parent = findDirectParent(containerObject, object._id);
			if(_.isObject(parent) && parent._id) {
				title = parentPropertyName(parent, object) || title;
			}
		}

		var submitButton = editableFieldCounter > 0 ? "Save" : "";
		return {
			title: title,

			data: object,

			cssClass: "",
			formStyle: "horizontal",

			fields: formFields,

			submitButton: submitButton,

			onSubmit: function(values) {
				$(".submit-button").button("loading");
				for(keyName in values) {
					object[keyName] = values[keyName];
				}
				Applications.update({ _id: self.application._id }, { $set: { data: containerObject }}, function(e) {
					$(".submit-button").button("reset");
					if(e) {
						// show error !!!
					}
					pageSession.set("mode", "defaultMode");
				});
			}
		}
	},

	"objectTypeForm": function() {
		var containerObject = this.application.data;
		var objectId = this.params.objectId;
		var propertyName = this.params.propertyName;
		var meta = this.metadata.data;

		var object = findObjectById(containerObject, objectId);

		if(!object || !object.objectType) {
			return null;
		}

		var arrayItemType = getObjectArrayItemType(object.objectType, propertyName, meta);
		if(!arrayItemType) {
			return null;
		}

		var derivedTypes = getDerivedTypes(arrayItemType, true, meta);
		if(derivedTypes.length <= 0) {
			return null;
		}

		if(derivedTypes.length == 1) {
			pageSession.set("newObjectType", derivedTypes[0]);
			pageSession.set("mode", "newObjectMode");
		} else {
			var info = { objectType: derivedTypes[0] };

			var choiceItems = [];
			_.each(derivedTypes, function(derivedType) {
				choiceItems.push({
					value: derivedType,
					title: derivedType
				});
			});

	 		var formFields = [
				{
					name: "objectType",
					title: "Object type",
					control: "radio",
					items: choiceItems,
					type: "",
					required: true,
					autofocus: true
				}
	 		];

			return {
				title: "New object",
				data: info,

				cssClass: "",
				formStyle: "horizontal",

				fields: formFields,

				submitButton: "OK",
				cancelButton: "Cancel",

				onSubmit: function(values) {
					$(".submit-button").button("loading");
					pageSession.set("newObjectType", values.objectType);
					pageSession.set("mode", "newObjectMode");
					$(".submit-button").button("reset");
				},
				onCancel: function(values) {
					pageSession.set("mode", "defaultMode");
				}
			}
		}
	}
});

Template.ApplicationsDetailsFormViewForm.events({
	"click #object-array-insert-button": function(e, t) {
		e.preventDefault();

		pageSession.set("mode", "chooseTypeMode");
	},

	"click .object-array-table tr": function(e, t) {
		e.preventDefault();
		Router.go("applications.details.form_view", { applicationId: this.rootId, objectId: this.objectId, propertyName: null });
		return false;
	},

	"click #delete-button": function(e, t) {
		e.preventDefault();

		var self = this;

		var containerObject = UI._parentData(0).application.data;
		var meta = UI._parentData(0).metadata.data;
		var applicationId = UI._parentData(0).application._id;

		var objectId = this.objectId;
		var object = findObjectById(containerObject, objectId);

		if(!object || !object.objectType) {
			return null;
		}

		bootbox.dialog({
			message: "Delete? Are you sure?",
			title: "Delete",
			animate: false,
			buttons: {
				success: {
					label: "Yes",
					className: "btn-success",
					callback: function() {
						deleteObjectWithId(containerObject, objectId);

						Applications.update({ _id: applicationId }, { $set: { data: containerObject }}, function(e) {
							if(e) {
								// show error !!!
							}
						});
					}
				},
				danger: {
					label: "No",
					className: "btn-default"
				}
			}
		});

		return false;
	},
	"click .object-tab-item": function(e, t) {
		e.preventDefault();
		Router.go("applications.details.form_view", { applicationId: this.applicationId, objectId: this.objectId, propertyName: this.propertyName });
	}
});

Template.ApplicationsDetailsFormViewFormGenericArrayView.helpers({
	"objectArrayItems": function() {
		if(!this.application) return [];
		var containerObject = this.application.data;
		var objectId = this.params.objectId;
		var meta = this.metadata.data;

		var object = findObjectById(containerObject, objectId);

		if(!object || !object.objectType) {
			return [];
		}

		var array = object[this.params.propertyName];
		if(!_.isArray(array)) {
			return [];
		}

		var self = this;

		var list = [];
		var nonameCounter = 1;
		_.each(array, function(item) {
			if(_.isObject(item)) {
				var title = item.name || item.title || item.source || item.objectType + (nonameCounter++);

				list.push({
					itemTitle: title,
					objectId: item._id,
					rootId: self.application._id
				});
			}
		});

 		return list;
	}
});

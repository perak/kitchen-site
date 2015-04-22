Template.TEMPLATE_NAME.rendered = function() {
	pageSession.set("mode", "defaultMode");
}

Deps.autorun(function() {
	if(Router.current() && Router.current().url) {
		pageSession.set("mode", "");
		Meteor.defer(function() {
			pageSession.set("mode", "defaultMode");
		});
	}
});

Template.TEMPLATE_NAME.helpers({
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

	"objectArrayItems": function() {
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
					if(containerObject && containerObject.application) {
						_.each(containerObject.application.collections, function(collection) {
							choiceItems.push({ value: collection.name, title: collection.name });

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
					if(containerObject && containerObject.application) {
						_.each(containerObject.application.collections, function(collection) {
							choiceItems.push({ value: collection.name, title: collection.name });
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

		var submitButton = editableFieldCounter > 0 ? "Save" : "";
		return {
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

Template.TEMPLATE_NAME.events({
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
	}
});

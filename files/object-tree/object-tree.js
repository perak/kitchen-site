Template.TEMPLATE_NAME.events({

});

Template.TEMPLATE_NAME.helpers({
});

function expandItem(item) {
	var closestLi = item.closest("li.collapsed");
	if(closestLi.length) {
		closestLi.removeClass("collapsed");
		expandItem(closestLi.parent());		
	}
}

function selectRequestedOrFirstItem() {
	// highlight object passed as param or first object found in tree
	if(Router.current() && Router.current().params) {
		var routeName = Router.current().route.getName();
		if(routeName != "PAGE_ROUTE_NAME") {
			return;
		}
		var objectId = Router.current().params.objectId || "";
		var propertyName = Router.current().params.propertyName || "";

		if(objectId) {
			if(objectId != "null") {
				if(propertyName && propertyName != "null") {
					var item = $(".object-tree-array[data-object-id='" + objectId + "'][data-property-name='" + propertyName + "']").first();
					expandItem(item);
					item.click();
				} else {
					var item = $(".object-tree-link[data-object-id='" + objectId + "']").first();
					expandItem(item);
					item.click();
				}
			} else {
				$(".object-tree-link").first().click();
			}
		}
	}	
}

Template.objectTreeView.rendered = function() {
	selectRequestedOrFirstItem();
}

Deps.autorun(function() {
	if(Router.current() && Router.current().url) {
		selectRequestedOrFirstItem();
	}
});

Template.objectTreeView.helpers({
	"objectMembers": function(rootId, object, meta) {

		var properties = [];
		for(var propertyName in object) {
			var property = object[propertyName];

			var isObject = false;
			var isArray = false;
			var id = "";
			var cssClass = "";

			if(_.isArray(property)) {
				id = object._id || "";
				var type = object.objectType || "";
				var arrayItemType = getObjectArrayItemType(type, propertyName, meta);
				isArray = arrayItemType != "string";
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

				objects.push({ rootId: rootId, objectId: id, name: name, data: item, meta: meta, cssClass: "object-item" });
			}
		});
		return objects;
	},

	"arrayItemCount": function(array) {
		return array ? array.length : 0;
	}
});

Template.objectTreeView.events({
	"click .object-tree-array": function(e, t) {
		e.preventDefault();
		var link = $(e.currentTarget);
		var li = link.parent();
		var span = link.find("span.fa");

		if(li.hasClass("active")) {
			li.toggleClass("collapsed");

			if(li.hasClass("collapsed")) {
				span.removeClass("fa-caret-down");
				span.addClass("fa-caret-right");
			} else {
				span.removeClass("fa-caret-right");
				span.addClass("fa-caret-down");
			}
		}
		return false;
	},
	"click .object-tree-link": function(e, t) {
		e.preventDefault();

		var link = $(e.currentTarget);
		var li = link.parent();
		var container = link.closest("div");

		var objectId = this.objectId || "";

		if(objectId) {
			var propertyName = link.attr("data-property-name") || "";

			if(propertyName) {
				container.find("li.active").removeClass("active");
				li.addClass("active");
				Router.go("applications.details.form_view", { applicationId: this.rootId, objectId: objectId, propertyName: propertyName });
			} else {
				container.find("li.active").removeClass("active");
				li.addClass("active");
				Router.go("applications.details.form_view", { applicationId: this.rootId, objectId: objectId, propertyName: null });
			}
		}
		return false;
	}
});

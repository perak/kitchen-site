var pageSession = new ReactiveDict();

Template.Applications.rendered = function() {
	
};

Template.Applications.events({
	
});

Template.Applications.helpers({
	
});

var ApplicationsViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("ApplicationsViewSearchString");
	var sortBy = pageSession.get("ApplicationsViewSortBy");
	var sortAscending = pageSession.get("ApplicationsViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "initialTemplate", "githubRepo"];
		filtered = _.filter(raw, function(item) {
			var match = false;
			_.each(searchFields, function(field) {
				var value = (getPropertyValue(field, item) || "") + "";

				match = match || (value && value.match(regEx));
				if(match) {
					return false;
				}
			})
			return match;
		});
	}

	// sort
	if(sortBy) {
		filtered = _.sortBy(filtered, sortBy);

		// descending?
		if(!sortAscending) {
			filtered = filtered.reverse();
		}
	}

	return filtered;
};

var ApplicationsViewExport = function(cursor, fileType) {
	var data = ApplicationsViewItems(cursor);
	var exportFields = [];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.ApplicationsView.rendered = function() {
	pageSession.set("ApplicationsViewStyle", "table");
	
};

Template.ApplicationsView.events({
	"submit #dataview-controls": function(e, t) {
		return false;
	},

	"click #dataview-search-button": function(e, t) {
		e.preventDefault();
		var form = $(e.currentTarget).parent();
		if(form) {
			var searchInput = form.find("#dataview-search-input");
			if(searchInput) {
				searchInput.focus();
				var searchString = searchInput.val();
				pageSession.set("ApplicationsViewSearchString", searchString);
			}

		}
		return false;
	},

	"keydown #dataview-search-input": function(e, t) {
		if(e.which === 13)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					var searchString = searchInput.val();
					pageSession.set("ApplicationsViewSearchString", searchString);
				}

			}
			return false;
		}

		if(e.which === 27)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					searchInput.val("");
					pageSession.set("ApplicationsViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("applications.insert", {});
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		ApplicationsViewExport(this.applications, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		ApplicationsViewExport(this.applications, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		ApplicationsViewExport(this.applications, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		ApplicationsViewExport(this.applications, "json");
	}

	
});

Template.ApplicationsView.helpers({

	"insertButtonClass": function() {
		return Applications.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.applications || this.applications.count() == 0;
	},
	"isNotEmpty": function() {
		return this.applications && this.applications.count() > 0;
	},
	"isNotFound": function() {
		return this.applications && pageSession.get("ApplicationsViewSearchString") && ApplicationsViewItems(this.applications).length == 0;
	},
	"searchString": function() {
		return pageSession.get("ApplicationsViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("ApplicationsViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("ApplicationsViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("ApplicationsViewStyle") == "gallery";
	}

	
});


Template.ApplicationsViewTable.rendered = function() {
	
};

Template.ApplicationsViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("ApplicationsViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("ApplicationsViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("ApplicationsViewSortAscending") || false;
			pageSession.set("ApplicationsViewSortAscending", !sortAscending);
		} else {
			pageSession.set("ApplicationsViewSortAscending", true);
		}
	}
});

Template.ApplicationsViewTable.helpers({
	"tableItems": function() {
		return ApplicationsViewItems(this.applications);
	}
});


Template.ApplicationsViewTableItems.rendered = function() {
	
};

Template.ApplicationsViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		Router.go("applications.details", {applicationId: this._id, objectId: null, propertyName: null});
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Applications.update({ _id: this._id }, { $set: values });

		return false;
	},

	"click #delete-button": function(e, t) {
		e.preventDefault();
		var me = this;
		bootbox.dialog({
			message: "Delete? Are you sure?",
			title: "Delete",
			animate: false,
			buttons: {
				success: {
					label: "Yes",
					className: "btn-success",
					callback: function() {
						Applications.remove({ _id: me._id });
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
	"click #edit-button": function(e, t) {
		e.preventDefault();
		Router.go("applications.edit", {applicationId: this._id});
		return false;
	}
});

Template.ApplicationsViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Applications.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Applications.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

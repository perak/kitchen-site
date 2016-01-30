var pageSession = new ReactiveDict();

Template.AdminUsers.rendered = function() {
	
};

Template.AdminUsers.events({
	
});

Template.AdminUsers.helpers({
	
});

var AdminUsersViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("AdminUsersViewSearchString");
	var sortBy = pageSession.get("AdminUsersViewSortBy");
	var sortAscending = pageSession.get("AdminUsersViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["profile.name", "profile.email", "roles"];
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

var AdminUsersViewExport = function(cursor, fileType) {
	var data = AdminUsersViewItems(cursor);
	var exportFields = [];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.AdminUsersView.rendered = function() {
	pageSession.set("AdminUsersViewStyle", "table");
	
};

Template.AdminUsersView.events({
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
				pageSession.set("AdminUsersViewSearchString", searchString);
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
					pageSession.set("AdminUsersViewSearchString", searchString);
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
					pageSession.set("AdminUsersViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("admin.users.insert", {});
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		AdminUsersViewExport(this.admin_users, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		AdminUsersViewExport(this.admin_users, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		AdminUsersViewExport(this.admin_users, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		AdminUsersViewExport(this.admin_users, "json");
	}

	
});

Template.AdminUsersView.helpers({

	

	"isEmpty": function() {
		return !this.admin_users || this.admin_users.count() == 0;
	},
	"isNotEmpty": function() {
		return this.admin_users && this.admin_users.count() > 0;
	},
	"isNotFound": function() {
		return this.admin_users && pageSession.get("AdminUsersViewSearchString") && AdminUsersViewItems(this.admin_users).length == 0;
	},
	"searchString": function() {
		return pageSession.get("AdminUsersViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("AdminUsersViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("AdminUsersViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("AdminUsersViewStyle") == "gallery";
	}

	
});


Template.AdminUsersViewTable.rendered = function() {
	
};

Template.AdminUsersViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("AdminUsersViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("AdminUsersViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("AdminUsersViewSortAscending") || false;
			pageSession.set("AdminUsersViewSortAscending", !sortAscending);
		} else {
			pageSession.set("AdminUsersViewSortAscending", true);
		}
	}
});

Template.AdminUsersViewTable.helpers({
	"tableItems": function() {
		return AdminUsersViewItems(this.admin_users);
	}
});


Template.AdminUsersViewTableItems.rendered = function() {
	
};

Template.AdminUsersViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		
		Router.go("admin.users.details", {userId: this._id});
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Users.update({ _id: this._id }, { $set: values });

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
						Users.remove({ _id: me._id });
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
		Router.go("admin.users.edit", {userId: this._id});
		return false;
	}
});

Template.AdminUsersViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Users.isAdmin(Meteor.userId()) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Users.isAdmin(Meteor.userId()) ? "" : "hidden";
	}
});

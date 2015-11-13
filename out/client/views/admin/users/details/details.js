var pageSession = new ReactiveDict();

Template.AdminUsersDetails.rendered = function() {
	
};

Template.AdminUsersDetails.events({
	
});

Template.AdminUsersDetails.helpers({
	
});

Template.AdminUsersDetailsDetailsForm.rendered = function() {
	

	pageSession.set("adminUsersDetailsDetailsFormInfoMessage", "");
	pageSession.set("adminUsersDetailsDetailsFormErrorMessage", "");

	$(".input-group.date").each(function() {
		var format = $(this).find("input[type='text']").attr("data-format");

		if(format) {
			format = format.toLowerCase();
		}
		else {
			format = "mm/dd/yyyy";
		}

		$(this).datepicker({
			autoclose: true,
			todayHighlight: true,
			todayBtn: true,
			forceParse: false,
			keyboardNavigation: false,
			format: format
		});
	});

	$("input[type='file']").fileinput();
	$("select[data-role='tagsinput']").tagsinput();
	$(".bootstrap-tagsinput").addClass("form-control");
	$("input[autofocus]").focus();
};

Template.AdminUsersDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("adminUsersDetailsDetailsFormInfoMessage", "");
		pageSession.set("adminUsersDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var adminUsersDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(adminUsersDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("adminUsersDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("adminUsersDetailsDetailsFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		/*CANCEL_REDIRECT*/
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		Router.go("admin.users", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("admin.users", {});
	}

	
});

Template.AdminUsersDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("adminUsersDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("adminUsersDetailsDetailsFormErrorMessage");
	}
	
});

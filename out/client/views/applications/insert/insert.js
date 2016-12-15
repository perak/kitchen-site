var pageSession = new ReactiveDict();

Template.ApplicationsInsert.rendered = function() {
	
};

Template.ApplicationsInsert.events({
	
});

Template.ApplicationsInsert.helpers({
	
});

Template.ApplicationsInsertInsertForm.rendered = function() {
	

	pageSession.set("applicationsInsertInsertFormInfoMessage", "");
	pageSession.set("applicationsInsertInsertFormErrorMessage", "");

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

Template.ApplicationsInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("applicationsInsertInsertFormInfoMessage", "");
		pageSession.set("applicationsInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var applicationsInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(applicationsInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("applicationsInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("applications.details", {applicationId: newId, objectId: null, propertyName: null});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("applicationsInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = Applications.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("applications", {});
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		/*BACK_REDIRECT*/
	}

	
});

Template.ApplicationsInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("applicationsInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("applicationsInsertInsertFormErrorMessage");
	}
	
});

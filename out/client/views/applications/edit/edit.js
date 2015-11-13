var pageSession = new ReactiveDict();

Template.ApplicationsEdit.rendered = function() {
	
};

Template.ApplicationsEdit.events({
	
});

Template.ApplicationsEdit.helpers({
	
});

Template.ApplicationsEditEditForm.rendered = function() {
	

	pageSession.set("applicationsEditEditFormInfoMessage", "");
	pageSession.set("applicationsEditEditFormErrorMessage", "");

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

Template.ApplicationsEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("applicationsEditEditFormInfoMessage", "");
		pageSession.set("applicationsEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var applicationsEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(applicationsEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("applicationsEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("applications", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("applicationsEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Applications.update({ _id: t.data.application._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.ApplicationsEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("applicationsEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("applicationsEditEditFormErrorMessage");
	}
	
});

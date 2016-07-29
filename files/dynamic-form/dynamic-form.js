function getDynamicFormValues(form) {
	var values = {};

	$(form).find("input,select,textarea").each(function() {
		var tagName = $(this).prop("tagName").toLowerCase();
		var fieldType = $(this).attr("type") || "text";
		var fieldName = $(this).attr("name") || "";
		var fieldValue = $(this).val();

		if(fieldName) {
			// multiselect - I want empty array instead of null
			if(tagName == "select" && $(this).attr("multiple") && fieldValue == null) fieldValue = [];

			if(fieldType === "checkbox") {
				var checked = $(this).is(":checked");
				if(!fieldValue || fieldValue == "on") {
					// if field doesn't have value specified, result value is bool
					values[fieldName] = checked;
				} else {
					if(!values[fieldName]) {
						values[fieldName] = [];
					}
					if(checked) {
						values[fieldName].push(fieldValue);
					}
				}
			} else {
				if(fieldType === "radio") {
					if($(this).is(":checked")) {
						values[fieldName] = fieldValue;
					}
				} else {
					values[fieldName] = fieldValue;			
				}
			}
		}
	});
	return values;
}

function validateField(field, fieldValue, values) {
	if(!field) {
		return;
	}

	var error = null;
	var fieldName = field.name;
	var fieldValue = values[fieldName];
	var fieldTitle = field.title || field.name;
	var dataType = field.dataType || "";
	var control = field.control || "input";

	if(field.required && !fieldValue) {
		error = {
			field: fieldName,
			message: fieldTitle + " is required."
		};
	}

	if(dataType == "json") {
		if(fieldValue == "") {
			fieldValue = "{}";
		}

		try {
			values[fieldName] = JSON.parse(fieldValue);
		} catch(e) {
			error = {
				field: fieldName,
				message: "Error parsing JSON: " + e.message
			};
		}
	}

	if(control == "textarea" && dataType == "array") {
		var tmp = fieldValue.split("\n");
		var val = [];
		_.each(tmp, function(item) {
			if(item != "") {
				val.push(item);
			}
		});
		values[fieldName] = val;
	}

	// custom validation
	if(field.onValidate) {
		var message = field.onValidate(field, fieldValue, values);
		if(message) {
			error = {
				field: fieldName,
				message: message
			};
		}
	}

	return error;
}

function validateDynamicForm(description, values) {
	var errors = [];

	_.each(description.fields, function(field) {
		var fieldValue = values[field.name];
		var error = validateField(field, fieldValue, values);
		if(error) {
			errors.push(error);
		}
	});

	return errors;
}

function showFieldError(input, error, focus) {
	if(!input.length) {
		return;
	}

	var parent = input.parent();
	if(!parent.length) {
		return;
	}


	parent.addClass("has-error");

	var helpBlock = parent.find(".help-block");
	if(helpBlock.length) {
		helpBlock.text(error.message);
	}

	if(focus) {
		input.focus();
	}
}

function clearFieldError(input) {
	var parent = input.parent();
	if(!parent.length) {
		return;
	}

	parent.removeClass("has-error");

	var helpBlock = parent.find(".help-block");
	if(helpBlock.length) {
		helpBlock.text("");
	}
}

function showDynamicFormErrors(form, errors) {
	var focus = true;
	_.each(errors, function(error) {
		var input = $(form).find('input[name="' + error.field + '"],select[name="' + error.field + '"],textarea[name="' + error.field + '"]');
		showFieldError(input, error, focus);
		focus = false;
	});
}

function clearDynamicFormErrors(form) {
	$(form).find('input,select,textarea').each(function() {
		clearFieldError($(this));
	});
}

function setFieldValue(form, fieldName, fieldValue) {
	var input = $(form).find('input[name="' + fieldName + '"],select[name="' + fieldName + '"],textarea[name="' + fieldName + '"]');
	if(!input.length) {
		return;
	}

	var tagName = input.prop("tagName").toLowerCase();
	if(tagName == "input") {
		input.val(fieldValue);
	}
	// !!! TODO: implement for all field types ...
}

Template.DynamicForm.rendered = function() {
	$("input[autofocus], select[autofocus], textarea[autofocus]").first().focus();
};

Template.DynamicForm.helpers({
	"formDescription": function() {
		return this.description;
	},

	"formClass": function() {
		var formClass = this.cssClass || "";

		if(this.formStyle) {
			if(this.formStyle == "inline") {
				formClass = formClass + (formClass ? " form-inline": "form-inline");
			}
			if(this.formStyle == "horizontal") {
				formClass = formClass + (formClass ? " form-horizontal": "form-horizontal");
			}
		}

		return formClass;
	},
	"isHorizontal": function() {
		return this.formStyle == "horizontal";
	},
	"hasButtons": function() {
		return this.submitButton || this.cancelButton;
	}
});

Template.DynamicForm.events({
	"submit form": function(e, t) {
		if(t.data.description.onSubmit) {
			e.preventDefault();

			var values = getDynamicFormValues(e.currentTarget);
			var errors = validateDynamicForm(t.data.description, values);

			if(errors.length) {
				showDynamicFormErrors(e.currentTarget, errors);
			} else {
				t.data.description.onSubmit(values);
			}

			return false;
		}
		return true;
	},

	"click .cancel-button": function(e, t) {
		e.preventDefault();
		if(t.data.description.onCancel) {
			t.data.description.onCancel();
		}
	},

	"blur input, blur select, blur textarea": function(e, t) {
		var input = $(e.currentTarget);
		var form = input.closest("form");
		var values = getDynamicFormValues(form[0]);
		var fieldName = input.attr("name");
		var fieldValue = values[fieldName];
		var field = _.find(t.data.description.fields, function(field) { return field.name == fieldName});

		var error = validateField(field, fieldValue, values);
		if(error) {
			// timeout is trick: we need to know what is next focused control.
			setTimeout(function() {
				// show error only if next focused control is not cancel button
				if(!$(document.activeElement).hasClass("cancel-button")) {
					showFieldError(input, error);
				}
			}, 10);
		} else {
			clearFieldError(input);
		}
	},

	"change select, keyup input, keyup textarea, paste input, paste textarea, cut input, cut textarea, click input[type='checkbox'], click input[type='radio']": function(e, t) {
		var input = $(e.currentTarget);
		var fieldName = input.attr("name");
		if(!fieldName) {
			return;
		}
		var field = _.find(t.data.description.fields, function(field) { return field.name == fieldName });
		if(field.onChange) {
			var form = input.closest("form");
			var values = getDynamicFormValues(form[0]);
			var fieldValue = values[fieldName];

			function setField(name, value) {
				setFieldValue(form, name, value);
			}

			field.onChange(fieldValue, values, field, setField);
		}
	}
});

Template.DynamicFormGroupDefault.rendered = function() {
	$("[data-toggle='popover']").popover({
		container: "body"
	});
};

Template.DynamicFormGroupDefault.helpers({
	"formInput": function() {

		if (this.field.template) {
			return Template[this.field.template];
		}

		var control = this.field.control || "input";
		var name = this.field.name || "";
		if(name) {
			clearFieldError($(control + "[name=" + name + "]"));
		}

		if(control == "static") {
			return Template.DynamicFormStatic;
		}

		if(control == "input") {
			return Template.DynamicFormInput;			
		}

		if(control == "textarea") {
			return Template.DynamicFormTextArea;
		}

		if(control == "json") {
			return Template.DynamicFormJsonEditor;
		}

		if(control == "javascript") {
			return Template.DynamicFormJavascriptEditor;
		}

		if(control == "html") {
			return Template.DynamicFormHtmlEditor;
		}

		if(control == "markdown") {
			return Template.DynamicFormMarkdownEditor;
		}

		if(control == "select") {
			return Template.DynamicFormSelect;
		}

		if(control == "multi") {
			return Template.DynamicFormSelectMulti;
		}

		if(control == "checkbox") {
			return Template.DynamicFormCheckbox;
		}

		if(control == "radio") {
			return Template.DynamicFormRadio;
		}

		return null;
	}
});

Template.DynamicFormGroupHorizontal.rendered = function() {
	$("[data-toggle='popover']").popover({
		container: "body"
	});
};

Template.DynamicFormGroupHorizontal.helpers({
	"formInput": function() {

		if(this.field.template) {
			return Template[this.field.template];
		}

		var control = this.field.control || "input";
		var name = this.field.name || "";
		if(name) {
			clearFieldError($(control + "[name=" + name + "]"));
		}

		if(control == "static") {
			return Template.DynamicFormStatic;
		}

		if(control == "input") {
			return Template.DynamicFormInput;			
		}

		if(control == "textarea") {
			return Template.DynamicFormTextArea;
		}

		if(control == "json") {
			return Template.DynamicFormJsonEditor;
		}

		if(control == "javascript") {
			return Template.DynamicFormJavascriptEditor;
		}

		if(control == "html") {
			return Template.DynamicFormHtmlEditor;
		}

		if(control == "markdown") {
			return Template.DynamicFormMarkdownEditor;
		}

		if(control == "select") {
			return Template.DynamicFormSelect;
		}

		if(control == "multi") {
			return Template.DynamicFormSelectMulti;
		}

		if(control == "checkbox") {
			return Template.DynamicFormCheckbox;
		}

		if(control == "radio") {
			return Template.DynamicFormRadio;
		}

		return null;
	}
});

Template.DynamicFormStatic.helpers({
	"value": function() {
		if(!this.data || !this.field || !this.field.name) {
			return "";
		}
		return this.data[this.field.name];
	},
	"dataType": function() {
		if(!this.field) {
			return "";
		}
		return this.field.dataType || "";
	}
});

Template.DynamicFormInput.helpers({
	"inputType": function() {
		return this.field.type || "text";
	},
	"autofocus": function() {
		return this.field.autofocus ? "autofocus" : "";
	},
	"value": function() {
		if(!this.data || !this.field || !this.field.name) {
			return "";
		}
		return this.data[this.field.name];
	},
	"dataType": function() {
		if(!this.field) {
			return "";
		}
		return this.field.dataType || "";
	}
});

Template.DynamicFormTextArea.helpers({
	"autofocus": function() {
		return this.field.autofocus ? "autofocus" : "";
	},
	"value": function() {
		if(!this.data || !this.field || !this.field.name) {
			return "";
		}

		if(this.field.dataType == "json") {
			if(_.isObject(this.data[this.field.name])) {
				return JSON.stringify(this.data[this.field.name], null, "\t");
			}
			return this.data[this.field.name];
		}

		if(this.field.dataType == "array") {
			if(_.isArray(this.data[this.field.name])) {
				var tmp = "";
				var counter = 0;
				_.each(this.data[this.field.name], function(item) {
					if(counter > 0) {
						tmp = tmp + "\n";
					}
					tmp = tmp + item;
					counter++;
				});
				return tmp;
			}
			return this.data[this.field.name];
		}

		return this.data[this.field.name];
	},
	"dataType": function() {
		if(!this.field) {
			return "";
		}
		return this.field.dataType || "";
	}
});

Template.DynamicFormJsonEditor.rendered = function() {
	var textarea = this.$("textarea");
	if(!textarea.length) {
		return;
	}

	textarea.attr("data-type", this.data.field.dataType);
};

Template.DynamicFormJsonEditor.helpers({
	"editorOptions": function() {
		return {
            styleActiveLine: true,
			lineNumbers: true,
			mode: "application/ld+json",
			keyMap: "sublime",
			gutters: ["CodeMirror-lint-markers"],
			lint: true
		};
	},

	"autofocus": function() {
		return this.field.autofocus ? "autofocus" : "";
	},

	"value": function() {
		if(!this.data || !this.field || !this.field.name) {
			return "";
		}

		if(this.field.dataType == "json") {
			if(_.isObject(this.data[this.field.name])) {
				return JSON.stringify(this.data[this.field.name], null, "\t");
			}
			return this.data[this.field.name];
		}

		if(this.field.dataType == "string") {
			if(_.isObject(this.data[this.field.name]) && typeof this.data[this.field.name] != "string") {
				var stringified = "";
				try {
					stringified = JSON.stringify(this.data[this.field.name], null, "\t");
				} catch(err) {

				}
				return stringified;		
			} else {
				if(!this.data[this.field.name] || typeof this.data[this.field.name] == "string") {
					var stringified = "{}";
					try {
						stringified = JSON.stringify(JSON.parse(this.data[this.field.name] || "{}"), null, "\t");
					} catch(err) {

					}
					return stringified;
				}
			}
		}

		if(this.field.dataType == "array") {
			if(_.isArray(this.data[this.field.name])) {
				var tmp = "";
				var counter = 0;
				_.each(this.data[this.field.name], function(item) {
					if(counter > 0) {
						tmp = tmp + "\n";
					}
					tmp = tmp + item;
					counter++;
				});
				return tmp;
			}
			return this.data[this.field.name];
		}

		return this.data[this.field.name];
	},
	"dataType": function() {
		if(!this.field) {
			return "";
		}
		return this.field.dataType || "";
	}
});

Template.DynamicFormJavascriptEditor.rendered = function() {
	var textarea = this.$("textarea");
	if(!textarea.length) {
		return;
	}

	textarea.attr("data-type", this.data.field.dataType);
};

Template.DynamicFormJavascriptEditor.helpers({
	"editorOptions": function() {
		return {
            styleActiveLine: true,
			lineNumbers: true,
			mode: "javascript",
			keyMap: "sublime",
			gutters: ["CodeMirror-lint-markers"],
			lint: true
		};
	},

	"autofocus": function() {
		return this.field.autofocus ? "autofocus" : "";
	},

	"value": function() {
		if(!this.data || !this.field || !this.field.name) {
			return "";
		}
		return this.data[this.field.name];
	},

	"dataType": function() {
		if(!this.field) {
			return "";
		}
		return this.field.dataType || "";
	}
});


Template.DynamicFormHtmlEditor.rendered = function() {
	var textarea = this.$("textarea");
	if(!textarea.length) {
		return;
	}

	textarea.attr("data-type", this.data.field.dataType);
};

Template.DynamicFormHtmlEditor.helpers({
	"editorOptions": function() {
		return {
            styleActiveLine: true,
			lineNumbers: true,
			mode: "htmlmixed",
			keyMap: "sublime"
		};
	},

	"autofocus": function() {
		return this.field.autofocus ? "autofocus" : "";
	},

	"value": function() {
		if(!this.data || !this.field || !this.field.name) {
			return "";
		}
		return this.data[this.field.name];
	},

	"dataType": function() {
		if(!this.field) {
			return "";
		}
		return this.field.dataType || "";
	}
});

Template.DynamicFormHtmlEditor.rendered = function() {
	var textarea = this.$("textarea");
	if(!textarea.length) {
		return;
	}

	textarea.attr("data-type", this.data.field.dataType);
};

Template.DynamicFormMarkdownEditor.helpers({
	"editorOptions": function() {
		return {
            styleActiveLine: true,
			lineNumbers: true,
			mode: "markdown",
			keyMap: "sublime"
		};
	},

	"autofocus": function() {
		return this.field.autofocus ? "autofocus" : "";
	},

	"value": function() {
		if(!this.data || !this.field || !this.field.name) {
			return "";
		}
		return this.data[this.field.name];
	},

	"dataType": function() {
		if(!this.field) {
			return "";
		}
		return this.field.dataType || "";
	}
});

Template.DynamicFormSelect.helpers({
	"autofocus": function() {
		return this.field.autofocus ? "autofocus" : "";
	},
	"selected": function(val) {
		if(!val.data || !val.field || !val.field.name) {
			return "";
		}
		return this.value == val.data[val.field.name] ? "selected" : "";
	},
	"dataType": function() {
		if(!this.field) {
			return "";
		}
		return this.field.dataType || "";
	}
});

Template.DynamicFormSelectMulti.helpers({
	"autofocus": function() {
		return this.field.autofocus ? "autofocus" : "";
	},
	"selected": function(val) {
		if(!val.data || !val.field || !val.field.name) {
			return "";
		}
		if(!_.isArray(val.data[val.field.name])) {
			return "";
		}

		return val.data[val.field.name].indexOf(this.value) >= 0 ? "selected" : "";
	},
	"dataType": function() {
		if(!this.field) {
			return "";
		}
		return this.field.dataType || "";
	}
});

Template.DynamicFormCheckbox.helpers({
	"checked": function(val) {
		if(!val.data || !val.field || !val.field.name) {
			return "";
		}
		if(_.isArray(val.data[val.field.name])) {
			return val.data[val.field.name].indexOf(this.value) >= 0 ? "checked" : "";
		}
		return val.data[val.field.name] ? "checked" : "";
	},
	"dataType": function() {
		if(!this.field) {
			return "";
		}
		return this.field.dataType || "";
	}
});

Template.DynamicFormRadio.helpers({
	"checked": function(val) {
		if(!val.data || !val.field || !val.field.name) {
			return "";
		}
		return this.value == val.data[val.field.name] ? "checked" : "";
	},
	"dataType": function() {
		if(!this.field) {
			return "";
		}
		return this.field.dataType || "";
	}
});

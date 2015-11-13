this.isValidEmail = function(value) {
	var filter = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

	if(filter.test(value)) {
		return true;
	}
	return false;
};

this.isValidPassword = function(value, min_length) {
	if(!value || value === "" || value.length < min_length)
		return false;
	return true;
};

this.isValidIPv4 = function(value) {
	var filter = /^(\d{1,3}\.){3}(\d{1,3})$|^(0x[\da-fA-F]{2}\.){3}(0x[\da-fA-F]{2})$|^(0[0-3][0-7]{2}\.){3}(0[0-3][0-7]{2})|^0x[\da-fA-F]{8}$|^[0-4]\d{9}$|^0[0-3]\d{10}$/;
	if(filter.test(value)) {
		return true;
	}
	return false;
}

this.isValidIPv6 = function(value) {
	var filter = /^([\da-fA-F]{1,4}:){7}([\da-fA-F]{1,4})$/;
	if(filter.test(value)) {
		return true;
	}
	return false;
}

this.isValidIP = function(value) {
	if(isValidIPv4(value) || isValidIPv6(value)) {
		return true;
	}
	return false;
};

this.timeToSeconds = function(timeStr, timeFormat) {
	var t = timeStr || "12:00 am";
	var tf = timeFormat || "h:mm a";
	var m = moment.utc("01/01/1970 " + t, "MM/DD/YYYY " + tf);
	if(!m.isValid()) {
		return null;
	}
	return m.unix();
};

this.secondsToTime = function(seconds, timeFormat) {
	var s = seconds || 0;
	var tf = timeFormat || "h:mm a";
	return moment.unix(s).utc().format(tf);
};

this.validateForm = function(formObject, validationCallback, errorCallback, submitCallback) {
	var values = {};
	var error = false;
	formObject.find("input,select,textarea").each(function() {
		var skipValue = false;
		var inputObject = $(this);
		var formGroup = inputObject.closest(".form-group");
		var fieldName = inputObject.attr("name");
		var labelObject = formGroup.find("label[for='" + fieldName + "']");
		var errorLabel = formGroup.find("#error-text");
		var fieldValue = inputObject.val();
		var dataType = inputObject.attr("data-type") ? inputObject.attr("data-type").toUpperCase() : "STRING";
		var dataFormat = inputObject.attr("data-format") || "";

		if(!fieldName) skipValue = true;

		if(inputObject.attr("type") == "checkbox") {
			// auto set data type for checkbox
			if(!inputObject.attr("data-type")) {
				// single checkbox with that name means dataType="BOOL" else it is "ARRAY"
				if(formObject.find("input[name='" + fieldName + "']").length == 1) {
					dataType = "BOOL";
				}
				else {
					dataType = "ARRAY";
				}
			}

			if(dataType == "BOOL") fieldValue = inputObject.is(":checked");
			if(dataType == "ARRAY") fieldValue = inputObject.is(":checked") ? fieldValue : "";
		}

		// radio has value only if checked
		if(inputObject.attr("type") == "radio") {
			fieldValue = inputObject.is(":checked") ? fieldValue : "";
			if(dataType != "ARRAY" && !fieldValue) {
				skipValue = true;
			}
		}

		var minValue = inputObject.attr("data-min");
		var maxValue = inputObject.attr("data-max");
		var labelText = inputObject.attr("placeholder") ? inputObject.attr("placeholder") : "";
		if(!labelText) {
			labelText = labelObject ? labelObject.text() : fieldName;
		}

		// hide error message from previous call
		formGroup.removeClass("has-error");
		if(errorLabel) {
			errorLabel.text("");
		}

		function validationError(errorMessage) {
			formGroup.addClass("has-error");
			inputObject.focus();
			if(errorLabel) {
				errorLabel.text(errorMessage);
			}
			if(errorCallback)
				errorCallback(errorMessage);
			error = true;
		}

		if(!skipValue) {
			// Check required
			if(inputObject.attr("required") && !fieldValue) {
				validationError(labelText + " is required");
				return false;
			}

			// checkbox doesn't have required property, so I set parent container's data-required to true
			if(inputObject.attr("type") == "checkbox") {
				var checkboxContainer = inputObject.closest(".input-div");
				var req = checkboxContainer.attr("data-required");
				if(req) {
					var atLeastOneChecked = false;
					checkboxContainer.find("input[type='checkbox']").each(function() {
						if($(this).is(":checked")) atLeastOneChecked = true;
					});
					if(!atLeastOneChecked) {
						validationError(labelText + " is required");
						return false;
					}
				}
			}

			// Convert to bool
			if(dataType == "BOOL") {
				fieldValue = fieldValue ? true : false;
			}

			// Check Integer, also min and max value
			if(dataType == "INTEGER") {
				var intValue = parseInt(fieldValue);
				if(isNaN(intValue)) {
					validationError(labelText + ": Invalid value entered");
					return false;
				}

				if(minValue && !isNaN(parseInt(minValue)) && intValue < parseInt(minValue)) {
					if(maxValue && !isNaN(parseInt(maxValue)))
						validationError(labelText + " must be between " + minValue + " and " + maxValue);
					else
						validationError(labelText + " must be equal or greater than " + minValue);
					return false;
				}

				if(maxValue && !isNaN(parseInt(maxValue)) && intValue > parseInt(maxValue)) {
					if(minValue && !isNaN(parseInt(minValue)))
						validationError(labelText + " must be between " + minValue + " and " + maxValue);
					else
						validationError(labelText + " must be equal or less than " + maxValue);
					return false;
				}
				fieldValue = intValue;
			}

			// Check Float, also Min and Max value
			if(dataType == "FLOAT")
			{
				var floatValue = parseFloat(fieldValue);
				if(isNaN(floatValue)) {
					validationError(labelText + ": Invalid value entered");
					return false;
				}

				if(minValue && !isNaN(parseFloat(minValue)) && floatValue < parseFloat(minValue)) {
					validationError(labelText + " must be equal or greater than " + minValue);
					return false;
				}

				if(maxValue && !isNaN(parseFloat(maxValue)) && floatValue > parseFloat(maxValue)) {
					validationError(labelText + " must be equal or less than " + maxValue);
					return false;
				}
				fieldValue = floatValue;
			}

			// Check valid E-mail address
			if(dataType == "EMAIL") {
				if(fieldValue && !isValidEmail(fieldValue)) {
					validationError(labelText + ": please enter valid e-mail address");
					return false;
			    }
			}

			if(dataType == "IP") {
				if(fieldValue && !isValidIP(fieldValue)) {
					validationError(labelText + ": please enter valid IPv4 or IPv6 address");
					return false;
				}
			}
			if(dataType == "IPV4") {
				if(fieldValue && !isValidIPv4(fieldValue)) {
					validationError(labelText + ": please enter valid IPv4 address");
					return false;
				}
			}
			if(dataType == "IPV6") {
				if(fieldValue && !isValidIPv6(fieldValue)) {
					validationError(labelText + ": please enter valid IPv6 address");
					return false;
				}
			}

			if(dataType == "ARRAY") {
				if(!_.isArray(fieldValue)) {
					var newValue = values[fieldName] ? values[fieldName] : [];
					if(fieldValue) {
						newValue.push(fieldValue);
					}
					fieldValue = newValue;
				}
			}

			// TIME (user input "12:30 am" produces "1800" that is number of seconds from midnight)
			if(dataType == "TIME") {
				if(fieldValue == "") {
					fieldValue = null;
				}
				var seconds = timeToSeconds(fieldValue, dataFormat);
				if(isNaN(parseInt(seconds))) {
					validationError(labelText + ": Invalid value entered.");
					return false;
				}
				fieldValue = seconds;
			}

			if(dataType == "DATE") {
				if(fieldValue == "") {
					fieldValue = null;
				} else {
					var date = moment(fieldValue, dataFormat);
					if(!date.isValid()) {
						validationError(labelText + ": Invalid value entered." + (dataFormat ? " Date is expected in format \"" + dataFormat + "\"" : ""));
						return false;
					}
					fieldValue = date.toDate();
				}
			}

			if(dataType == "STRING") {
				if(_.isArray(fieldValue)) {
					fieldValue = fieldValue.toString();
				}
			}

			// Custom validation
			if(validationCallback) {
				var errorMessage = validationCallback(fieldName, fieldValue);
				if(errorMessage) {
					validationError(errorMessage);
					return false;
				}
			}

			values[fieldName] = fieldValue;
		}
	});

	if(error)
		return;

	values = deepen(values);

	if(submitCallback)
		submitCallback(values);
};

Handlebars.registerHelper("itemIsChecked", function(desiredValue, itemValue) {
	if(!desiredValue && !itemValue) return "";

	if(_.isArray(desiredValue))
		return desiredValue.indexOf(itemValue) >= 0 ? "checked" : "";

	return desiredValue == itemValue ? "checked" : "";
});

Handlebars.registerHelper("optionIsSelected", function(desiredValue, itemValue) {
	if(!desiredValue && !itemValue) return "";

	if(_.isArray(desiredValue))
		return desiredValue.indexOf(itemValue) >= 0 ? "selected" : "";

	return desiredValue == itemValue ? "selected" : "";
});

this.bootboxDialog = function(template, data, options) {
	var tmpl = null;
	if(_.isString(template)) {
		tmpl = Template[template];
	} else {
		tmpl = template;
	}
	var div = document.createElement("div");
//	UI.insert(UI.renderWithData(template, data), div);
	Blaze.renderWithData(tmpl, data, div);

	options.message = div;
	bootbox.dialog(options);
};

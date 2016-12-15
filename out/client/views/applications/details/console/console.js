Template.ApplicationsDetailsConsole.rendered = function() {
	
};

Template.ApplicationsDetailsConsole.events({
	
});

Template.ApplicationsDetailsConsole.helpers({
	
});

var wsKitchen = null;
var wsApp = null;

var disableControls = function() {
	$(".command-button").addClass("disabled");
}

var enableControls = function() {
	$(".command-button").removeClass("disabled");
}

function sendMessageToKitchen(msg, successCallback) {
	if(!wsKitchen) {
		showMessageFromKitchen("Cannot execute command: connection to server is not established.");
		return;
	}

	disableControls();

	wsKitchen.successCallback = successCallback;
	wsKitchen.send(msg);
}

function showMessageFromKitchen(msg) {
	var kitchenConsole = document.getElementById("kitchen-console");
	kitchenConsole.innerHTML += '<br />' + msg;
	kitchenConsole.scrollTop = kitchenConsole.scrollHeight;
}

function sendMessageToApp(msg) {
	if(!wsApp) {
		showMessageFromApp("Cannot execute command: connection to server is not established.");
		return;
	}

	disableControls();
	wsApp.send(msg);
}

function showMessageFromApp(msg) {
	var appConsole = document.getElementById("app-console");
	appConsole.innerHTML += '<br />' + msg;
	appConsole.scrollTop = appConsole.scrollHeight;
}

Template.ApplicationsDetailsConsoleConsoleView.rendered = function() {
	function resizeFullHeight() {
		if(!$(".full-height").length) {
			return;
		}
		var viewHeight = $(window).height();
		var footerHeight = $("#footer").outerHeight();
		var fhTop = $(".full-height").offset().top;

		var availableHeight = viewHeight - footerHeight - fhTop;
		if(availableHeight < 200) {
			availableHeight = 200;
		}

		$(".full-height").height(availableHeight);
	}

	resizeFullHeight();

	$(window).on('resize', function() {
		resizeFullHeight();
	});

	var serverURL = "ws://www.meteorfarm.com:1234";

	wsKitchen = new WebSocket(serverURL, "echo-protocol");
	wsKitchen.onmessage = function(e) {
		var data = {};
		try {
			data = JSON.parse(e.data);
		} catch(err) {
			showMessageFromKitchen("Invalid response received from server.");
			enableControls();
			return;
		}

		if(data.msg) {
			showMessageFromKitchen(data.msg);
		}

		if(data.status == "error") {
			enableControls();
		}

		if(data.status == "success") {
			if(wsKitchen.successCallback) {
				wsKitchen.successCallback();
			}
			enableControls();
		}
	};

	wsKitchen.onerror = function(e) {
		showMessageFromKitchen("WebSocket error. Type: \"" + e.type + "\".");
		enableControls();
	};

	wsKitchen.onclose = function(e) {
		showMessageFromKitchen("WebSocket connection closed. Code: " + e.code + ", reason: \"" + e.reason + "\".");
		enableControls();
	};

	wsApp = new WebSocket(serverURL, "echo-protocol");
	wsApp.onmessage = function(e) {
		var data = {};
		try {
			data = JSON.parse(e.data);
		} catch(err) {
			showMessageFromApp("Invalid response received from server.");
			enableControls();
			return;
		}

		if(data.msg) {
			showMessageFromApp(data.msg);
		}

		if(data.status == "error") {
			enableControls();
		}

		if(data.status == "success") {
			enableControls();
		}
	};
	wsApp.onerror = function(e) {
		showMessageFromApp("WebSocket error. Type: \"" + e.type + "\".");
		enableControls();
	};
	wsApp.onclose = function(e) {
		showMessageFromApp("WebSocket connection closed. Code: " + e.code + ", reason: \"" + e.reason + "\".");
		enableControls();
	};
}

Template.ApplicationsDetailsConsoleConsoleView.events({
	"click .build-cloud": function(e, t) {
		var appId = this.application._id;

		var command = JSON.stringify({
			command: "build",
			args: {
				user_id: Meteor.userId(),
				app_id: appId
			}
		});
		sendMessageToKitchen(command);
	},

	"click .download_js_html": function(e, t) {
		var appId = this.application._id;

		var command = JSON.stringify({
			command: "download_js_html",
			args: {
				user_id: Meteor.userId(),
				app_id: appId
			}
		});

		sendMessageToKitchen(command, function() {
			downloadFile("http://www.meteorfarm.com/download/" + appId + ".zip");
		});
	},

	"click .download_js_jade": function(e, t) {
		var appId = this.application._id;

		var command = JSON.stringify({
			command: "download_js_jade",
			args: {
				user_id: Meteor.userId(),
				app_id: appId
			}
		});
		sendMessageToKitchen(command, function() {
			downloadFile("http://www.meteorfarm.com/download/" + appId + ".zip");
		});
	},

	"click .download_coffee_html": function(e, t) {
		var appId = this.application._id;

		var command = JSON.stringify({
			command: "download_coffee_html",
			args: {
				user_id: Meteor.userId(),
				app_id: appId
			}
		});
		sendMessageToKitchen(command, function() {
			downloadFile("http://www.meteorfarm.com/download/" + appId + ".zip");
		});
	},

	"click .download_coffee_jade": function(e, t) {
		var appId = this.application._id;

		var command = JSON.stringify({
			command: "download_coffee_jade",
			args: {
				user_id: Meteor.userId(),
				app_id: appId
			}
		});
		sendMessageToKitchen(command, function() {
			downloadFile("http://www.meteorfarm.com/download/" + appId + ".zip");
		});
	},

	"click .start-app": function(e, t) {
		var appId = this.application._id;

		var command = JSON.stringify({
			command: "start",
			args: {
				user_id: Meteor.userId(),
				app_id: appId
			}
		});
		sendMessageToApp(command);
	},

	"click .stop-app": function(e, t) {
		var appId = this.application._id;

		var command = JSON.stringify({
			command: "stop",
			args: {
				user_id: Meteor.userId(),
				app_id: appId
			}
		});
		sendMessageToApp(command);
	}
});

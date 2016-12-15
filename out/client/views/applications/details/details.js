Template.ApplicationsDetails.rendered = function() {
	
};

Template.ApplicationsDetails.events({
	
	"click #page-back-button": function(e, t) {
		e.preventDefault();
		Router.go("applications", {  });
	},
"click .build-local": function(e, t) { $(".alert.build-info").toggle("fast"); }
});

Template.ApplicationsDetails.helpers({
	
});

Template.ApplicationsDetailsLeftMenu.rendered = function() {
	$(".menu-item-collapse .dropdown-toggle").each(function() {
		if($(this).find("li.active")) {
			$(this).removeClass("collapsed");
		}
		$(this).parent().find(".collapse").each(function() {
			if($(this).find("li.active").length) {
				$(this).addClass("in");
			}
		});
	});
	
};

Template.ApplicationsDetailsLeftMenu.events({
	"click .toggle-text": function(e, t) {
		e.preventDefault();
		$(e.target).closest("ul").toggleClass("menu-hide-text");
	}
	
});

Template.ApplicationsDetailsLeftMenu.helpers({
	
});

Template.ApplicationsDetailsRightMenu.rendered = function() {
	$(".menu-item-collapse .dropdown-toggle").each(function() {
		if($(this).find("li.active")) {
			$(this).removeClass("collapsed");
		}
		$(this).parent().find(".collapse").each(function() {
			if($(this).find("li.active").length) {
				$(this).addClass("in");
			}
		});
	});
	
};

Template.ApplicationsDetailsRightMenu.events({
	"click .toggle-text": function(e, t) {
		e.preventDefault();
		$(e.target).closest("ul").toggleClass("menu-hide-text");
	}
	
});

Template.ApplicationsDetailsRightMenu.helpers({
	
});



Template.GettingStarted.rendered = function() {
	
};

Template.GettingStarted.events({
	
});

Template.GettingStarted.helpers({
	
});


Template.GettingStartedMenu.rendered = function() {
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

Template.GettingStartedMenu.events({
	"click .toggle-text": function(e, t) {
		e.preventDefault();
		$(e.target).closest("ul").toggleClass("menu-hide-text");
	}
	
});

Template.GettingStartedMenu.helpers({
	
});


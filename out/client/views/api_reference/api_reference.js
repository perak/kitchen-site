Template.ApiReference.rendered = function() {
	$('table').addClass('table');
};

Template.ApiReference.events({
	
});

Template.ApiReference.helpers({
	
});


Template.ApiReferenceMenu.rendered = function() {
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

Template.ApiReferenceMenu.events({
	"click .toggle-text": function(e, t) {
		e.preventDefault();
		$(e.target).closest("ul").toggleClass("menu-hide-text");
	}
	
});

Template.ApiReferenceMenu.helpers({
	
});


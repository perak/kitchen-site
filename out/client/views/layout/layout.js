Template.layout.rendered = function() {
	// scroll to anchor
	$('body').on('click', 'a', function(e) { 
		var href = $(this).attr("href");
		if(!href) {
			return;
		}
		if(href.length > 1 && href.charAt(0) == "#") {
			var hash = href.substring(1);
			if(hash) {
				e.preventDefault();

				var offset = $('*[id="' + hash + '"]').offset();

				if (offset) {
					$('html,body').animate({ scrollTop: offset.top - 60 }, 400);
				}
			}
		} else {
			if(href.indexOf("http://") != 0 && href.indexOf("https://") != 0 && href.indexOf("#") != 0) {
				$('html,body').scrollTop(0);
			}
		}
	}); 
	/*TEMPLATE_RENDERED_CODE*/
};



Template.PublicLayoutLeftMenu.rendered = function() {
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

Template.PublicLayoutLeftMenu.events({
	"click .toggle-text": function(e, t) {
		e.preventDefault();
		$(e.target).closest("ul").toggleClass("menu-hide-text");
	}
	
});

Template.PublicLayoutLeftMenu.helpers({
	
});

Template.PublicLayoutRightMenu.rendered = function() {
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

Template.PublicLayoutRightMenu.events({
	"click .toggle-text": function(e, t) {
		e.preventDefault();
		$(e.target).closest("ul").toggleClass("menu-hide-text");
	}
	
});

Template.PublicLayoutRightMenu.helpers({
	
});


Template.PrivateLayoutLeftMenu.rendered = function() {
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

Template.PrivateLayoutLeftMenu.events({
	"click .toggle-text": function(e, t) {
		e.preventDefault();
		$(e.target).closest("ul").toggleClass("menu-hide-text");
	}
	
});

Template.PrivateLayoutLeftMenu.helpers({
	
});

Template.PrivateLayoutRightMenu.rendered = function() {
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

Template.PrivateLayoutRightMenu.events({
	"click .toggle-text": function(e, t) {
		e.preventDefault();
		$(e.target).closest("ul").toggleClass("menu-hide-text");
	}
	
});

Template.PrivateLayoutRightMenu.helpers({
	
});

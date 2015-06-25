Template.TEMPLATE_NAME.rendered = function() {
	var self = this;

	var svg = d3.select('#site-map').append('svg');

	var g = new dagreD3.graphlib.Graph().setGraph({ rankdir: "LR" }).setDefaultEdgeLabel(function() { return {}; });
	var render = new dagreD3.render();
	var svgGroup = svg.append("g");

	var drawPage = function(page, title, parent) {
		if(!page) return;
		g.setNode(page._id, { class: UI.getData().params.objectId == page._id ? "selected" : "x", label: title,  width: 100, height: 30 });
		if(parent) {
			g.setEdge(parent._id, page._id);
		}

		if(page.pages) {
			_.each(page.pages, function(p) {
				drawPage(p, p.name, page);
			});
		}
	};

	var drawSitemap = function() {
		if(!self.data.application) return;
		var containerObject = self.data.application.data;
		var meta = self.data.metadata.data;

		var application = containerObject.application;

		drawPage(application.free_zone, "free_zone", null);
		drawPage(application.public_zone, "public_zone", null);
		drawPage(application.private_zone, "private_zone", null);

		g.nodes().forEach(function(v) {
			var node = g.node(v);
			node.rx = node.ry = 5;
		});

		render(d3.select("svg g"), g);

		if(svg.attr("width") < g.graph().width) svg.attr("width", g.graph().width);
		if(svg.attr("height") < g.graph().height) svg.attr("height", g.graph().height);

		// Center the graph
		var xCenterOffset = (svg.attr("width") - g.graph().width) / 2;
		svgGroup.attr("transform", "translate(" + xCenterOffset + ", 0)");

		svgGroup.selectAll(".node").on("click", function(d, i) {
			Router.go("PAGE_ROUTE_NAME", { applicationId: self.data.params.applicationId, objectId: d, propertyName: null });
		});
	};

	function resizeFullHeight() {
		if(!$(".full-height").length) {
			return;
		}
		var viewHeight = $(window).height();
		var footerHeight = $("#footer").outerHeight();
		var fhTop = $(".full-height").offset().top;


		var fhHeight = $(".full-height").height();
		var fhOuterHeight = $(".full-height").outerHeight();
		var fhMarginTop = parseInt($(".full-height").css("margin-top") || "0");
		var fhMarginBottom = parseInt($(".full-height").css("margin-bottom") || "0");
		var availableHeight = viewHeight - footerHeight - fhTop - ((fhOuterHeight - fhHeight) + fhMarginTop + fhMarginBottom);

		if(availableHeight < 200) {
			availableHeight = 200;
		}

		// resize container
		$(".full-height").height(availableHeight);

		drawSitemap();
	}

	resizeFullHeight();

	$(window).on('resize', function() {
		resizeFullHeight();
	});

	this.autorun(function() {
		if(Router.current() && Router.current().url && UI.getData()) {
			drawSitemap();
		}
	});
};

Template.TEMPLATE_NAME.events({
	
});

Template.TEMPLATE_NAME.helpers({
	
});

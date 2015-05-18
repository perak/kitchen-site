Template.TEMPLATE_NAME.rendered = function() {
	var self = this;

	var svg = d3.select('#site-map').append('svg');

	var g = new dagreD3.graphlib.Graph().setGraph({ rankdir: "TB" }).setDefaultEdgeLabel(function() { return {}; });
	var render = new dagreD3.render();
	var svgGroup = svg.append("g");

	var drawPage = function(page, title, parent) {
		if(!page) return;
		g.setNode(page._id, { label: title,  width: 100, height: 30 });
		if(parent) {
			g.setEdge(parent._id, page._id);
		}

		if(page.pages) {
			_.each(page.pages, function(p) {
				drawPage(p, p.name, page);
			});
		}
	}

	var drawSitemap = function() {
		if(!self.data.application) return;
		var containerObject = self.data.application.data;
		var meta = self.data.metadata.data;

		var application = containerObject.application;
		drawPage(application.free_zone, "free_zone", null);
		drawPage(application.public_zone, "public_zone", null);
		drawPage(application.private_zone, "private_zone", null);

/*
		var object = findObjectById(containerObject, objectId);

		if(!object || !object.objectType) {
			return;
		}

		var arrayItemType = getObjectArrayItemType(object.objectType, propertyName, meta);
		if(arrayItemType != "collection") return;

		var array = object[propertyName];
		_.each(array, function(item) {
			g.setNode(item._id, { label: item.name,  width: 100, height: 40 });
		});

		// Round the corners of the nodes
		g.nodes().forEach(function(v) {
			var node = g.node(v);
			node.rx = node.ry = 5;
		});

		render(d3.select("svg g"), g);

*/
	}

	function resizeFullHeight() {
		if(!$(".full-height").length) {
			return;
		}
		var viewHeight = $(window).height();
		var footerHeight = $("#footer").outerHeight();
		var fhTop = $(".full-height").offset().top;
		var fhAdd = $(".full-height").parent().outerHeight() - $(".full-height").parent().height();

		var availableHeight = viewHeight - footerHeight - fhTop - fhAdd;
		if(availableHeight < 200) {
			availableHeight = 200;
		}

		// resize container
		$(".full-height").height(availableHeight);

		// resize canvas
		var width = $(".full-height").width() - 10;
		var height = $(".full-height").height() - 10;
		svg.attr('width', width).attr('height', height);

		drawSitemap();

		g.nodes().forEach(function(v) {
			var node = g.node(v);
			node.rx = node.ry = 5;
		});

		render(d3.select("svg g"), g);

		if(svg.attr("width") < g.graph().width + 10) svg.attr("width", g.graph().width + 10);
		if(svg.attr("height") < g.graph().height + 10) svg.attr("height", g.graph().height + 10);

		// Center the graph
		var xCenterOffset = (svg.attr("width") - g.graph().width) / 2;
		svgGroup.attr("transform", "translate(" + xCenterOffset + ", 0)");

		svgGroup.selectAll(".node").on("click", function(d, i) {
			Router.go("applications.details.form_view", { applicationId: self.data.params.applicationId, objectId: d, propertyName: null });
		});
	}

	resizeFullHeight();

	$(window).on('resize', function() {
		resizeFullHeight();
	});
};

Template.TEMPLATE_NAME.events({
	
});

Template.TEMPLATE_NAME.helpers({
	
});

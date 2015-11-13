this.ApplicationsDetailsFormViewController = RouteController.extend({
	template: "ApplicationsDetails",
	layoutTemplate: "ApplicationsDetails",

	yieldTemplates: {
		'ApplicationsDetailsFormView': { to: 'ApplicationsDetailsSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("ApplicationsDetails"); this.render("loading", { to: "ApplicationsDetailsSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		

		var subs = [
			Meteor.subscribe("application", this.params.applicationId),
			Meteor.subscribe("metadata")
		];
		var ready = true;
		_.each(subs, function(sub) {
			if(!sub.ready())
				ready = false;
		});
		return ready;
	},

	data: function() {
		

		return {
			params: this.params || {},
			application: Applications.findOne({_id:this.params.applicationId}, {}),
			metadata: Metadata.findOne({}, {sort:{version:-1}})
		};
		/*DATA_FUNCTION*/
	},

	onAfterAction: function() {
	}
});
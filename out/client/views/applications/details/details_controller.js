this.ApplicationsDetailsController = RouteController.extend({
	template: "ApplicationsDetails",
	

	yieldTemplates: {
		/*YIELD_TEMPLATES*/
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		this.redirect('applications.details.form_view', this.params || {}, { replaceState: true });
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
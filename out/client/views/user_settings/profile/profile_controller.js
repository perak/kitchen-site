this.UserSettingsProfileController = RouteController.extend({
	template: "UserSettings",
	

	yieldTemplates: {
		'UserSettingsProfile': { to: 'UserSettingsSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("UserSettings"); this.render("loading", { to: "UserSettingsSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		

		var subs = [
			Meteor.subscribe("current_user_data")
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
			current_user_data: Users.findOne({_id:Meteor.userId()}, {})
		};
		/*DATA_FUNCTION*/
	},

	onAfterAction: function() {
		
	}
});
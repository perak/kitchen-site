Meteor.methods({
	"userCount": function() {
		return Users.find().count();
	},
	"appCount": function() {
		return Applications.find().count();
	}
});

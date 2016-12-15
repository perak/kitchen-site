Meteor.publish("applications", function() {
	return Applications.find({ownerId:this.userId}, {sort:{name:1}});
});

Meteor.publish("applications_empty", function() {
	return Applications.find({_id:null,ownerId:this.userId}, {});
});

Meteor.publish("application", function(applicationId) {
	return Applications.find({_id:applicationId,ownerId:this.userId}, {});
});


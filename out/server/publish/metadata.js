Meteor.publish("metadata", function() {
	return Metadata.find({}, {sort:{version:-1}});
});


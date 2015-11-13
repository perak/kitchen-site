this.Applications = new Mongo.Collection("applications");

this.Applications.userCanInsert = function(userId, doc) {
	return Users.isInRoles(userId, ["admin","user"]);
}

this.Applications.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Applications.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

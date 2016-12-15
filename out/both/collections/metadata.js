this.Metadata = new Mongo.Collection("metadata");

this.Metadata.userCanInsert = function(userId, doc) {
	return true;
}

this.Metadata.userCanUpdate = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["admin"]);
}

this.Metadata.userCanRemove = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["admin"]);
}

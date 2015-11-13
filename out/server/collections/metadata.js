Metadata.allow({
	insert: function (userId, doc) {
		return Metadata.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Metadata.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Metadata.userCanRemove(userId, doc);
	}
});

Metadata.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.createdBy) doc.createdBy = userId;
});

Metadata.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Metadata.before.remove(function(userId, doc) {
	
});

Metadata.after.insert(function(userId, doc) {
	
});

Metadata.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Metadata.after.remove(function(userId, doc) {
	
});

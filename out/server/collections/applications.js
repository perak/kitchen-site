Applications.allow({
	insert: function (userId, doc) {
		return Applications.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Applications.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Applications.userCanRemove(userId, doc);
	}
});

Applications.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
	if(!doc.data) {
		if(doc.initialTemplate == "minimal") doc.data = JSON.parse(Assets.getText("example-minimal.json"));
		if(doc.initialTemplate == "accounts") doc.data = JSON.parse(Assets.getText("example-accounts.json"));
		if(doc.initialTemplate == "admin") doc.data = JSON.parse(Assets.getText("example-admin.json"));
		if(doc.initialTemplate == "dataview") doc.data = JSON.parse(Assets.getText("example-dataview.json"));
		if(doc.initialTemplate == "invoices") doc.data = JSON.parse(Assets.getText("example-invoices.json"));
		if(doc.initialTemplate == "photosharing") doc.data = JSON.parse(Assets.getText("example-photosharing.json"));
		if(doc.initialTemplate == "iot") doc.data = JSON.parse(Assets.getText("example-iot.json"));
		if(doc.initialTemplate == "geiger") doc.data = JSON.parse(Assets.getText("example-geiger.json"));
	}

	if(_.isObject(doc.data)) {
		var metaData = Metadata.findOne({}, { sort: { version: -1 } });
		if(!metaData) {
			return;
		}

		var meta = metaData.data;
		if(!meta) {
			return;
		}

		extendWithMetadata(doc.data, "root", meta);

		if(doc.data.application) {
			doc.data.application.title = doc.name;
		}
	}

});

Applications.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Applications.before.remove(function(userId, doc) {
	
});

Applications.after.insert(function(userId, doc) {
	
});

Applications.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Applications.after.remove(function(userId, doc) {
	
});

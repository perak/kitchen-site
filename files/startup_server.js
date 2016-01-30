	var metaStr = Assets.getText("metadata.json");
	var metadata = JSON.parse(metaStr);
	var version = metadata.version || 1;
	if(!Metadata.findOne({ version: version })) {
		Metadata.insert({ version: version, data: metadata });
	}

	// convert all applications to metadata version 70
/*
	Applications.find().forEach(function(app) {
		convertToVersion70(app.data);
		extendWithMetadata(app.data, "root", metadata);
		Applications.update({ _id: app._id }, { $set: { data: app.data }});
	});
*/

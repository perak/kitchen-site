	if(!doc.data) {
		doc["data"] = {};
	}

	if(_.isObject(doc.data)) {
		// !!! should find newest version - not first record!
		var metaData = Metadata.findOne({});
		if(!metaData) {
			return;
		}

		var meta = metaData.data;
		extendWithMetadata(doc.data, "root", meta);
	}

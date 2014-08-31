	if(!doc.data) {
		doc["data"] = {};
	}

	if(_.isObject(doc.data)) {
		var metaData = Metadata.findOne({}, { sort: { version: -1 } });
		if(!metaData) {
			return;
		}

		var meta = metaData.data;
		extendWithMetadata(doc.data, "root", meta);
	}

	var metaStr = Assets.getText("metadata.json");
	var data = JSON.parse(metaStr);
	var version = data.version || 1;
	if(!Metadata.findOne({ version: version })) {
		Metadata.insert({ version: version, data: data });
	}

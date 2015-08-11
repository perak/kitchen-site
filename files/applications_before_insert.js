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

	if(!doc.data) {
		if(doc.initialTemplate == "minimal") doc.data = JSON.parse(Assets.getText("template-minimal.json"));
		if(doc.initialTemplate == "accounts") doc.data = JSON.parse(Assets.getText("template-accounts.json"));
		if(doc.initialTemplate == "dataview") doc.data = JSON.parse(Assets.getText("example-dataview.json"));
		if(doc.initialTemplate == "invoices") doc.data = JSON.parse(Assets.getText("example-invoices.json"));
		if(doc.initialTemplate == "admin") doc.data = JSON.parse(Assets.getText("example-admin.json"));
		if(doc.initialTemplate == "iot") doc.data = JSON.parse(Assets.getText("example-iot.json"));
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

		var hasFreeZone = doc.data.application && doc.data.application.free_zone;

		extendWithMetadata(doc.data, "root", meta);

		if(doc.data.application) {
			if(hasFreeZone) {
				if(doc.data.application.public_zone) delete doc.data.application.public_zone;
				if(doc.data.application.private_zone) delete doc.data.application.private_zone;
			} else {
				if(doc.data.application.free_zone) delete doc.data.application.free_zone;
			}
			doc.data.application.title = doc.name;
		}

	}

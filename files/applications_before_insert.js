	if(!doc.data) {
		if(doc.withUserAccounts) {
			doc.data = JSON.parse(Assets.getText("template-accounts.json"));
		} else {
			doc.data = JSON.parse(Assets.getText("template-simple.json"));
		}
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
			if(doc.withUserAccounts) {
				if(doc.data.application.free_zone) delete doc.data.application.free_zone;
			} else {
				if(doc.data.application.public_zone) delete doc.data.application.public_zone;
				if(doc.data.application.private_zone) delete doc.data.application.private_zone;
			}
			doc.data.application.title = doc.name;
		}

	}

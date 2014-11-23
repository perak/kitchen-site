		var app = Applications.findOne({_id: this.params.applicationId});
		if(!app || !app.data) {
			this.response.writeHead(404, {'Content-Type': 'text/plain; charset=UTF-8'});
			this.response.end("Not found.");
		} else {
			this.response.writeHead(200, {
				"Content-Type": "application/octet-stream",
				"Content-Disposition": "attachment; filename=\"" + app.name + ".json\""
			});

			objectRemoveMetadata(app.data);

			this.response.end(JSON.stringify(app.data, null, '\t'));	
		}


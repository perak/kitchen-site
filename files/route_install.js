		var response = Assets.getText("install.sh");
		this.response.writeHead(200, {'Content-Type': 'text/plain; charset=UTF-8'});
		this.response.end(response);

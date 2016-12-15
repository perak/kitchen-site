Router.map(function () {

	this.route("install", {path: "/install", controller: "InstallController", where: "server"});
	this.route("api.getapp.json", {path: "/api/getapp/json/:applicationId", controller: "ApiGetappJsonController", where: "server"});
});

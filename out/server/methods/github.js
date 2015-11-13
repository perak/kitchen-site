var crypto = Npm.require("crypto");

var base64Encode = function(obj) {
	return new Buffer(JSON.stringify(obj, null, '\t')).toString("base64");
}

Meteor.methods({
	"githubListRepos": function() {
		var user = Users.findOne({ _id: this.userId });
		if(!user) {
			throw new Meteor.Error(403, "Forbidden.");
			return;
		}

		if(!user.services || !user.services.github || !user.services.github.accessToken) {
			return {
				status: 1,
				message: "Github access token not found. Are you logged-in with GitHub OAuth?",
				data: []
			}
		}

		var github = new GitHub({
			version: "3.0.0",
			timeout: 5000
		});

		github.authenticate({
			type: "oauth",
			token: user.services.github.accessToken
		});

		var repos = github.repos.getAll({
			per_page: 100
		});

		var repoList = [];
		_.each(repos, function(repo) {
			if(repo.permissions.push) {
				repoList.push(repo.name);
			}
		});

		return {
			status: 0,
			message: "Success",
			data: repoList
		}
	},

	"githubPushInputJson": function(appId, metadataId, repositoryName, commitMessage) {
		var user = Users.findOne({ _id: this.userId });
		if(!user) {
			throw new Meteor.Error(403, "Forbidden.");
			return;
		}

		if(!user.services || !user.services.github || !user.services.github.accessToken) {
			throw new Meteor.Error(403, "Github access token not found. Are you logged-in with GitHub OAuth?");
			return;
		}

		var app = Applications.findOne({ _id: appId, ownerId: this.userId });
		if(!app) {
			throw new Meteor.Error(404, "Application not found.");
			return;
		}

		var meta = Metadata.findOne({ _id: metadataId });
		if(!meta) {
			throw new Meteor.Error(500, "Metadata not found.");
			return;
		}

		var github = new GitHub({
			version: "3.0.0",
			timeout: 5000
		});

		github.authenticate({
			type: "oauth",
			token: user.services.github.accessToken
		});

		// get base64 encoded human-readable json
		var data = app.data;
		simplifyObject(data, meta.data);
		objectRemoveMetadata(data);
		var base64File = base64Encode(data);

		var userName = user.services.github.username;
		var filePath = app.name + ".json";

		var sha = "";
		try {
			var existingFile = github.repos.getContent({
				user: userName,
				repo: repositoryName,
				path: filePath
			});
			sha = existingFile.sha;
		} catch(e) {
		}

		if(!sha) {
			github.repos.createFile({
				user: userName,
				repo: repositoryName,
				path: filePath,
				message: commitMessage,
				content: base64File
			}, function(e, r) {
				if(e) {
					console.log(e.message);
					throw new Meteor.Error(500, e.message);
				} else {
					return {
						status: 0,
						message: "Success",
						data: null
					}
				}
			});
		} else {
			// file already exists and we got sha - update file
			github.repos.updateFile({
				user: userName,
				repo: repositoryName,
				path: filePath,
				message: commitMessage,
				content: base64File,
				sha: sha
			}, function(e, r) {
				if(e) {
					console.log(e.message);
					throw new Meteor.Error(500, e.message);
				} else {
					return {
						status: 0,
						message: "Success",
						data: null
					}						
				}
			});			
		}
	}
});

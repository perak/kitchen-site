// ---
// metadata utils used by meteor-kitchen GUI
// ---

var objectAddId = function(object) {
	var idField = "_id";

	if(_.isFunction(object)) {
		return;
	}

	if(_.isArray(object)) {
		return;
	}

	if(_.isObject(object)) {
		if(!object[idField]) {
			object[idField] = Random.id();
		}
	}
};

this.objectRemoveMetadata = function(object) {
	var idField = "_id";
	var typeField = "objectType";

	if(_.isFunction(object)) {
		return;
	}

	if(_.isArray(object)) {
		_.each(object, function(item) {
			objectRemoveMetadata(item);
		});
		return;
	}

	if(_.isObject(object)) {
		if(object[typeField]) {
			delete object[idField];
			delete object[typeField];
		}

		for(var propertyName in object) {
			var property = object[propertyName];
			if(_.isObject(property)) {
				objectRemoveMetadata(property);
			}
		}
		return;
	}
};

this.findObjectById = function(object, objectId) {
	if(!object || !objectId) {
		return null;
	}

	var idField = "_id";
	if(_.isFunction(object)) {
		return null;
	}

	if(_.isArray(object)) {
		var res = null;
		_.find(object, function(item) { res = findObjectById(item, objectId); return !!res; });
		if(res) {
			return res;
		}
		return null;
	}

	if(_.isObject(object)) {
		if(object[idField] == objectId) {
			return object;
		}

		for(var propertyName in object) {
			var property = object[propertyName];
			if(_.isObject(property)) {
				var res = findObjectById(property, objectId);
				if(res) {
					return res;
				}
			}
		}
	}

	return null;
};

this.parentPropertyName = function(parent, object) {
	for(var key in parent) {
		if(parent[key] == object) {
			return key;
		}
	}
	return "";
};

this.findDirectParent = function(object, objectId, parent) {
	var res = parent || null;

	if(!object || !objectId) {
		return null;
	}

	var idField = "_id";
	if(_.isFunction(object)) {
		return null;
	}

	if(_.isArray(object)) {
		var res = null;
		_.find(object, function(item) { res = findDirectParent(item, objectId, object); return !!res; });

		return res;
	}

	if(_.isObject(object)) {
		if(object[idField] == objectId) {
			return parent;
		}

		for(var propertyName in object) {
			var property = object[propertyName];
			if(_.isObject(property)) {
				var res = findDirectParent(property, objectId, object);
				if(res) {
					return res;
				}
			}
		}
	}

	return null;
}

this.findObjectParent = function(object, objectId, parent) {
	var res = parent || null;

	if(!object || !objectId) {
		return null;
	}

	var idField = "_id";
	if(_.isFunction(object)) {
		return null;
	}

	if(_.isArray(object)) {
		var res = null;
		_.find(object, function(item) { res = findObjectParent(item, objectId, parent); return !!res; });
		return res;
	}

	if(_.isObject(object)) {
		if(object[idField] == objectId) {
			return parent;
		}

		for(var propertyName in object) {
			var property = object[propertyName];
			if(_.isObject(property)) {
				var res = findObjectParent(property, objectId, object);
				if(res) {
					return res;
				}
			}
		}
	}

	return null;
};

this.deleteObjectWithId = function(object, objectId) {
	if(!object || !objectId) {
		return;
	}

	var idField = "_id";

	if(_.isFunction(object)) {
		return;
	}

	if(_.isArray(object)) {
		_.each(object, function(item, index) {
			if(_.isArray(item)) {
				deleteObjectWithId(item, objectId);
			} else {
				if(_.isObject(item)) {
					if(item[idField] == objectId) {
						object.splice(index, 1);
						return false;
					} else {
						deleteObjectWithId(item, objectId);
					}
				}
			}
		});
		return;
	}

	if(_.isObject(object)) {
		if(object[idField] == objectId) {
			delete object;
		}
	}

	for(var propertyName in object) {
		var property = object[propertyName];
		if(_.isObject(property)) {
			deleteObjectWithId(property, objectId);
		}
	}
	return null;
};


this.findObjectsOfType = function(object, objectType) {
	var res = [];

	if(!object || !objectType) {
		return [];
	}

	var typeField = "objectType";
	if(_.isFunction(object)) {
		return [];
	}

	if(_.isArray(object)) {
		_.each(object, function(item) { 
			var tmp = findObjectsOfType(item, objectType);
			_.each(tmp, function(o) {
				res.push(o);
			})
		});
		return res;
	}

	if(_.isObject(object)) {
		if(object[typeField] == objectType) {
			res.push(object._id);
		}

		for(var propertyName in object) {
			var property = object[propertyName];
			if(_.isObject(property)) {
				var tmp = findObjectsOfType(property, objectType);
				_.each(tmp, function(o) {
					res.push(o);
				})
			}
		}
	}

	return res;
};


this.findObjectParents = function(object, objectId, parents) {
	var res = parents || [];

	if(!object || !objectId) {
		return res;
	}

	var parent = findObjectParent(object, objectId, null);
	if(parent == null) {
		return res;
	}

	res.unshift(parent);
	return findObjectParents(object, parent._id, res);
};

this.findObjectParentsOfType = function(object, objectId, parentType) {
	var parents = findObjectParents(object, objectId);
	var res = [];
	_.each(parents, function(parent) {
		if(parent.objectType == parentType) {
			res.push(parent);
		}
	});
	return res;
};

this.findObjectParentOfType = function(object, objectId, parentType) {
	var parents = findObjectParents(object, objectId);
	var res = null;
	_.each(parents, function(parent) {
		if(parent.objectType == parentType) {
			res = parent;
		}
	});
	return res;
};

this.getPageRoute = function(object, pageId) {
	var page = findObjectById(object, pageId);
	if(!page) {
		return "";
	}

	var route = "";
	var parents = findObjectParentsOfType(object, page._id, "page");
	_.each(parents, function(parent) {
		if(route) {
			route = route + ".";
		}
		route = route + parent.name;
	});
	if(route) {
		route = route + ".";
	}
	route = route + page.name;
	return route;
};

this.getAllRoutes = function(object) {
	var routes = [];
	// client routes
	var pages = findObjectsOfType(object, "page");
	_.each(pages, function(pageId) {
		routes.push(getPageRoute(object, pageId));
	});

	// server-side routes
	if(object.server_side_routes) {
		_.each(object.server_side_routes, function(route) {
			if(route.name) {
				routes.push(route.name);
			}
		});
	}

	return routes;
};

// function returns all routes that belongs to the same zone as given object + zoneless pages + server side routes
this.getAllRoutesInCurrentZone = function(object, objectId) {
	var res = [];

	var parentZone = null;

	var tmp = findObjectById(object, objectId);
	if(tmp && tmp.objectType == "zone") {
		parentZone = tmp;
	} else {
		parentZone = findObjectParentOfType(object, objectId, "zone");
	}

	if(!parentZone) {
		return [];
	}

	var pages = findObjectsOfType(object, "page");

	_.each(pages, function(pageId) {
		var page = findObjectById(object, pageId);
		if(page) {
			if(page.zoneless) {
				res.push(getPageRoute(object, page._id));
			} else {
				var zone = findObjectParentOfType(object, page._id, "zone");
				if(zone._id == parentZone._id) {
					res.push(getPageRoute(object, page._id));
				}
			}
		}
	});

	// server-side routes
	if(object.server_side_routes) {
		_.each(object.server_side_routes, function(route) {
			if(route.name) {
				res.push(route.name);
			}
		});
	}
	return res;
};

this.getObjectMetadata = function(objectType, meta) {
	if(!objectType || !meta) {
		return null;
	}

	var classList = meta.classList;
	if(!classList) {
		return null;
	}

	return _.find(classList, function(metadata) { return metadata.objectType == objectType; }) || {};
};

this.getObjectArrayItemType = function(objectType, memberName, meta) {
	if(!meta) {
		return "";
	}
	var metadata = getObjectMetadata(objectType, meta);
	if(!metadata) {
		return "";
	}	

	var member = _.find(metadata.members, function(member) { return member.name == memberName; });
	if(!member) {
		return getObjectArrayItemType(metadata.derivedFrom, memberName, meta);
	}

	return member.subType || "";
};

var objectAddMembers = function(object, metaMemberList, meta) {
	if(!metaMemberList) {
		return;
	}

	_.each(metaMemberList, function(metaMember) {
		if(metaMember.name) {
			if(!object.hasOwnProperty(metaMember.name)) {
				if(metaMember.hasOwnProperty("default")) {
					switch(metaMember.type) {
						case "bool": object[metaMember.name] = metaMember["default"] == "true" ? true : false; break;
						case "string": object[metaMember.name] = metaMember["default"]; break;
						case "array": object[metaMember.name] = []; break;
						case "object": object[metaMember.name] = {}; break;
						default: {
							var m = getObjectMetadata(metaMember.type, meta);
							if(m) {
								object[metaMember.name] = {};
							} else {
								object[metaMember.name] = null;
							}
						}
					}
				} else {
					switch(metaMember.type) {
						case "bool": object[metaMember.name] = false; break;
						case "string": object[metaMember.name] = ""; break;
						case "array": object[metaMember.name] = []; break;
						case "object": object[metaMember.name] = {}; break;
						default: {
							var m = getObjectMetadata(metaMember.type, meta);
							if(m) {
								object[metaMember.name] = {};
							} else {
								object[metaMember.name] = null;
							}
						}
					}
				}
			}

			var member = object[metaMember.name];

			if(metaMember.type == "array" && _.isArray(member)) {
				if(metaMember.subType != "bool" && metaMember.subType != "string" && metaMember.subType != "array" && metaMember.subType != "object") {
					_.each(member, function(objectItem) {
						if(_.isObject(objectItem)) {
							extendWithMetadata(objectItem, metaMember.subType, meta);
						}
					});
				}
			}

			if(metaMember.type != "bool" && metaMember.type != "string" && metaMember.type != "array" && metaMember.type != "object" && _.isObject(member)) {
				extendWithMetadata(member, metaMember.type, meta);
			}
		}
	});
};

this.extendWithMetadata = function(object, objectType, meta) {
	var type = objectType || object.objectType || "root";

	if(type == "component" && object.type) {
		type = object.type;
	}

	objectAddId(object);

	if(!meta) {
		return;
	}

	var objectMeta = getObjectMetadata(type, meta);
	if(!objectMeta) {
		return;
	}

	if(objectMeta.objectType) {
		object.objectType = objectMeta.objectType;
	}

	if(objectMeta.members) {
		objectAddMembers(object, objectMeta.members, meta);
	}
};

this.simplifyObject = function(object, meta) {
	if(!object) {
		return;
	}

	if(!meta) {
		return;
	}

	if(_.isArray(object)) {
		_.each(object, function(obj) {
			simplifyObject(obj, meta);
		});
		return;
	}

	if(_.isObject(object) && object.objectType) {
		var type = object.objectType;
		var objectMeta = getObjectMetadata(type, meta);
		if(!objectMeta) {
			return;
		}

		var template = {};
		extendWithMetadata(template, type, meta);
		_.each(objectMeta.members, function(member) {
			if(member.name) {
				var prop = object[member.name];
				if(typeof(prop) == "string" || (!_.isObject(prop) && !_.isArray(prop))) {
					if(!member.required && prop == template[member.name]) {
						if(member.name != "type" && member.name != "mode") {
							delete object[member.name];
						} else {
							if(member.name != "type" && (objectMeta.derivedFrom.indexOf("component") < 0 || type == "page" || type == "zone")) {
								delete object[member.name];
							}
						}
					}
				} else {
					if(!member.required && _.isEmpty(prop) && _.isEmpty(template[member.name]) && member.name != "collections") {
						delete object[member.name];
					} else {
						if(member.type == "query") {
							if(!prop.name && !prop.collection) {
								delete object[member.name];
							}
						} else {
							simplifyObject(prop, meta);
						}
					}
				}
			}
		});
	}
};

this.getDerivedTypes = function(objectType, includeThis, meta) {
	if(!objectType || !meta) {
		return [];
	}

	var objectMeta = getObjectMetadata(objectType, meta);
	if(!objectMeta) {
		return [];
	}

	var classList = meta.classList;
	if(!classList) {
		return [];
	}

	var hideDerivedClasses = objectMeta.hideDerivedClasses || [];
	var hideThis = objectMeta.hideThis || false;

	var derivedTypes = [];
	if(includeThis && !hideThis) {
		derivedTypes.push(objectType);
	}

	_.each(classList, function(metadata) {
		if(_.find(metadata.derivedFrom, function(derived) { return derived == objectType; })) {
			if(hideDerivedClasses.indexOf(metadata.objectType) < 0) {
				derivedTypes = _.union(derivedTypes, getDerivedTypes(metadata.objectType, true, meta));
			}
		}
	});

	return derivedTypes;
};



// ---
// convert structure to metadata v70 (kitchen v0.9.48)
// ---
var convertFieldToVersion70 = function(app, field) {
	if(field.lookup_query) {
		if(field.lookup_query["name"]) {
			var q = JSON.parse(JSON.stringify(field.lookup_query));

			field.lookup_query_name = q.name;
			if(q.params) {
				field.lookup_query_params = JSON.parse(JSON.stringify(q.params));
				delete q.params;
			} else {
				field.lookup_query_params = [];
			}

			var hasQuery = _.find(app.queries, function(el) { return el.name == q.name; });
			if(!hasQuery) {
				app.queries.push(q);
			}
		}
		delete field.lookup_query;
	}
};

var convertComponentToVersion70 = function(app, component) {
	if(component.query) {
		if(component.query["name"]) {
			var q = JSON.parse(JSON.stringify(component.query));

			component.query_name = q.name;
			if(q.params) {
				component.query_params = JSON.parse(JSON.stringify(q.params));
				delete q.params;
			} else {
				component.query_params = [];
			}

			var hasQuery = _.find(app.queries, function(el) { return el.name == q.name; });
			if(!hasQuery) {
				app.queries.push(q);
			}
		}
		delete component.query;
	}

	if(component.fields) {
		_.each(component.fields, function(fi) {
			convertFieldToVersion70(app, fi);
		});
	}

	if(component.components) {
		_.each(component.components, function(c) {
			convertComponentToVersion70(app, c);
		});
	}
};

var convertPageToVersion70 = function(app, page) {
	convertComponentToVersion70(app, page);

	if(page.queries) {
		if(page.queries.length) {
			page.related_queries = [];
			_.each(page.queries, function(query) {
				var q = JSON.parse(JSON.stringify(query));

				var subscription = {};
				subscription.name = q.name;
				if(q.params) {
					subscription.params = JSON.parse(JSON.stringify(q.params));
					delete q.params;
				} else {
					subscription.params = [];
				}
				page.related_queries.push(subscription);

				var hasQuery = _.find(app.queries, function(el) { return el.name == q.name; });
				if(!hasQuery) {
					app.queries.push(q);
				}
			});
		}
		delete page.queries;
	}

	// move menus to components and remove menus array
	if(page.menus) {
		if(page.menus.length) {
			if(!page.components) page.components = [];
			_.each(page.menus, function(menu) {
				var m = JSON.parse(JSON.stringify(menu));
				m.type = "menu";
				page.components.push(m);
			});
		}
		delete page.menus;
	}

	if(page.components) {
		_.each(page.components, function(c) {
			convertComponentToVersion70(app, c);
		});
	}

	if(page.pages) {
		_.each(page.pages, function(p) {
			convertPageToVersion70(app, p);
		});
	}
};

this.convertToVersion70 = function(data) {
	if(!data.application) return;
	var application = data.application;

	if(!application.queries) application.queries = [];

	if(application.collections) {
		_.each(application.collections, function(col) {
			if(col.fields) {
				_.each(col.fields, function(fi) {
					convertFieldToVersion70(application, fi);
				});
			}
		});
	}

	if(application.free_zone) convertPageToVersion70(application, application.free_zone);
	if(application.public_zone) convertPageToVersion70(application, application.public_zone);
	if(application.private_zone) convertPageToVersion70(application, application.private_zone);
};

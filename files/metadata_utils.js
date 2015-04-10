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
}


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
	}

	if(_.isObject(object)) {
		if(object[idField] == objectId) {
			return object;
		}
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

this.getObjectMetadata = function(objectType, meta) {
	if(!meta) {
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
}

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
}
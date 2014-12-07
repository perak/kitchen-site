// ---
// metadata utils used by meteor-kitchen GUI
// ---

var objectAddId = function(object, idFieldName) {
	var idField = idFieldName || "_id";

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

this.objectRemoveMetadata = function(object, idFieldName, typeFieldName) {
	var idField = idFieldName || "_id";
	var typeField = typeFieldName || "objectType";

	if(_.isFunction(object)) {
		return;
	}

	if(_.isArray(object)) {
		_.each(object, function(item) {
			objectRemoveMetadata(item, idField);
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
				objectRemoveMetadata(property, idFieldName);
			}
		}
		return;
	}
}


this.findObjectById = function(object, objectId, idFieldName) {
	if(!object || !objectId) {
		return null;
	}

	var idField = idFieldName || "_id";
	if(_.isFunction(object)) {
		return null;
	}

	if(_.isArray(object)) {
		_.each(object, function(item) {
			var res = findObjectById(item, objectId, idField);
			if(res) {
				return res;
			}
		});
	}

	if(_.isObject(object)) {
		if(object[idField] == objectId) {
			return object;
		}
	}

	for(var propertyName in object) {
		var property = object[propertyName];
		if(_.isObject(property)) {
			var res = findObjectById(property, objectId, idField);
			if(res) {
				return res;
			}
		}
	}
	return null;
};

this.deleteObjectWithId = function(object, objectId, idFieldName) {
	if(!object || !objectId) {
		return;
	}

	var idField = idFieldName || "_id";

	if(_.isFunction(object)) {
		return;
	}

	if(_.isArray(object)) {
		_.each(object, function(item, index) {
			if(_.isArray(item)) {
				deleteObjectWithId(item, objectId, idField);
			} else {
				if(_.isObject(item)) {
					if(item[idField] == objectId) {
						object.splice(index, 1);
						return false;
					} else {
						deleteObjectWithId(item, objectId, idField);
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
			deleteObjectWithId(property, objectId, idField);
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

	var result = {};
	_.each(classList, function(metadata) {
		if(metadata.objectType == objectType) {
			result = metadata;
			return false;
		}
	});

	return result;
};

this.getObjectArrayItemType = function(objectType, memberName, meta) {
	if(!meta) {
		return "";
	}
	var metadata = getObjectMetadata(objectType, meta);
	if(!metadata) {
		return "";
	}	

	var memberFound = false;
	var memberSubtype = "";
	_.each(metadata.members, function(member) {
		if(member.name == memberName) {
			memberFound = true;
			memberSubtype = member.subType;
			return false;
		}
	});

	if(!memberFound) {
		return getObjectArrayItemType(metadata.derivedFrom, memberName, meta);
	}

	if(!memberSubtype) {
		return "";
	}

	return memberSubtype;
}

this.pushObjectMembers = function(members, hideMembers, overrideMembers, objectType, meta) {
	var objectMeta = getObjectMetadata(objectType, meta);
	if(!objectMeta) {
		return;
	}

	var metaHide = _.union(objectMeta.hide_members || [], []);
	_.each(overrideMembers, function(over) {
		var index = metaHide.indexOf(over.name);
		if(index >= 0)
			metaHide.splice(index, 1);
	});

	hideMembers = hideMembers || [];
	var skipMembers = _.union(metaHide, hideMembers);

	var metaOverride = objectMeta.override_members || [];
	overrideMembers = overrideMembers || [];
	var overMembers = _.union(metaOverride, overrideMembers);

	_.each(objectMeta.derivedFrom, function(parentType) {
		if(parentType != objectType) {
			pushObjectMembers(members, skipMembers, overMembers, parentType, meta);
		}
	});

	_.each(objectMeta.members, function(member) {
		if(skipMembers.indexOf(member.name) < 0) {
			_.each(overMembers, function(override) {
				if(member.name == override.name) {
					member = override;
				}
			});
			members.push(member);
		}
	});
};

this.getObjectFullMetadata = function(objectType, meta) {
	var objectMeta = getObjectMetadata(objectType, meta);
	if(!objectMeta) {
		return null;
	}

	var result = JSON.parse(JSON.stringify(objectMeta));
	var members = [];
	pushObjectMembers(members, null, null, objectType, meta);

	result.members = members;
	return result;
};

var objectAddMembers = function(object, metaMemberList, skipMembers, overrideMembers, meta) {
	if(!metaMemberList) {
		return;
	}

	_.each(metaMemberList, function(metaMember) {
		if(metaMember.name && skipMembers.indexOf(metaMember.name) < 0) {
			// override
			_.each(overrideMembers, function(override) {
				if(metaMember.name == override.name) {
					metaMember = override;
				}
			});

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

	objectAddId(object, "_id");

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

	var skipMembers = objectMeta.hide_members || [];
	var overrideMembers = objectMeta.override_members || [];

	if(objectMeta.derivedFrom) {
		_.each(objectMeta.derivedFrom, function(className) {
			var classMeta = getObjectFullMetadata(className, meta);
			if(classMeta && classMeta.members) {
				var classOverride = classMeta.override_members || [];
				overrideMembers = _.union(classOverride, overrideMembers);

				var classSkip = _.union(classMeta.hide_members || [], []);
				_.each(overrideMembers, function(over) {
					var index = classSkip.indexOf(over.name);
					if(index >= 0)
						classSkip.splice(index, 1);
				});
				skipMembers = _.union(skipMembers, classSkip);


				objectAddMembers(object, classMeta.members, skipMembers, overrideMembers, meta);
			}
		});
	}

	if(objectMeta.members) {
		objectAddMembers(object, objectMeta.members, skipMembers, overrideMembers, meta);
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

	var hideDerivedClasses = objectMeta.hide_derived_classes || [];
	var hideThis = objectMeta.hide_this || false;

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
	var metaStr = Assets.getText("metadata.json");
	var data = JSON.parse(metaStr);
	var version = data.version || 1;
	if(!Metadata.findOne({ version: version })) {
		Metadata.insert({ version: version, data: data });
	}
/*
if(!Applications.findOne()) {
	var testStr = Assets.getText("TEST.json");
	Applications.insert({ name: "Test", data: JSON.parse(testStr) });
}
*/
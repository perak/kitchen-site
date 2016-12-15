this.escapeRegEx = function (string) {
	return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

this.replaceSubstrings = function(string, find, replace) {
	return string.replace(new RegExp(escapeRegEx(find), 'g'), replace);
};

this.joinStrings = function(stringArray, join) {
	var sep = join || ", ";
	var res = "";
	_.each(stringArray, function(str) {
		if(str) {
			if(res)
				res = res + sep;
			res = res + str;
		}		
	});
	return res;
};

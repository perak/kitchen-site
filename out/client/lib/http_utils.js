/*
	Download local resource without server
*/

this.downloadLocalResource = function(data, filename, mimeType) {
	filename = filename || "download";
	mimeType = mimeType || "application/octet-stream";

	var bb = new Blob([data], { type: mimeType });
	var link = document.createElement("a");
	link.download = filename;
	link.href= window.URL.createObjectURL(bb);
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
};

this.downloadFile = function(url) {
	var link = document.createElement("a");
	link.href = url;
	link.download = "download";
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
};

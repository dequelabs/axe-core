/*global dom */
dom.isHTML5 = function (doc) {
	var node = doc.doctype;
	if (node === null) {
		return false;
	}
	return node.name === 'html' && !node.publicId && !node.systemId;
};
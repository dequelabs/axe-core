/*global dom */
dom.isHTML5 = function (doc) {
	if (doc.doctype === null) {
		return false;
	}

	var node = doc.doctype;
	var doctype = '<!DOCTYPE ' + node.name + (node.publicId ? ' PUBLIC"' + node.publicId + '"' : '') +
		(!node.publicId && node.systemId ? ' SYSTEM' : '') + (node.systemId ? ' "' + node.systemId + '"' : '') + '>';

	return doctype === '<!DOCTYPE html>';
};
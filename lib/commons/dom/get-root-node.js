/* global dom */

/**
 * Return the document or document fragment (shadow DOM)
 *
 * @param {Element} node
 * @returns {DocumentFragment|Document}
 */

dom.getRootNode = function (node) {
	var doc = (node.getRootNode && node.getRootNode()) || document; // this is for backwards compatibility
	if (doc === node) {
		// disconnected node
		doc = document;
	}
	return doc;	
};
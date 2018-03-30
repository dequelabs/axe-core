/**
 * Returns the tagName,
 * if it is a HTMLElement it gets lowercased
 * @param  {Element} node element
 * @return {String}       normalized tagName
 */
axe.utils.getTagName = function(node) {
	if (node.namespaceURI === 'http://www.w3.org/1999/xhtml') {
		return node.tagName.toLowerCase();
	}

	return node.tagName;
};

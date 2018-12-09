/* global matches */
let isXHTMLGlobal
matches.nodeName = function matchNodeName (node, matcher, { isXHTML } = {}) {
	node = node.actualNode || node;
	if (typeof isXHTMLGlobal === 'undefined') {
		isXHTMLGlobal = axe.utils.isXHTML(node.ownerDocument);
	}
	if (typeof isXHTML === 'undefined') {
		isXHTML = isXHTMLGlobal
	}

	const nodeName =  (isXHTML 
		? node.nodeName
		: node.nodeName.toLowerCase()
	)
	return matches.fromString(nodeName, matcher);
}

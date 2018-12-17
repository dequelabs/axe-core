/* global matches */
let isXHTMLGlobal
matches.nodeName = function matchNodeName (node, matcher, { isXHTML } = {}) {
	node = node.actualNode || node;
	if (typeof isXHTML === 'undefined') {
		// When the matcher is a string, use native .matches() function:
		if (typeof matcher === 'string') {
			return axe.utils.matchesSelector(node, matcher);
		}
	
		if (typeof isXHTMLGlobal === 'undefined') {
			isXHTMLGlobal = axe.utils.isXHTML(node.ownerDocument);
		}
		isXHTML = isXHTMLGlobal
	}

	const nodeName =  (isXHTML 
		? node.nodeName
		: node.nodeName.toLowerCase()
	)
	return matches.fromString(nodeName, matcher);
}

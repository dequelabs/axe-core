function notHtmlMatches(node) {
	return node.nodeName.toLowerCase() !== 'html';
}

export default notHtmlMatches;

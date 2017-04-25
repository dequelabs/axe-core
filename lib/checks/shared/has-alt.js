var nn = node.nodeName.toLowerCase();
return node.hasAttribute('alt') &&
	(nn === 'img' ||
	nn === 'input' ||
	nn === 'area');
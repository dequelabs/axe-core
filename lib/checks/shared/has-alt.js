var nn = node.nodeName.toLowerCase();
return (
	node.hasAttribute('alt') && node.getAttribute('alt') !== "" && (nn === 'img' || nn === 'input' || nn === 'area')
);

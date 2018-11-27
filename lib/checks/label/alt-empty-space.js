let nn = node.nodeName.toLowerCase();
let validSetup =
	node.hasAttribute('alt') && (nn === 'img' || nn === 'input' || nn === 'area');
let validAttrValue = /^\s+$/.test(node.getAttribute('alt'));
return validSetup && validAttrValue;

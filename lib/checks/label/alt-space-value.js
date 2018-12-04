const validAttrValue = /^\s+$/.test(node.getAttribute('alt'));
return node.hasAttribute('alt') && validAttrValue;

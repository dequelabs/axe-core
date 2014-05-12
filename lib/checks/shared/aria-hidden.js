
var result = false;
if (node.getAttribute('aria-hidden') === 'true') {
	result = true;
} else {
	result = felib.dom.findUp(node, '[aria-hidden="true"]') !== null;
}

return result;
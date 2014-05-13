
if (node.getAttribute('aria-hidden') === 'true') {
	return true;
}
return felib.dom.findUp(node, '[aria-hidden="true"]') !== null;

if (node.getAttribute('aria-hidden') === 'true') {
	return true;
}
return kslib.dom.findUp(node, '[aria-hidden="true"]') !== null;
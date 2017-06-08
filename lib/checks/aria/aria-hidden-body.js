var aria = 'aria-hidden';
if (node && node.hasAttribute(aria) && node.getAttribute(aria) === 'true') {
	return false;
}

return true;

var text = axe.commons.text.sanitize(node.textContent);

if (!text) {
	return false;
}
if (!axe.commons.dom.isVisible(node, false)) {
	return false;
}

return axe.commons.dom.isInTextBlock(node);

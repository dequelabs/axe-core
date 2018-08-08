const text = axe.commons.text.sanitize(node.textContent);
const role = node.getAttribute('role');

if (role && role !== 'link') {
	return false;
}
if (!text) {
	return false;
}
if (!axe.commons.dom.isVisible(node, false)) {
	return false;
}

return axe.commons.dom.isInTextBlock(node);

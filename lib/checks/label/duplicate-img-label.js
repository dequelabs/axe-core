var imgs = node.querySelectorAll('img');
var text = axe.commons.text.visible(node, true).toLowerCase();

if (text === '') {
	return false;
}

for (var i = 0, len = imgs.length; i < len; i++) {
	var img = imgs[i];
	var imgAlt = axe.commons.text.accessibleText(img).toLowerCase();
	if (imgAlt === text &&
	img.getAttribute('role') !== 'presentation' &&
	axe.commons.dom.isVisible(img)) {
		return true;
	}
}

return false;

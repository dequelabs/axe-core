var imgs = node.querySelectorAll('img');
var text = commons.text.visible(node, true).toLowerCase();

if (text === '') {
	return false;
}

for (var i = 0, len = imgs.length; i < len; i++) {
	var imgAlt = commons.text.accessibleText(imgs[i]).toLowerCase();
	if (imgAlt === text) {
		return true;
	}
}

return false;

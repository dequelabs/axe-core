var imgs = node.querySelectorAll('img');
var text = commons.text.visible(node, true);

for (var i = 0, len = imgs.length; i < len; i++) {
	var imgAlt = commons.text.accessibleText(imgs[i]);
	if (imgAlt === text && text !== '') { return true; }
}

return false;

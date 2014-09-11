var imgs = node.querySelectorAll('img');
var text = kslib.text.visible(node, true);

for (var i = 0, len = imgs.length; i < len; i++) {
	var imgAlt = kslib.text.accessibleText(imgs[i]);
	if (imgAlt === text && text !== '') { return true; }
}

return false;

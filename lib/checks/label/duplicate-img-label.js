var imgs = node.querySelectorAll('img');
var text = kslib.text.visible(node, true);

for (var i = 0, len = imgs.length; i < len; i++) {
	var imgAlt = kslib.text.sanitize(imgs[i].alt);
	if (imgAlt === text) { return true; }
}

return false;

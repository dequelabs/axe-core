
var labelText = kslib.getLabelText(node),
	check = node.getAttribute('title');

if (!labelText) {
	return false;
}

if (!check) {

	if (node.getAttribute('aria-describedby')) {
		var ref = kslib.dom.idrefs(node, 'aria-describedby');
		check = ref.map(function (thing) {
			return thing ? kslib.text.visible(thing, true) : '';
		}).join('');
	}
}

return kslib.text.sanitize(check) === kslib.text.sanitize(labelText);
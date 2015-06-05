
var labelText = commons.text.label(node),
	check = node.getAttribute('title');

if (!labelText) {
	return false;
}

if (!check) {
	check = '';

	if (node.getAttribute('aria-describedby')) {
		var ref = commons.dom.idrefs(node, 'aria-describedby');
		check = ref.map(function (thing) {
			return thing ? commons.text.accessibleText(thing) : '';
		}).join('');
	}
}

return commons.text.sanitize(check) === commons.text.sanitize(labelText);


var labelText = felib.getLabelText(node),
	check = node.getAttribute('title');
if (!labelText)
	return false;

if (!check) {

	if (node.getAttribute('aria-describedby')) {
		var ref = felib.dom.idrefs(node, 'aria-describedby');
		check = ref.map(function (thing) {
			return thing ? felib.text.visible(thing, true) : '';
		}).join('');
	}
}

return felib.text.sanitize(check) === felib.text.sanitize(labelText);
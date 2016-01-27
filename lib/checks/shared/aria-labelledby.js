var results = commons.dom.idrefs(node, 'aria-labelledby');
var element, i, l = results.length;

for (i = 0; i < l; i++) {
	element = results[i];
	if (element && commons.text.accessibleText(element, true)) {
		return true;
	}
}

return false;

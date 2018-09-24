let nodeText = axe.commons.text.accessibleText(node);

var elems = document.body.querySelectorAll('a[href]');

return !Array.prototype.slice.call(elems).some(function(element) {
	return (
		nodeText === axe.commons.text.accessibleText(element) &&
		node.title === element.title &&
		node.href !== element.href
	);
});

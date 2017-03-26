// :not([type='hidden'])
// :not([type='image'])
// :not([type='button'])
// :not([type='submit'])
// :not([type='reset'])
if (node.nodeName.toLowerCase() !== 'input') {
	return true;
}
var t = node.getAttribute('type').toLowerCase();
if (t === 'hidden' || t === 'image' || t === 'button' || t === 'submit' ||
	t === 'reset') {
	return false;
}
return true;

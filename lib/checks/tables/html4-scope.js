
if (commons.dom.isHTML5(document)) {
	return false;
}
var nodeName = node.nodeName.toUpperCase();

return nodeName === 'TH' || nodeName === 'TD';
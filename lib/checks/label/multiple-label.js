var labels = [].slice.call(node.ownerDocument.querySelectorAll('label[for="' +
	commons.utils.escapeSelector(node.id) + '"]')),
	parent = node.parentNode;

while (parent) {
	if (parent.tagName === 'LABEL' && labels.indexOf(parent) === -1) {
		labels.push(parent);
	}
	parent = parent.parentNode;
}

this.relatedNodes(labels);
return labels.length > 1;

var labels = [].slice.call(node.ownerDocument.querySelectorAll('label[for="' +
	kslib.utils.escapeSelector(node.id) + '"]')),
	parent = node.parentNode;

while (parent) {
	if (parent.tagName === 'LABEL') {
		labels.push(parent);
	}
	parent = parent.parentNode;
}

this.relatedNodes(labels);
return labels.length > 1;

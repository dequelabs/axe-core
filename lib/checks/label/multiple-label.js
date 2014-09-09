var labels = [].slice.call(node.ownerDocument.querySelectorAll('label[for="' +
													kslib.utils.escapeSelector(node.id) + '"]')),
	labelCount = labels.length,
	parent = node.parentNode;

while (parent) {
	if (parent.tagName === 'LABEL') {
		labels.push(parent);
		labelCount++;
	}
	parent = parent.parentNode;
}

this.relatedNodes(labels);
return labelCount > 1;

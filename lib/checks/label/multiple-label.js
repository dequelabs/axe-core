var labels = [].slice.call(document.querySelectorAll('label[for="' +
	axe.commons.utils.escapeSelector(node.id) + '"]')),
	parent = node.parentNode;

while (parent) {
	if (parent.tagName === 'LABEL' && labels.indexOf(parent) === -1) {
		labels.push(parent);
	}
	parent = parent.parentNode;
}

this.relatedNodes(labels);
return labels.length > 1;

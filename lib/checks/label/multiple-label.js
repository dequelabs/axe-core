var labels = [].slice.call(document.querySelectorAll('label[for="' +
	axe.commons.utils.escapeSelector(node.id) + '"]')),
	parent = node.parentNode;

if (labels.length) {
	// filter out hidden labels
	labels = labels.filter(function(label) {
		let style = window.getComputedStyle(label);
		if (style.getPropertyValue('display') !== 'none') {
			return label;
		}
	});
}

while (parent) {
	if (parent.tagName === 'LABEL' && labels.indexOf(parent) === -1) {
		labels.push(parent);
	}
	parent = parent.parentNode;
}

this.relatedNodes(labels);
return labels.length > 1;

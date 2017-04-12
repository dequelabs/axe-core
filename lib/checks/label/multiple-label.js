var labels = [].slice.call(document.querySelectorAll('label[for="' +
	axe.commons.utils.escapeSelector(node.id) + '"]')),
	parent = node.parentNode;

if (labels.length) {
	// filter out hidden labels because they're fine
	// except: fail first label if hidden because of VO
	labels = labels.filter(function(label, index) {
		if ((index === 0 && !axe.commons.dom.isVisible(label, true)) || axe.commons.dom.isVisible(label, true)) {
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

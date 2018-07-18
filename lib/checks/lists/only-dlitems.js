const ALLOWED_TAGS = [
	'STYLE',
	'META',
	'LINK',
	'MAP',
	'AREA',
	'SCRIPT',
	'DATALIST',
	'TEMPLATE'
];

const ALLOWED_ROLES = ['definition', 'term', 'list'];

let base = {
	badNodes: [],
	hasNonEmptyTextNode: false
};

const result = virtualNode.children.reduce((out, childNode) => {
	const { actualNode } = childNode;
	const tagName = actualNode.nodeName.toUpperCase();

	if (actualNode.nodeType === 1 && !ALLOWED_TAGS.includes(tagName)) {
		const role = (actualNode.getAttribute('role') || '').toLowerCase();
		if ((tagName !== 'DT' && tagName !== 'DD') || role) {
			if (!ALLOWED_ROLES.includes(role)) {
				// handle comment - https://github.com/dequelabs/axe-core/pull/518/files#r139284668
				out.badNodes.push(actualNode);
			}
		}
	} else if (actualNode.nodeType === 3 && actualNode.nodeValue.trim() !== '') {
		out.hasNonEmptyTextNode = true;
	}
	return out;
}, base);

if (result.badNodes.length) {
	this.relatedNodes(result.badNodes);
}

return !!result.badNodes.length || result.hasNonEmptyTextNode;

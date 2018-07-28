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

const getIsHidden = actualNode => {
	return (
		window.getComputedStyle(actualNode, null).getPropertyValue('display') ===
		'none'
	);
};

let base = {
	badNodes: [],
	hasNonEmptyTextNode: false
};

const result = virtualNode.children.reduce((out, childNode) => {
	/*eslint 
		max-statements: ["error", 20]
		complexity: ["error", 11] 
		*/
	const { actualNode } = childNode;
	const tagName = actualNode.nodeName.toUpperCase();

	if (actualNode.nodeType === 1 && !ALLOWED_TAGS.includes(tagName)) {
		const role = (actualNode.getAttribute('role') || '').toLowerCase();
		const isHidden = getIsHidden(actualNode);

		if ((tagName !== 'DT' && tagName !== 'DD') || role) {
			if (!ALLOWED_ROLES.includes(role) && !isHidden) {
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

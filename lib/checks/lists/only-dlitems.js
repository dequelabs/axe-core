
const ALLOWED_TAGS = [
	'style',
	'meta',
	'link',
	'map',
	'area',
	'script',
	'datalist',
	'template'
];

const ALLOWED_ROLES = ['definition', 'term', 'list'];

let base = {
	badNodes: [],
	hasNonEmptyTextNode: false
};

const out = virtualNode.children
	.reduce((out, { actualNode }) => {
		const tagName = actualNode.nodeName.toLowerCase();
		if (actualNode.nodeType === 1 && ALLOWED_TAGS.indexOf(tagName) === -1) {
			const role = (actualNode.getAttribute('role') || '').toLowerCase();
			if ((tagName !== 'dt' && tagName !== 'dd') || role) {
				if (!(ALLOWED_ROLES.includes(role))) { // handle comment - https://github.com/dequelabs/axe-core/pull/518/files#r139284668
					out.badNodes.push(actualNode);
				}
			}
		} else if (actualNode.nodeType === 3 &&
			actualNode.nodeValue.trim() !== '') {
			out.hasNonEmptyTextNode = true;
		}
		return out;
	}, base);

if (out.badNodes.length) {
	this.relatedNodes(out.badNodes);
}

return !!out.badNodes.length || out.hasNonEmptyTextNode;
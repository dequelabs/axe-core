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
const { getRole } = axe.commons.aria;

let base = {
	badNodes: [],
	hasNonEmptyTextNode: false
};

const content = virtualNode.children.reduce((content, child) => {
	const { actualNode } = child;
	if (
		actualNode.nodeName.toUpperCase() === 'DIV' &&
		getRole(actualNode) === null
	) {
		return content.concat(child.children);
	}
	return content.concat(child);
}, []);

const result = content.reduce((out, childNode) => {
	const { actualNode } = childNode;
	const tagName = actualNode.nodeName.toUpperCase();

	if (actualNode.nodeType === 1 && !ALLOWED_TAGS.includes(tagName)) {
		const explicitRole = getRole(actualNode, { noImplicit: true });

		if ((tagName !== 'DT' && tagName !== 'DD') || explicitRole) {
			if (!ALLOWED_ROLES.includes(explicitRole)) {
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

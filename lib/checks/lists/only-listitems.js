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

const getIsListItemRole = (r, t) => {
	let out = false;
	out = (r === 'listitem' || (t === 'li' && !r));
	return out;
};

const getHasListItem = (hasListItem, tagName, isListItemRole) => {
	return hasListItem || (tagName === 'li' && isListItemRole) || isListItemRole;
}

let base = {
	badNodes: [],
	isEmpty: true,
	hasNonEmptyTextNode: false,
	hasListItem: false,
	liItemsWithRole: 0
};

let out = virtualNode.children
	.reduce((out, { actualNode }) => {
		/*eslint 
		complexity: ["error", 11] 
		*/
		const tagName = actualNode.nodeName.toLowerCase();

		switch (actualNode.nodeType) {
		case 1:
			if (!ALLOWED_TAGS.includes(tagName)) {
				const role = (actualNode.getAttribute('role') || '').toLowerCase();
				const isListItemRole = getIsListItemRole(role, tagName);
				
				out.hasListItem = getHasListItem(out.hasListItem, tagName, isListItemRole);

				if (isListItemRole) {
					out.isEmpty = false;
				}
				if (tagName === 'li' && !isListItemRole) {
					out.liItemsWithRole++;
				}
				if (tagName !== 'li' && !isListItemRole) {
					out.badNodes.push(actualNode);
				}
			}
			break;
		case 3:
			if (actualNode.nodeValue.trim() !== '') {
				out.hasNonEmptyTextNode = true;
			}
			break;
		default:
			break;
		}
		return out;
	}, base);

const virtualNodeChildrenOfTypeLi = virtualNode.children
	.filter(({ actualNode }) => {
		return actualNode.nodeName.toLowerCase() === 'li'
	});

const allLiItemsHaveRole = out.liItemsWithRole > 0 &&
	virtualNodeChildrenOfTypeLi.length === out.liItemsWithRole;

if (out.badNodes.length) {
	this.relatedNodes(out.badNodes);
}

return (
	!(out.hasListItem ||
		(out.isEmpty && !allLiItemsHaveRole)) ||
	!!out.badNodes.length ||
	out.hasNonEmptyTextNode
);

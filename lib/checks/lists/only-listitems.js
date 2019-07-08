const { dom } = axe.commons;
const getIsListItemRole = (role, tagName) => {
	return role === 'listitem' || (tagName === 'LI' && !role);
};

const getHasListItem = (hasListItem, tagName, isListItemRole) => {
	return hasListItem || (tagName === 'LI' && isListItemRole) || isListItemRole;
};

let base = {
	badNodes: [],
	isEmpty: true,
	hasNonEmptyTextNode: false,
	hasListItem: false,
	liItemsWithRole: 0
};

let out = virtualNode.children.reduce((out, { actualNode }) => {
	const tagName = actualNode.nodeName.toUpperCase();

	if (actualNode.nodeType === 1 && dom.isVisible(actualNode, true, false)) {
		const role = (actualNode.getAttribute('role') || '').toLowerCase();
		const isListItemRole = getIsListItemRole(role, tagName);

		out.hasListItem = getHasListItem(out.hasListItem, tagName, isListItemRole);

		if (isListItemRole) {
			out.isEmpty = false;
		}
		if (tagName === 'LI' && !isListItemRole) {
			out.liItemsWithRole++;
		}
		if (tagName !== 'LI' && !isListItemRole) {
			out.badNodes.push(actualNode);
		}
	}
	if (actualNode.nodeType === 3) {
		if (actualNode.nodeValue.trim() !== '') {
			out.hasNonEmptyTextNode = true;
		}
	}

	return out;
}, base);

const virtualNodeChildrenOfTypeLi = virtualNode.children.filter(
	({ actualNode }) => {
		return actualNode.nodeName.toUpperCase() === 'LI';
	}
);

const allLiItemsHaveRole =
	out.liItemsWithRole > 0 &&
	virtualNodeChildrenOfTypeLi.length === out.liItemsWithRole;

if (out.badNodes.length) {
	this.relatedNodes(out.badNodes);
}

const isInvalidListItem = !(
	out.hasListItem ||
	(out.isEmpty && !allLiItemsHaveRole)
);
return isInvalidListItem || !!out.badNodes.length || out.hasNonEmptyTextNode;

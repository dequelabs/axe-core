/**
 * Note:
 * `excludeHidden=true` for this rule, thus considering only elements in the accessibility tree.
 */
const { isHidden, querySelectorAll } = axe.utils;
const nodeAndDescendents = querySelectorAll(virtualNode, '*');

const hasVisibleChildren = nodeAndDescendents.filter(
	({ actualNode }) => !isHidden(actualNode)
);
if (!hasVisibleChildren) {
	return false;
}

return !!axe.utils.getScroll(node, 13); //1em ~= 13px

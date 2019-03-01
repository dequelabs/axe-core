/**
 * Note:
 * `excludeHidden=true` for this rule, thus considering only elements in the accessibility tree.
 */
const nodeAndDescendents = axe.utils.querySelectorAll(virtualNode, '*');
const scrollableElements = nodeAndDescendents.filter(
	vNode => !!axe.utils.getScroll(vNode.actualNode)
);
return scrollableElements.length > 0;

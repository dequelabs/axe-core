/**
 * Note:
 * `excludeHidden=true` for this rule, thus considering only elements in the accessibility tree.
 */
const { actualNode } = node;

// match if element is scrollable
return !!axe.utils.getScroll(actualNode);

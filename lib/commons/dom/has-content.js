/*global dom, aria, axe */
/**
 * Check that the element has visible content
 * in the form of either text, an aria-label or visual content such as image
 *
 * @param {Object} virtual DOM node
 * @return boolean
 */
dom.hasContent = function hasContent(elm) {
  if (elm.actualNode instanceof Node === false) {
    elm = axe.utils.getNodeFromTree(axe._tree[0], elm);
  }
  if (
    elm.actualNode.textContent.trim() ||
    aria.label(elm)
  ) {
    return true;
  }

  const contentElms = axe.utils.querySelectorAll(elm, '*');
  for (let i = 0; i < contentElms.length; i++) {
    if (
      aria.label(contentElms[i]) ||
      dom.isVisualContent(contentElms[i].actualNode)
    ) {
      return true;
    }
  }
  return false;
};

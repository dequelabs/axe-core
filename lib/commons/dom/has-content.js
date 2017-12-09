/* global dom, aria */
/**
 * Check that the element has visible content in the form of either text,
 * an aria-label or visual content such as image
 *
 * @method hasContent
 * @memberof axe.commons.dom
 * @instance
 * @param {DOMNode} elm DOMNode element to check
 * @param {Array} (optional) skipItems Items to ignore as content
 * @return boolean
 */
dom.hasContent = function hasContent(elm, skipItems = []) {
  if (
    elm.textContent.trim() ||
    aria.label(elm)
  ) {
    return true;
  }

  const contentElms = elm.querySelectorAll('*');
  for (let i = 0; i < contentElms.length; i++) {
    if (
      skipItems.indexOf(contentElms[i]) === -1 &&
      aria.label(contentElms[i]) ||
      dom.isVisualContent(contentElms[i])
    ) {
      return true;
    }
  }
  return false;
};

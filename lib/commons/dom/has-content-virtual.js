/*global dom, aria, axe */
const hiddenTextElms = [
  'HEAD', 'TITLE', 'TEMPLATE', 'SCRIPT','STYLE',
  'IFRAME', 'OBJECT', 'VIDEO', 'AUDIO', 'NOSCRIPT'
];

function hasChildTextNodes (elm) {
  if (!hiddenTextElms.includes(elm.actualNode.nodeName.toUpperCase())) {
    return elm.children.some(({ actualNode }) => (
      actualNode.nodeType === 3 && actualNode.nodeValue.trim()
    ));
  }
}

/**
 * Check that the element has visible content
 * in the form of either text, an aria-label or visual content such as image
 *
 * @param {Object} virtual DOM node
 * @return boolean
 */
dom.hasContentVirtual = function (elm, noRecursion) {
  return (
    // It has text
    hasChildTextNodes(elm) ||
     // It is a graphical element
    dom.isVisualContent(elm.actualNode) ||
     // It has an ARIA label
    !!aria.labelVirtual(elm) ||
    // or one of it's descendants does
    (!noRecursion && elm.children.some(child => (
      child.actualNode.nodeType === 1 && dom.hasContentVirtual(child)
    )))
  );
};

/**
 * Like hasContentVirtual, except with a DOM Node
 * IMPORTANT: This method requires the composed tree at axe._tree
 *
 * @param {Object}  DOM node
 * @return boolean
 */
dom.hasContent = function hasContent (elm, noRecursion) {
  elm = axe.utils.getNodeFromTree(axe._tree[0], elm);
  return dom.hasContentVirtual(elm, noRecursion);
};

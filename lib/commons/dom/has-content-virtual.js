/* global dom, aria, axe */
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
 * Check that the element has visible content in the form of either text,
 * an aria-label or visual content such as image
 * @method hasContentVirtual
 * @memberof axe.commons.dom
 * @instance
 * @param  {VirtualNode} elm Virtual Node to search
 * @param  {Boolean} noRecursion If true, only the element is checked, otherwise it will search all child nodes
 * @return {Boolean}
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
 * Find virtual node and call hasContentVirtual()
 * IMPORTANT: This method requires the composed tree at axe._tree
 * @see axe.commons.dom.hasContentVirtual
 * @method hasContent
 * @memberof axe.commons.dom
 * @instance
 * @param {DOMNode} elm DOMNode element to check
 * @param  {Boolean} noRecursion If true, only the element is checked, otherwise it will search all child nodes
 * @return {Boolean}
 */
dom.hasContent = function hasContent (elm, noRecursion) {
  elm = axe.utils.getNodeFromTree(axe._tree[0], elm);
  return dom.hasContentVirtual(elm, noRecursion);
};

/**
 * @typedef VirtualNode
 * @type {Object}
 * @property {HTMLElement} actualNode reference to actual HTML DOM element
 * @property {Array<VirtualNode>} children array of child virtualNodes
 * @property {String} shadowId The shadowId indicates whether the node is in a shadow root
 * and if it is, which one it is inside the boundary.
 */

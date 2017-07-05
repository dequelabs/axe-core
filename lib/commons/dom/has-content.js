/*global dom, aria */
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
dom.hasContent = function hasContent (elm) {
  /* global console */
  console.log(
    elm.actualNode,
    hasChildTextNodes(elm),
    dom.isVisualContent(elm.actualNode),
    aria.label(elm)
  );
  return (
    // It has text
    hasChildTextNodes(elm) ||
     // It is a graphical element
    dom.isVisualContent(elm.actualNode) ||
     // It has an ARIA label
    !!aria.label(elm) ||
    // or one of it's descendants does
    elm.children.some(child => (
      child.actualNode.nodeType === 1 && dom.hasContent(child)
    ))
  );
};

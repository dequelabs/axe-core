/*global dom */
/**
 * Get an element's parent in the composed tree
 * @param   DOMNode   Element
 * @return  DOMNode   Parent element
 */
dom.getComposedParent = function getComposedParent (element)  {
  if (element.assignedSlot) {
    return element.assignedSlot; // content of a shadow DOM slot
  } else if (element.parentNode) {
    var parentNode = element.parentNode;
    if (parentNode.nodeType === 1) {
      return parentNode; // Regular node
    } else if (parentNode.host) {
      return parentNode.host; // Shadow root
    }
  }
  return null; // Root node
};

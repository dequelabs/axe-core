import noExplicitNameRequired from './no-explicit-name-required-matches';

export default (node, vNode) =>
  [noExplicitNameRequired, objectHasLoaded].every(fn => fn(node, vNode));

/**
 * Test if an object loaded content; assume yes if we can't prove otherwise
 *
 * @param {Element} node
 * @param {VirtualNode} vNode
 * @returns {boolean}
 */
function objectHasLoaded(node) {
  if (!node?.ownerDocument?.createRange) {
    return true; // Assume it did
  }
  // There's no ready
  const range = node.ownerDocument.createRange();
  range.setStart(node, 0);
  range.setEnd(node, node.childNodes.length);
  return range.getClientRects().length === 0;
}

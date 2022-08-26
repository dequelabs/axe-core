/**
 * Determine if an element is natively hidden
 * @param {VirtualNode} vNode
 * @return {Boolean}
 */
export function nativelyHidden(vNode) {
  return ['style', 'script', 'noscript', 'template'].includes(vNode.props.nodeName);
}

/**
 * Determine if an element is hidden using the display property
 * @param {VirtualNode} vNode
 * @return {Boolean}
 */
export function displayHidden(vNode) {
  return vNode.getComputedStylePropertyValue('display') === 'none';
}

/**
 * Determine if an element is hidden using the visibility property. Visibility is only applicable for the node itself (and not any ancestors)
 * @param {VirtualNode} vNode
 * @param {Boolean} recursed If this function is being called on an ancestor for the desired node
 * @return {Boolean}
 */
export function visibilityHidden(vNode, recursed) {
  return !recursed && ['hidden', 'collapse'].includes(vNode.getComputedStylePropertyValue('visibility'))
}
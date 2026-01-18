import idrefs from '../dom/idrefs';

/**
 * Get an element's owned elements
 *
 * @param {VirtualNode} element
 * @return {VirtualNode[]} Owned elements
 */
function getOwnedVirtual(virtualNode) {
  const { actualNode, children } = virtualNode;
  if (!children) {
    throw new Error('getOwnedVirtual requires a virtual node');
  }
  // TODO: Check that the element has a role
  // TODO: Descend into children with role=presentation|none
  // TODO: Exclude descendents owned by other elements
  if (virtualNode.hasAttr('aria-owns')) {
    const owns = idrefs(actualNode, 'aria-owns')
      .filter(element => !!element)
      .map(element => axe.utils.getNodeFromTree(element));

    // Deduplicates by first occurrence to match browser accessibility tree behavior
    // See: https://github.com/dequelabs/axe-core/pull/4987
    const uniqueOwns = owns.filter((own, index) => owns.indexOf(own) === index);
    const nativeChildren = children.filter(
      child => !uniqueOwns.includes(child)
    );

    return [...nativeChildren, ...uniqueOwns];
  }

  return [...children];
}

export default getOwnedVirtual;

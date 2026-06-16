import hasAriaValue from './has-aria-value';
import getResolvedRefs from '../dom/get-resolved-refs';

/**
 * Get an element's owned elements
 *
 * @param {VirtualNode} element
 * @return {VirtualNode[]} Owned elements
 */
function getOwnedVirtual(virtualNode) {
  const { children } = virtualNode;
  if (!children) {
    throw new Error('getOwnedVirtual requires a virtual node');
  }
  // TODO: Check that the element has a role
  // TODO: Descend into children with role=presentation|none
  // TODO: Exclude descendents owned by other elements
  if (hasAriaValue(virtualNode, 'aria-owns')) {
    const owns = getResolvedRefs(virtualNode, 'aria-owns').filter(
      vNode => !!vNode
    );

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

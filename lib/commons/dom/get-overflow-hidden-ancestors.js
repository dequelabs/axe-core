import memoize from '../../core/utils/memoize';

/**
 * Get all ancestor nodes (including the passed in node) that have overflow:hidden
 * @method getOverflowHiddenAncestors
 * @memberof axe.commons.dom
 * @param {VirtualNode} vNode
 * @returns {VirtualNode[]}
 */
const getOverflowHiddenAncestors = memoize(
  function getOverflowHiddenAncestorsMemoized(vNode) {
    const ancestors = [];

    if (!vNode) {
      return ancestors;
    }

    const overflow = vNode.getComputedStylePropertyValue('overflow');

    if (overflow === 'hidden') {
      ancestors.push(vNode);
    }

    return ancestors.concat(getOverflowHiddenAncestors(vNode.parent));
  }
);

export default getOverflowHiddenAncestors;

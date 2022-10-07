import memoize from '../../core/utils/memoize';

/**
 * Get all ancestor nodes (including the passed in node) that have overflow:hidden
 * @method getOverflowHiddenNodes
 * @memberof axe.commons.dom
 * @param {VirtualNode} vNode
 * @returns {VirtualNode[]}
 */
const getOverflowHiddenNodes = memoize(function getOverflowHiddenNodesMemoized(
  vNode
) {
  const ancestors = [];

  if (!vNode) {
    return ancestors;
  }

  const overflow = vNode.getComputedStylePropertyValue('overflow');

  if (overflow === 'hidden') {
    ancestors.push(vNode);
  }

  return ancestors.concat(getOverflowHiddenNodes(vNode.parent));
});

export default getOverflowHiddenNodes;

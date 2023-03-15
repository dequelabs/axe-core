import { getNodeFromTree } from '../../core/utils';

/**
 * Returns the opacity of an element, or 1 if it can't be determined
 * @method getOpacity
 * @memberof axe.commons.color
 * @instance
 * @param {Element} node
 * @param {CSSStyleDeclaration} nodeStyle
 * @return {number}
 */
export default function getOpacity(node, nodeStyle) {
  if (!node) {
    return 1;
  }

  const vNode = getNodeFromTree(node);
  if (vNode && vNode._opacity !== undefined && vNode._opacity !== null) {
    return vNode._opacity;
  }

  nodeStyle ??= window.getComputedStyle(node);
  const opacity = nodeStyle.getPropertyValue('opacity');
  const finalOpacity = opacity * getOpacity(node.parentElement);

  // cache the results of the getOpacity check on the parent tree
  // so we don't have to look at the parent tree again for all its
  // descendants
  if (vNode) {
    vNode._opacity = finalOpacity;
  }

  return finalOpacity;
}

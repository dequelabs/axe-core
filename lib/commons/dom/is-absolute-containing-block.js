import isFixedContainingBlock from './is-fixed-containing-block';

/**
 * Determine if an element is the containing block of its absolute descendants.
 * @method isAbsoluteContainingBlock
 * @memberof axe.commons.dom
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
 * @param {VirtualNode} vNode
 * @return {Boolean}
 */
export default function isAbsoluteContainingBlock(vNode) {
  // display: contents generates no box, so it can't contain anything
  if (vNode.getComputedStylePropertyValue('display') === 'contents') {
    return false;
  }
  if (vNode.getComputedStylePropertyValue('position') !== 'static') {
    return true;
  }
  return isFixedContainingBlock(vNode);
}

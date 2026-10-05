import { visibleVirtual } from '../commons/text';

/**
 * Only test elements that have visible text, of their own or in a descendant.
 * An element that is not visible can still have a visible descendant. Which
 * text gets its spacing from the element is decided by the checks.
 * @param {HTMLElement} node
 * @param {VirtualNode} virtualNode
 * @return {Boolean}
 */
export default function avoidInlineSpacingMatches(node, virtualNode) {
  return visibleVirtual(virtualNode) !== '';
}

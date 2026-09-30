import { isVisibleOnScreen } from '../commons/dom';
import { visibleVirtual } from '../commons/text';

/**
 * Only test visible elements that have visible text, of their own or in a
 * descendant. Which text gets its spacing from the element is decided by the
 * checks.
 * @param {HTMLElement} node
 * @param {VirtualNode} virtualNode
 * @return {Boolean}
 */
export default function avoidInlineSpacingMatches(node, virtualNode) {
  return isVisibleOnScreen(virtualNode) && visibleVirtual(virtualNode) !== '';
}

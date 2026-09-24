import { isVisibleOnScreen } from '../commons/dom';
import { sanitize } from '../commons/text';

/**
 * Only test visible elements that have text of their own. Text in descendants
 * is tested on the element that sets its spacing, since a descendant can
 * override it (ACT rules 24afc2, 9e45ec and 78fd32).
 * @param {HTMLElement} node
 * @param {VirtualNode} virtualNode
 * @return {Boolean}
 */
export default function avoidInlineSpacingMatches(node, virtualNode) {
  return (
    isVisibleOnScreen(virtualNode) &&
    virtualNode.children.some(
      ({ props }) => props.nodeType === 3 && sanitize(props.nodeValue) !== ''
    )
  );
}

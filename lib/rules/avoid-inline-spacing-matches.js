import { isVisibleOnScreen } from '../commons/dom';
import { sanitize } from '../commons/text';

const spacingProperties = ['letter-spacing', 'word-spacing', 'line-height'];

/**
 * Only test visible elements that have text, of their own or in a descendant.
 * Text in a descendant is skipped when the descendant, or an element between
 * it and this one, declares the same spacing properties: the text gets its
 * spacing from there, and that element is tested instead (ACT rules 24afc2,
 * 9e45ec and 78fd32).
 * @param {HTMLElement} node
 * @param {VirtualNode} virtualNode
 * @return {Boolean}
 */
export default function avoidInlineSpacingMatches(node, virtualNode) {
  if (!isVisibleOnScreen(virtualNode)) {
    return false;
  }
  const declared = spacingProperties.filter(prop => declares(node, prop));
  return hasInheritingText(virtualNode, declared);
}

/**
 * Check for visible text that gets one of the declared properties from the
 * element that is tested, and not from an element in between.
 * @param {VirtualNode} vNode
 * @param {String[]} declared Properties the tested element declares, and no
 *   element between it and vNode does
 * @return {Boolean}
 */
function hasInheritingText(vNode, declared) {
  return vNode.children.some(child => {
    if (child.props.nodeType === 3) {
      return sanitize(child.props.nodeValue) !== '';
    }
    if (!isVisibleOnScreen(child)) {
      return false;
    }
    const inherited = declared.filter(
      prop => !declares(child.actualNode, prop)
    );
    if (declared.length > 0 && inherited.length === 0) {
      return false;
    }
    return hasInheritingText(child, inherited);
  });
}

/**
 * @param {HTMLElement} node
 * @param {String} property
 * @return {Boolean} Whether the style attribute of the node sets the property
 */
function declares(node, property) {
  return node.style.getPropertyValue(property) !== '';
}

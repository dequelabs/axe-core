import { isInTabOrder } from '../../commons/dom';
import { closest } from '../../core/utils';

function focusableElementEvaluate(node, options, virtualNode) {
  /**
   * Note:
   * Check
   * - if element is focusable
   * - if element is in focus order via `tabindex`
   */
  if (
    virtualNode.hasAttr('contenteditable') &&
    isContenteditable(virtualNode)
  ) {
    return true;
  }

  return isInTabOrder(virtualNode);

  // contenteditable is focusable when it is an empty string (whitespace
  // is not considered empty) or "true". if the value is "false"
  // you can't edit it, but if it's anything else it inherits the value
  // from the first valid ancestor
  // @see https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/contenteditable
  function isContenteditable(vNode) {
    const contenteditable = vNode.attr('contenteditable');
    if (contenteditable === 'true' || contenteditable === '') {
      return true;
    }

    if (contenteditable === 'false') {
      return false;
    }

    const ancestor = closest(virtualNode.parent, '[contenteditable]');
    if (!ancestor) {
      return false;
    }

    return isContenteditable(ancestor);
  }
}

export default focusableElementEvaluate;

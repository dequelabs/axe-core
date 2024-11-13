import { isFocusable } from '../../commons/dom';
import { accessibleTextVirtual } from '../../commons/text';
import { parseTabindex } from '../../core/utils';

function focusableNoNameEvaluate(node, options, virtualNode) {
  const tabIndex = parseTabindex(virtualNode.attr('tabindex'));
  const inFocusOrder =
    isFocusable(virtualNode) && tabIndex !== null && tabIndex > -1;
  if (!inFocusOrder) {
    return false;
  }

  try {
    return !accessibleTextVirtual(virtualNode);
  } catch {
    return undefined;
  }
}

export default focusableNoNameEvaluate;

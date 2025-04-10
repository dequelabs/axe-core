import { isInTabOrder } from '../../commons/dom';
import { accessibleTextVirtual } from '../../commons/text';

function focusableNoNameEvaluate(node, options, virtualNode) {
  if (!isInTabOrder(virtualNode)) {
    return false;
  }

  try {
    return !accessibleTextVirtual(virtualNode);
  } catch {
    return undefined;
  }
}

export default focusableNoNameEvaluate;

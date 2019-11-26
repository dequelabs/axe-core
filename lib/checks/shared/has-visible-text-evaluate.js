import { accessibleTextVirtual } from '../../commons/text';

function hasVisibleTextEvaluate(node, options, virtualNode, context) {
  return accessibleTextVirtual(virtualNode).length > 0;
}

export default hasVisibleTextEvaluate;
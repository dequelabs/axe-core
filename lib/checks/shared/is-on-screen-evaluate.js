import { isVisibleOnScreen } from '../../commons/dom';

function isOnScreenEvaluate(node) {
  // From a visual perspective
  return isVisibleOnScreen(node);
}

export default isOnScreenEvaluate;

import { isVisibleOnScreen, isOffscreen } from '../../commons/dom';

function isOnScreenEvaluate(node) {
  // From a visual perspective
  return isVisibleOnScreen(node) && !isOffscreen(node);
}

export default isOnScreenEvaluate;

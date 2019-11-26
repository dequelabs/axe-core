import { isVisible, isOffscreen } from '../../commons/dom';

function isOnScreenEvaluate(node, options, virtualNode, context) {
  // From a visual perspective
  return (
  	isVisible(node, false) && !isOffscreen(node)
  );
}

export default isOnScreenEvaluate;
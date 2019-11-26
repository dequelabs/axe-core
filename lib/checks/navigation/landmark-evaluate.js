import { querySelectorAll } from '../../core/utils';

function landmarkEvaluate(node, options, virtualNode, context) {
  return (
  	querySelectorAll(virtualNode, 'main, [role="main"]').length > 0
  );
}

export default landmarkEvaluate;
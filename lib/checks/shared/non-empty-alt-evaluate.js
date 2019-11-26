import { sanitize } from '../../commons/text';

function nonEmptyAltEvaluate(node, options, virtualNode, context) {
  var label = node.getAttribute('alt');
  return !!(label ? sanitize(label).trim() : '');
}

export default nonEmptyAltEvaluate;
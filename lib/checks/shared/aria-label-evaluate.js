import { sanitize } from '../../commons/text';
import { arialabelText } from '../../commons/aria';

function ariaLabelEvaluate(node, options, virtualNode, context) {
  return !!sanitize(arialabelText(node));
}

export default ariaLabelEvaluate;
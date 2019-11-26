import { sanitize } from '../../commons/text';
import { arialabelledbyText } from '../../commons/aria';

function ariaLabelledbyEvaluate(node, options, virtualNode, context) {
  return !!sanitize(arialabelledbyText(node));
}

export default ariaLabelledbyEvaluate;
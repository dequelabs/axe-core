import { sanitize } from '../../commons/text';
import { arialabelledbyText } from '../../commons/aria';

function ariaLabelledbyEvaluate(node, options, virtualNode) {
  try {
    return !!sanitize(arialabelledbyText(virtualNode));
  } catch {
    return undefined;
  }
}

export default ariaLabelledbyEvaluate;

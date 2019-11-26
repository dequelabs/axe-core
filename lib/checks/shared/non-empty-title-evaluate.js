import { sanitize, titleText } from '../../commons/text';

function nonEmptyTitleEvaluate(node, options, virtualNode, context) {
  return !!sanitize(titleText(node));
}

export default nonEmptyTitleEvaluate;
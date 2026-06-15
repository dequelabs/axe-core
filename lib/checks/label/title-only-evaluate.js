import { labelVirtual, titleText } from '../../commons/text';
import { hasAriaValue } from '../../commons/aria';

function titleOnlyEvaluate(node, options, virtualNode) {
  const labelText = labelVirtual(virtualNode);
  const title = titleText(virtualNode);
  const ariaDescribedBy = hasAriaValue(virtualNode, 'aria-describedby');

  return !labelText && !!(title || ariaDescribedBy);
}

export default titleOnlyEvaluate;

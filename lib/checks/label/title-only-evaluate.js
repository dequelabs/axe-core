import { labelVirtual, titleText } from '../../commons/text';
import { getAriaValue } from '../../commons/aria';

function titleOnlyEvaluate(node, options, virtualNode) {
  const labelText = labelVirtual(virtualNode);
  const title = titleText(virtualNode);
  const ariaDescribedBy = getAriaValue(virtualNode, 'aria-describedby').value;

  return !labelText && !!(title || ariaDescribedBy);
}

export default titleOnlyEvaluate;

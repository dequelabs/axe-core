import { labelVirtual, titleText } from '../../commons/text';
import { getAriaValue } from '../../commons/aria';
import { isVisibleOnScreen } from '../../commons/dom';

function titleOnlyEvaluate(node, options, virtualNode) {
  // A visually hidden control, e.g. a file input behind a custom drop zone,
  // has nothing on screen that a visible label would need to describe.
  if (!isVisibleOnScreen(virtualNode)) {
    return false;
  }

  const labelText = labelVirtual(virtualNode);
  const title = titleText(virtualNode);
  const ariaDescribedBy = getAriaValue(virtualNode, 'aria-describedby').value;

  return !labelText && !!(title || ariaDescribedBy);
}

export default titleOnlyEvaluate;

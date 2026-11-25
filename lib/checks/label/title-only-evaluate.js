import {
  labelVirtual,
  titleText,
  accessibleDescription
} from '../../commons/text';

function titleOnlyEvaluate(node, options, virtualNode) {
  const labelText = labelVirtual(virtualNode);
  const title = titleText(virtualNode);

  return !labelText && !!(title || accessibleDescription(virtualNode));
}

export default titleOnlyEvaluate;

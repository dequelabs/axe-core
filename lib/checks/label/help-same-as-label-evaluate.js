import { labelVirtual, accessibleText, sanitize } from '../../commons/text';
import { getResolvedRefs } from '../../commons/dom';
import { hasAriaValue } from '../../commons/aria';

function helpSameAsLabelEvaluate(node, options, virtualNode) {
  const labelText = labelVirtual(virtualNode);
  let check = node.getAttribute('title');

  if (!labelText) {
    return false;
  }

  if (!check) {
    check = '';

    if (hasAriaValue(virtualNode, 'aria-describedby')) {
      const ref = getResolvedRefs(virtualNode, 'aria-describedby');
      check = ref
        .map(thing => {
          return thing ? accessibleText(thing.actualNode) : '';
        })
        .join('');
    }
  }

  return sanitize(check) === sanitize(labelText);
}

export default helpSameAsLabelEvaluate;

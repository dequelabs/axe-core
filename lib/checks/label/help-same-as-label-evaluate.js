import {
  labelVirtual,
  accessibleTextVirtual,
  sanitize
} from '../../commons/text';
import { getResolvedRefs } from '../../commons/dom';
import { hasAriaValue } from '../../commons/aria';

function helpSameAsLabelEvaluate(node, options, virtualNode) {
  const labelText = labelVirtual(virtualNode);
  let check = virtualNode.attr('title');

  if (!labelText) {
    return false;
  }

  if (!check) {
    check = '';

    if (hasAriaValue(virtualNode, 'aria-describedby')) {
      const ref = getResolvedRefs(virtualNode, 'aria-describedby');
      check = ref
        .map(vNode => {
          return vNode ? accessibleTextVirtual(vNode) : '';
        })
        .join('');
    }
  }

  return sanitize(check) === sanitize(labelText);
}

export default helpSameAsLabelEvaluate;

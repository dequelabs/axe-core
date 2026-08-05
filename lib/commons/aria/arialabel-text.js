import { nodeLookup } from '../../core/utils';
import getAriaValue from './get-aria-value';

/**
 * Get the text value of aria-label, if any
 *
 * @deprecated Do not use Element directly. Pass VirtualNode instead
 * @param {VirtualNode|Element} element
 * @return {string} ARIA label
 */
export default function arialabelText(element) {
  const { vNode } = nodeLookup(element);
  if (vNode?.props.nodeType !== 1) {
    return '';
  }

  return getAriaValue(vNode, 'aria-label').value || '';
}

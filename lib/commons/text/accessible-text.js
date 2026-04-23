import accessibleTextVirtual from './accessible-text-virtual';
import { nodeLookup } from '../../core/utils';

/**
 * Finds virtual node and calls accessibleTextVirtual()
 * IMPORTANT: This method requires the composed tree at axe._tree
 *
 * @param {HTMLElement} element The HTMLElement
 * @param {Object} context
 * @property {Bool} inControlContext
 * @property {Bool} inLabelledByContext
 * @return {string}
 */
function accessibleText(element, context) {
  const { vNode } = nodeLookup(element);
  return accessibleTextVirtual(vNode, context);
}

export default accessibleText;

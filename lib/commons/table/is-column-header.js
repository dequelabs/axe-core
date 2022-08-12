import getScope from './get-scope';
import AbstractVirtualNode from '../../core/base/virtual-node/abstract-virtual-node';
import { getNodeFromTree } from '../../core/utils';

/**
 * Determine if a `HTMLTableCellElement` is a column header
 * @method isColumnHeader
 * @memberof axe.commons.table
 * @instance
 * @param  {HTMLTableCellElement} element The table cell to test
 * @return {Boolean}
 */
function isColumnHeader(element) {
  if (!(element instanceof AbstractVirtualNode)) {
    element = getNodeFromTree(element);
  }
  return ['col', 'auto'].indexOf(getScope(element)) !== -1;
}

export default isColumnHeader;

import getScope from './get-scope';
import AbstractVirtualNode from '../../core/base/virtual-node/abstract-virtual-node';
import { getNodeFromTree } from '../../core/utils';

/**
 * Determine if a `HTMLTableCellElement` is a row header
 * @method isRowHeader
 * @memberof axe.commons.table
 * @instance
 * @param  {HTMLTableCellElement} cell The table cell to test
 * @return {Boolean}
 */
function isRowHeader(cell) {
  if (!(cell instanceof AbstractVirtualNode)) {
    cell = getNodeFromTree(cell);
  }
  return ['row', 'auto'].includes(getScope(cell));
}

export default isRowHeader;

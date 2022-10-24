import toGrid from './to-grid';
import getCellPosition from './get-cell-position';
import findUp from '../dom/find-up';
import { getNodeFromTree } from '../../core/utils';
import AbstractVirtualNode from '../../core/base/virtual-node/abstract-virtual-node';

/**
 * Determine if a `HTMLTableCellElement` is a column header, if so get the scope of the header
 * @method getScope
 * @memberof axe.commons.table
 * @instance
 * @param {HTMLTableCellElement|AbstractVirtualNode} cell The table cell to test
 * @return {Boolean|String} Returns `false` if not a column header, or the scope of the column header element
 */
function getScope(cell) {
  const vNode =
    cell instanceof AbstractVirtualNode ? cell : getNodeFromTree(cell);

  cell = vNode.actualNode;

  const scope = vNode.attr('scope');
  const role = vNode.attr('role');

  if (!['td', 'th'].includes(vNode.props.nodeName)) {
    throw new TypeError('Expected TD or TH element');
  }

  if (role === 'columnheader') {
    return 'col';
  } else if (role === 'rowheader') {
    return 'row';
  } else if (scope === 'col' || scope === 'row') {
    return scope;
  } else if (vNode.props.nodeName !== 'th') {
    return false;
  } else if (!vNode.actualNode) {
    return 'auto';
  }
  var tableGrid = toGrid(findUp(cell, 'table'));
  var pos = getCellPosition(cell, tableGrid);

  // The element is in a row with all th elements, that makes it a column header
  var headerRow = tableGrid[pos.y].reduce((headerRow, cell) => {
    return headerRow && cell.nodeName.toUpperCase() === 'TH';
  }, true);

  if (headerRow) {
    return 'col';
  }

  // The element is in a column with all th elements, that makes it a row header
  var headerCol = tableGrid
    .map(col => col[pos.x])
    .reduce((headerCol, cell) => {
      return headerCol && cell && cell.nodeName.toUpperCase() === 'TH';
    }, true);

  if (headerCol) {
    return 'row';
  }
  return 'auto';
}

export default getScope;

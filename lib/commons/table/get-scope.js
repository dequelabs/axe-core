import toGrid from './to-grid';
import getCellPosition from './get-cell-position';
import { closest } from '../../core/utils';
import AbstractVirtualNode from '../../core/base/virtual-node/abstract-virtual-node';
import { getNodeFromTree } from '../../core/utils';

/**
 * Determine if a `HTMLTableCellElement` is a column header, if so get the scope of the header
 * @method getScope
 * @memberof axe.commons.table
 * @instance
 * @param {HTMLTableCellElement} cell The table cell to test
 * @return {Boolean|String} Returns `false` if not a column header, or the scope of the column header element
 */
function getScope(cell) {
  if (!(cell instanceof AbstractVirtualNode)) {
    cell = getNodeFromTree(cell);
  }
  var scope = cell.attr('scope');
  var role = cell.attr('role');

  if (['TD', 'TH'].indexOf(cell.props.nodeName.toUpperCase()) === -1) {
    throw new TypeError('Expected TD or TH element');
  }

  if (role === 'columnheader') {
    return 'col';
  } else if (role === 'rowheader') {
    return 'row';
  } else if (scope === 'col' || scope === 'row') {
    return scope;
  } else if (cell.props.nodeName.toUpperCase() !== 'TH') {
    return false;
  } else if (cell.actualNode === undefined) {
    return 'auto';
  }

  var tableGrid = toGrid(closest(cell, 'table'));
  var pos = getCellPosition(cell, tableGrid);

  // The element is in a row with all th elements, that makes it a column header
  var headerRow = tableGrid[pos.y].reduce((headerRow, cell) => {
    return headerRow && cell.props.nodeName.toUpperCase() === 'TH';
  }, true);

  if (headerRow) {
    return 'col';
  }

  // The element is in a column with all th elements, that makes it a row header
  var headerCol = tableGrid
    .map(col => col[pos.x])
    .reduce((headerCol, cell) => {
      return headerCol && cell && cell.props.nodeName.toUpperCase() === 'TH';
    }, true);

  if (headerCol) {
    return 'row';
  }
  return 'auto';
}

export default getScope;

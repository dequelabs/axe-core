import toGrid from './to-grid';
import getCellPosition from './get-cell-position';
import findUp from '../dom/find-up';
import { nodeLookup } from '../../core/utils';

/**
 * Determine if a `HTMLTableCellElement` is a column header, if so get the scope of the header
 * @method getScope
 * @memberof axe.commons.table
 * @instance
 * @param {HTMLTableCellElement|AbstractVirtualNode} cell The table cell to test
 * @return {Boolean|String} Returns `false` if not a column header, or the scope of the column header element
 */
export default function getScope(el) {
  const { vNode, domNode: cell } = nodeLookup(el);

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
  const tableGrid = toGrid(findUp(cell, 'table'));
  const pos = getCellPosition(cell, tableGrid);

  // The element is in a row with all th elements, that makes it a column header
  const headerRow = tableGrid[pos.y].every(
    node => node.nodeName.toUpperCase() === 'TH'
  );

  if (headerRow) {
    return 'col';
  }

  // The element is in a column with all th elements, that makes it a row header
  const headerCol = tableGrid
    .map(col => col[pos.x])
    .every(node => node && node.nodeName.toUpperCase() === 'TH');

  if (headerCol) {
    return 'row';
  }
  return 'auto';
}

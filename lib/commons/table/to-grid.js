import AbstractVirtualNode from '../../core/base/virtual-node/abstract-virtual-node';
import getNodeFromTree from '../../core/utils/get-node-from-tree';
import { memoize, matches } from '../../core/utils';

export default memoize(toGrid);

/**
 * Converts a table to an Array of arrays, normalized for row and column spans
 * @method toGrid
 * @memberof axe.commons.table
 * @instance
 * @param  {HTMLTableElement} node The table to convert
 * @return {Array<HTMLTableCellElement>} Array of HTMLTableCellElements
 */
function toGrid(node) {
  const vNode =
    node instanceof AbstractVirtualNode ? node : getNodeFromTree(node);

  var table = [];
  //TODO: this will need to be converted to a recursive lookup
  // to handle the case of table > tbody > tr
  var rows = vNode.children.filter(child => matches(child, 'tr'));

  for (var i = 0, rowLength = rows.length; i < rowLength; i++) {
    var cells = rows[i].children.filter(child => matches(child, 'td'));

    table[i] = table[i] || [];

    var columnIndex = 0;

    for (var j = 0, cellLength = cells.length; j < cellLength; j++) {
      for (var colSpan = 0; colSpan < cells[j].colSpan; colSpan++) {
        // if [the rowSpan] value is set to 0, it extends until the
        // end of the table section
        // @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td#attr-rowspan

        // ie11 returns 1 as the rowspan value even if it's set to 0
        const rowspanAttr = cells[j].getAttribute('rowspan');
        const rowspanValue =
          parseInt(rowspanAttr) === 0 || cells[j].rowspan === 0
            ? rows.length
            : cells[j].rowSpan;

        for (var rowSpan = 0; rowSpan < rowspanValue; rowSpan++) {
          table[i + rowSpan] = table[i + rowSpan] || [];
          while (table[i + rowSpan][columnIndex]) {
            columnIndex++;
          }
          table[i + rowSpan][columnIndex] = cells[j];
        }
        columnIndex++;
      }
    }
  }

  return table;
}

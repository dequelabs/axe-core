import { tokenList } from '../../core/utils';
import { isVisibleToScreenReaders } from '../../commons/dom';
import { getRole } from '../../commons/aria';

// Order determines the priority of reporting
// Only if 0 of higher issues exists will the next be reported
const messageKeys = [
  'cell-header-not-in-table',
  'cell-header-not-th',
  'header-refs-self',
  'empty-hdrs' // incomplete
];
const [notInTable, notTh, selfRef, emptyHdrs] = messageKeys;

export default function tdHeadersAttrEvaluate(node) {
  const cells = [];
  const cellRoleById = {};
  for (let rowIndex = 0; rowIndex < node.rows.length; rowIndex++) {
    const row = node.rows[rowIndex];

    for (let cellIndex = 0; cellIndex < row.cells.length; cellIndex++) {
      const cell = row.cells[cellIndex];
      cells.push(cell);

      // Save header id to set if it's th or td with roles columnheader/rowheader
      const cellId = cell.getAttribute('id');
      if (cellId) {
        cellRoleById[cellId] = getRole(cell);
      }
    }
  }

  const badCells = {
    [selfRef]: new Set(),
    [notInTable]: new Set(),
    [notTh]: new Set(),
    [emptyHdrs]: new Set()
  };
  cells.forEach(cell => {
    if (!cell.hasAttribute('headers') || !isVisibleToScreenReaders(cell)) {
      return;
    }
    const headersAttr = cell.getAttribute('headers').trim();
    if (!headersAttr) {
      badCells[emptyHdrs].add(cell);
      return;
    }

    const cellId = cell.getAttribute('id');
    // Get a list all the values of the headers attribute
    const headers = tokenList(headersAttr);
    headers.forEach(headerId => {
      if (cellId && headerId === cellId) {
        // Header references its own cell
        badCells[selfRef].add(cell);
      } else if (!cellRoleById[headerId]) {
        // Header references a cell that is not in the table
        badCells[notInTable].add(cell);
      } else if (
        !['columnheader', 'rowheader'].includes(cellRoleById[headerId])
      ) {
        // Header references a cell that is not a row or column header
        badCells[notTh].add(cell);
      }
    });
  });

  for (const messageKey of messageKeys) {
    if (badCells[messageKey].size > 0) {
      this.relatedNodes([...badCells[messageKey]]);
      if (messageKey === emptyHdrs) {
        return undefined;
      }
      this.data({ messageKey });
      return false;
    }
  }
  return true;
}

import { tokenList } from '../../core/utils';
import { isVisibleToScreenReaders } from '../../commons/dom';

export default function tdHeadersAttrEvaluate(node) {
  const cells = [];
  const badCells = [];
  const reviewCells = [];
  const tableHeaders = new Set();

  for (let rowIndex = 0; rowIndex < node.rows.length; rowIndex++) {
    const row = node.rows[rowIndex];

    for (let cellIndex = 0; cellIndex < row.cells.length; cellIndex++) {
      const cell = row.cells[cellIndex];
      cells.push(cell);

      // Save header id to set if it's th or td with roles columnheader/rowheader
      const cellId = cell.getAttribute('id');
      const role = cell.getAttribute('role');
      if (
        cellId &&
        (cell.nodeName.toLowerCase() === 'th' ||
          role === 'columnheader' ||
          role === 'rowheader')
      ) {
        tableHeaders.add(cellId);
      }
    }
  }

  cells.forEach(cell => {
    if (!cell.hasAttribute('headers') || !isVisibleToScreenReaders(cell)) {
      return;
    }

    const headersAttr = cell.getAttribute('headers').trim();
    if (!headersAttr) {
      return reviewCells.push(cell);
    }

    // Get a list all the values of the headers attribute
    const headers = tokenList(headersAttr);
    const cellId = cell.getAttribute('id');

    // Check: self reference and check that headers reference an existing header
    const isSelf = cellId && headers.includes(cellId);
    const notOfTable = headers.some(header => !tableHeaders.has(header));

    if (isSelf || notOfTable) {
      badCells.push(cell);
    }
  });

  if (badCells.length > 0) {
    const tdInTable = badCells.some(cell => {
      const headers = tokenList(cell.getAttribute('headers'));
      return headers.some(header => {
        const referencedCell = cells.find(c => c.getAttribute('id') === header);
        return (
          referencedCell &&
          referencedCell.nodeName.toLowerCase() === 'td' &&
          !referencedCell.getAttribute('role')
        );
      });
    });

    const messageKey = tdInTable
      ? 'header-is-data-cell'
      : 'header-not-in-table';
    this.relatedNodes(badCells);
    this.data({ messageKey });
    return false;
  }

  if (reviewCells.length) {
    this.relatedNodes(reviewCells);
    return undefined;
  }

  return true;
}

import { tokenList } from '../../core/utils';
import { isVisibleToScreenReaders } from '../../commons/dom';

export default function tdHeadersAttrEvaluate(node) {
  const cells = [];
  const reviewCells = [];
  const badCells = [];

  for (let rowIndex = 0; rowIndex < node.rows.length; rowIndex++) {
    const row = node.rows[rowIndex];

    for (let cellIndex = 0; cellIndex < row.cells.length; cellIndex++) {
      cells.push(row.cells[cellIndex]);
    }
  }

  // Collect table headers
  // Get a list all the values of the headers attributes
  // Find header cells inside the table
  // Filter td elements and map to ids
  const tableHeaders = cells
    .filter(cell => cell.getAttribute('headers'))
    .flatMap(cell => tokenList(cell.getAttribute('headers').trim()))
    .map(headerId => cells.find(cell => cell.getAttribute('id') === headerId))
    .filter(headerCell => headerCell)
    .filter(headerCell => headerCell.nodeName.toLowerCase() !== 'td')
    .map(headerCell => headerCell.getAttribute('id'));

  cells.forEach(cell => {
    let isSelf = false;
    let notOfTable = false;

    if (!cell.hasAttribute('headers') || !isVisibleToScreenReaders(cell)) {
      return;
    }

    const headersAttr = cell.getAttribute('headers').trim();
    if (!headersAttr) {
      return reviewCells.push(cell);
    }

    // Get a list all the values of the headers attribute
    const headers = tokenList(headersAttr);

    if (headers.length !== 0) {
      // Check if the cell's id is in this list
      if (cell.getAttribute('id')) {
        isSelf = headers.indexOf(cell.getAttribute('id').trim()) !== -1;
      }

      // Check if the headers are of headers inside the table
      notOfTable = headers.some(header => !tableHeaders.includes(header));

      if (isSelf || notOfTable) {
        badCells.push(cell);
      }
    }
  });

  if (badCells.length > 0) {
    this.relatedNodes(badCells);
    return false;
  }

  if (reviewCells.length) {
    this.relatedNodes(reviewCells);
    return undefined;
  }

  return true;
}

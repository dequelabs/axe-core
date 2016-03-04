/*global table, dom */

/**
 * Determine if a `HTMLTableCellElement` is a row header
 * @param  {HTMLTableCellElement}  node The table cell to test
 * @return {Boolean}
 */
table.isRowHeader = function (node) {

	var scope = node.getAttribute('scope');
	if (node.getAttribute('role') === 'rowheader' || scope === 'row') {
		return true;
	} else if (scope || node.nodeName.toUpperCase() !== 'TH') {
		return false;
	}

	if (table.isColumnHeader(node)) {
		return false;
	}

	var currentCell,
		position = table.getCellPosition(node),
		tbl = table.toArray(dom.findUp(node, 'table'));

	for (var rowIndex = 0, rowLength = tbl.length; rowIndex < rowLength; rowIndex++) {
		currentCell = tbl[rowIndex][position.x];
		if (currentCell !== node) {
			if (table.isDataCell(currentCell)) {
				return false;
			}
		}
	}

	return true;

};
/*global table, dom */

/**
 * Determine if a `HTMLTableCellElement` is a column header
 * @param  {HTMLTableCellElement}  node The table cell to test
 * @return {Boolean}
 */
table.isColumnHeader = function (node) {

	var scope = node.getAttribute('scope');
	if (node.getAttribute('role') === 'columnheader' || scope === 'col') {
		return true;
	} else if (scope || node.nodeName.toUpperCase() !== 'TH') {
		return false;
	}

	var currentCell,
		position = table.getCellPosition(node),
		tbl = table.toArray(dom.findUp(node, 'table')),
		cells = tbl[position.y];

	for (var cellIndex = 0, cellLength = cells.length; cellIndex < cellLength; cellIndex++) {
		currentCell = cells[cellIndex];
		if (currentCell !== node) {
			if (table.isDataCell(currentCell)) {
				return false;
			}
		}
	}

	return true;

};
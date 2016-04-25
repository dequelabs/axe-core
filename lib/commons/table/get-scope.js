/*global table, dom */

/**
 * Determine if a `HTMLTableCellElement` is a column header
 * @param  {HTMLTableCellElement}  node The table cell to test
 * @return {Boolean}
 */
table.getScope = function (cell) {
	var scope = cell.getAttribute('scope');
	var role = cell.getAttribute('role');

	if (cell instanceof Element === false ||
		['TD', 'TH'].indexOf(cell.nodeName.toUpperCase()) === -1
	) {
		throw new TypeError('Expected TD or TH element');
	}

	if (role === 'columnheader') {
		return 'col';

	} else if (role === 'rowheader') {
		return 'row';

	} else if (scope === 'col' || scope === 'row') {
		return scope;

	} else if (cell.nodeName.toUpperCase() !== 'TH') {
		return false;
	}
	var tableGrid = table.toGrid(dom.findUp(cell, 'table'));
	var pos = table.getCellPosition(cell);

	// The element is in a row with all th elements, that makes it a column header
	var headerRow = tableGrid[pos.y].reduce((headerRow, cell) => {
		return headerRow && cell.nodeName.toUpperCase() === 'TH';
	}, true);

	if (headerRow) {
		return 'col';
	}

	// The element is in a column with all th elements, that makes it a row header
	var headerCol = tableGrid.map((col) => col[pos.x])
	.reduce((headerCol, cell) => {
		return headerCol && cell.nodeName.toUpperCase() === 'TH';
	}, true);

	if (headerCol) {
		return 'row';
	}
	return 'auto';
};
/*global table */

/**
 * Get any associated table headers for a `HTMLTableCellElement`
 * @param  {HTMLTableCellElement} cell The cell of which to get headers
 * @return {Array}      Array of headers associated to the table cell
 */
table.getHeaders = function (cell) {

	if (cell.hasAttribute('headers')) {
		return commons.dom.idrefs(cell, 'headers');
	}

	var tableGrid = commons.table.toGrid(commons.dom.findUp(cell, 'table'));
	var position = commons.table.getCellPosition(cell, tableGrid);

	// TODO: RTL text
	var rowHeaders = table
	.traverse('left', position, tableGrid)
	.filter((cell) => table.isRowHeader(cell));

	var colHeaders = table
	.traverse('up', position, tableGrid)
	.filter((cell) => table.isColumnHeader(cell));

	return [].concat(rowHeaders, colHeaders).reverse();
};
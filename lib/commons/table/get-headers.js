/* global table */

/**
 * Get any associated table headers for a `HTMLTableCellElement`
 * @method getHeaders
 * @memberof axe.commons.table
 * @instance
 * @param  {HTMLTableCellElement} cell The cell of which to get headers
 * @return {Array<HTMLTableCellElement>} Array of headers associated to the table cell
 */
table.getHeaders = function(cell) {
	if (cell.hasAttribute('headers')) {
		return commons.dom.idrefs(cell, 'headers');
	}

	const tableGrid = commons.table.toGrid(commons.dom.findUp(cell, 'table'));
	const position = commons.table.getCellPosition(cell, tableGrid);

	// TODO: RTL text
	const rowHeaders = table
		.traverse('left', position, tableGrid)
		.filter(cell => table.isRowHeader(cell));

	const colHeaders = table
		.traverse('up', position, tableGrid)
		.filter(cell => table.isColumnHeader(cell));

	return [].concat(rowHeaders, colHeaders).reverse();
};

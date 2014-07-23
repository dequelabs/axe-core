/*global table, utils */

/**
 * Determine if a `HTMLTableCellElement` is a header
 * @param  {HTMLTableCellElement}  node The table cell to test
 * @return {Boolean}
 */
table.isHeader = function (cell) {
	if (table.isColumnHeader(cell) || table.isRowHeader(cell)) {
		return true;
	}

	if (cell.id) {
		return !!cell.ownerDocument.querySelector('[headers~="' + utils.escapeSelector(cell.id) + '"]');
	}

	return false;
};
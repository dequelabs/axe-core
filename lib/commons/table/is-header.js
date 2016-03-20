/*global table, axe */

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
		return !!document.querySelector('[headers~="' + axe.utils.escapeSelector(cell.id) + '"]');
	}

	return false;
};

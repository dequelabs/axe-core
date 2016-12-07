/*global table */

/**
 * Determine if a `HTMLTableCellElement` is a column header
 * @param  {HTMLTableCellElement}  node The table cell to test
 * @return {Boolean}
 */
table.isColumnHeader = function (node) {
	return (['col', 'auto'].indexOf(table.getScope(node)) !== -1);
};
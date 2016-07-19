/*global table */

/**
 * Determine if a `HTMLTableCellElement` is a row header
 * @param  {HTMLTableCellElement}  node The table cell to test
 * @return {Boolean}
 */
table.isRowHeader = function (node) {
	return (['row', 'auto'].indexOf(table.getScope(node)) !== -1);
};
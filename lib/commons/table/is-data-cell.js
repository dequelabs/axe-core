/*global table */

/**
 * Determine if a `HTMLTableCellElement` is a data cell
 * @param  {HTMLTableCellElement}  node The table cell to test
 * @return {Boolean}
 */
table.isDataCell = function (cell) {
	// @see http://www.whatwg.org/specs/web-apps/current-work/multipage/tables.html#empty-cell
	if (!cell.children.length && !cell.textContent.trim()) {
		return false;
	}
	return cell.nodeName.toUpperCase() === 'TD';
};
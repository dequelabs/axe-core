import toGrid from './to-grid.js';
import getCellPosition from './get-cell-position.js';
import isRowHeader from './is-row-header.js';
import isColumnHeader from './is-column-header.js';
import idrefs from '../dom/idrefs.js';
import { findUp } from '../dom/find-up-virtual.js';

/**
 * Get any associated table headers for a `HTMLTableCellElement`
 * @method getHeaders
 * @memberof axe.commons.table
 * @instance
 * @param  {HTMLTableCellElement} cell The cell of which to get headers
 * @return {Array<HTMLTableCellElement>} Array of headers associated to the table cell
 */
function getHeaders(cell) {
	if (cell.hasAttribute('headers')) {
		return idrefs(cell, 'headers');
	}

	var tableGrid = toGrid(findUp(cell, 'table'));
	var position = getCellPosition(cell, tableGrid);

	// TODO: RTL text
	var rowHeaders = table
		.traverse('left', position, tableGrid)
		.filter(cell => isRowHeader(cell));

	var colHeaders = table
		.traverse('up', position, tableGrid)
		.filter(cell => isColumnHeader(cell));

	return [].concat(rowHeaders, colHeaders).reverse();
}

export default getHeaders;

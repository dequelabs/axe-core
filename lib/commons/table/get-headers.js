import toGrid from './to-grid.js';
import getCellPosition from './get-cell-position.js';
import isRowHeader from './is-row-header.js';
import isColumnHeader from './is-column-header.js';
import idrefs from '../dom/idrefs.js';
import { findUp } from '../dom/find-up-virtual.js';
import { getNodeFromTree } from '../../core/utils/index.js';

/**
 * Loop through the table grid looking for headers and caching the result.
 * @param {String} headerType The type of header to look for ("row" or "col")
 * @param {Object} position The position of the cell to start looking
 * @param {Array} tablegrid A matrix of the table obtained using axe.commons.table.toGrid
 * @return {Array<HTMLTableCellElement>} Array of HTMLTableCellElements that are headers
 */
function traverseForHeaders(headerType, position, tableGrid) {
	const property = headerType === 'row' ? '_rowHeaders' : '_colHeaders';
	const predicate = headerType === 'row' ? isRowHeader : isColumnHeader;
	const rowEnd = headerType === 'row' ? position.y : 0;
	const colEnd = headerType === 'row' ? 0 : position.x;

	let headers;
	const cells = [];
	for (let row = position.y; row >= rowEnd && !headers; row--) {
		for (let col = position.x; col >= colEnd; col--) {
			const cell = tableGrid[row] ? tableGrid[row][col] : undefined;

			if (!cell) {
				continue;
			}

			// stop traversing once we've found a cache
			const vNode = getNodeFromTree(cell);
			if (vNode[property]) {
				headers = vNode[property];
				break;
			}

			cells.push(cell);
		}
	}

	// need to check that the cells we've traversed are headers
	headers = (headers || []).concat(cells.filter(predicate));

	// cache results
	cells.forEach(tableCell => {
		const vNode = getNodeFromTree(tableCell);
		vNode[property] = headers;
	});

	return headers;
}

/**
 * Get any associated table headers for a `HTMLTableCellElement`
 * @method getHeaders
 * @memberof axe.commons.table
 * @instance
 * @param  {HTMLTableCellElement} cell The cell of which to get headers
 * @param {Array} [tablegrid] A matrix of the table obtained using axe.commons.table.toGrid
 * @return {Array<HTMLTableCellElement>} Array of headers associated to the table cell
 */
function getHeaders(cell, tableGrid) {
	if (cell.hasAttribute('headers')) {
		return idrefs(cell, 'headers');
	}
	if (!tableGrid) {
		tableGrid = toGrid(findUp(cell, 'table'));
	}
	const position = getCellPosition(cell, tableGrid);

	// TODO: RTL text
	const rowHeaders = traverseForHeaders('row', position, tableGrid);
	const colHeaders = traverseForHeaders('col', position, tableGrid);

	return [].concat(rowHeaders, colHeaders).reverse();
}

export default getHeaders;

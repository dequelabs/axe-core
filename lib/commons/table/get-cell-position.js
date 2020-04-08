/* global dom */
import toGrid from './to-grid';

/**
 * Get the x, y coordinates of a table cell; normalized for rowspan and colspan
 * @method getCellPosition
 * @memberof axe.commons.table
 * @instance
 * @param  {HTMLTableCellElement} cell The table cell of which to get the position
 * @return {Object} Object with `x` and `y` properties of the coordinates
 */
function getCellPosition(cell, tableGrid) {
	var rowIndex, index;
	if (!tableGrid) {
		// TODO: es-module-dom.findUp
		tableGrid = toGrid(dom.findUp(cell, 'table'));
	}

	for (rowIndex = 0; rowIndex < tableGrid.length; rowIndex++) {
		if (tableGrid[rowIndex]) {
			index = tableGrid[rowIndex].indexOf(cell);
			if (index !== -1) {
				return {
					x: index,
					y: rowIndex
				};
			}
		}
	}
}

// TODO: es-module-utils.memoize
export default axe.utils.memoize(getCellPosition);

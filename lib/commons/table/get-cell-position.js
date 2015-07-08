/*global table, dom */

/**
 * Get the x, y coordinates of a table cell; normalized for rowspan and colspan
 * @param  {HTMLTableCelLElement} cell The table cell of which to get the position
 * @return {Object}      Object with `x` and `y` properties of the coordinates
 */
table.getCellPosition = function (cell) {

	var tbl = table.toArray(dom.findUp(cell, 'table')),
		index;

	for (var rowIndex = 0; rowIndex < tbl.length; rowIndex++) {
		if (tbl[rowIndex]) {
			index = tbl[rowIndex].indexOf(cell);
			if (index !== -1) {
				return {
					x: index,
					y: rowIndex
				};
			}
		}
	}

};
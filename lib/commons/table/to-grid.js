/*global table */

/**
 * Converts a table to an Array of arrays, normalized for row and column spans
 * @method toGrid
 * @memberof axe.commons.table
 * @instance
 * @param  {HTMLTableElement} node The table to convert
 * @return {Array<HTMLTableCellElement>} Array of HTMLTableCellElements
 */
table.toGrid = function(node) {
	const table = [];
	const rows = node.rows;
	for (let i = 0, rowLength = rows.length; i < rowLength; i++) {
		const cells = rows[i].cells;
		table[i] = table[i] || [];

		let columnIndex = 0;

		for (let j = 0, cellLength = cells.length; j < cellLength; j++) {
			for (let colSpan = 0; colSpan < cells[j].colSpan; colSpan++) {
				for (let rowSpan = 0; rowSpan < cells[j].rowSpan; rowSpan++) {
					table[i + rowSpan] = table[i + rowSpan] || [];
					while (table[i + rowSpan][columnIndex]) {
						columnIndex++;
					}
					table[i + rowSpan][columnIndex] = cells[j];
				}
				columnIndex++;
			}
		}
	}

	return table;
};

// This was the old name
table.toArray = table.toGrid;

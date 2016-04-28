/*global table */

/**
 * Converts a table to an Array of arrays, normalized for row and column spans
 * @param  {HTMLTableElement} node The table to convert
 * @return {Array}      Array of rows and cells
 */
table.toGrid = function (node) {
	var table = [];
	var rows = node.rows;
	for (var i = 0, rowLength = rows.length; i < rowLength; i++) {
		var cells = rows[i].cells;
		table[i] = table[i] || [];

		var columnIndex = 0;

		for (var j = 0, cellLength = cells.length; j < cellLength; j++) {
			for (var colSpan = 0; colSpan < cells[j].colSpan; colSpan++) {
				for (var rowSpan = 0; rowSpan < cells[j].rowSpan; rowSpan++) {
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
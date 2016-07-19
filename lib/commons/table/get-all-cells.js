/* global table */
table.getAllCells = function (tableElm) {
	var rowIndex, cellIndex, rowLength, cellLength;
	var cells = [];
	for (rowIndex = 0, rowLength = tableElm.rows.length; rowIndex < rowLength; rowIndex++) {
		for (cellIndex = 0, cellLength = tableElm.rows[rowIndex].cells.length; cellIndex < cellLength; cellIndex++) {
			cells.push(tableElm.rows[rowIndex].cells[cellIndex]);
		}
	}
	return cells;
};
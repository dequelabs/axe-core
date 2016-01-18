
var row, cell, position,
	rowHeaders = [],
	columnHeaders = [];

for (var rowIndex = 0, rowLength = node.rows.length; rowIndex < rowLength; rowIndex++) {
	row = node.rows[rowIndex];
	for (var cellIndex = 0, cellLength = row.cells.length; cellIndex < cellLength; cellIndex++) {
		cell = row.cells[cellIndex];
		if (cell.nodeType === 1) {
			if (commons.table.isColumnHeader(cell) && columnHeaders.indexOf(rowIndex) === -1) {
				columnHeaders.push(rowIndex);
			} else if (commons.table.isRowHeader(cell)) {
				position = commons.table.getCellPosition(cell);
				if (rowHeaders.indexOf(position.x) === -1) {
					rowHeaders.push(position.x);
				}
			}
		}
	}
}

if (columnHeaders.length > 1 || rowHeaders.length > 1) {
	return true;
}

return false;


var row, cell,
	badCells = [];

for (var rowIndex = 0, rowLength = node.rows.length; rowIndex < rowLength; rowIndex++) {
	row = node.rows[rowIndex];
	for (var cellIndex = 0, cellLength = row.cells.length; cellIndex < cellLength; cellIndex++) {
		cell = row.cells[cellIndex];
		if (axe.commons.table.isDataCell(cell) &&
			(!axe.commons.aria.label(cell) &&
				!axe.commons.table.getHeaders(cell).length)) {
			badCells.push(cell);
		}
	}
}

if (badCells.length) {
	this.relatedNodes(badCells);
	return true;
}

return false;

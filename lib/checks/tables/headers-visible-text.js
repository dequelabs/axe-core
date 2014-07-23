
var row, cell,
	badHeaders = [];
for (var rowIndex = 0, rowLength = node.rows.length; rowIndex < rowLength; rowIndex++) {
	row = node.rows[rowIndex];
	for (var cellIndex = 0, cellLength = row.cells.length; cellIndex < cellLength; cellIndex++) {
		cell = row.cells[cellIndex];
		if (kslib.table.isHeader(cell) && !kslib.text.visible(cell, true)) {
			badHeaders.push(cell);
		}
	}
}

if (badHeaders.length) {
	this.relatedNodes(badHeaders);
	return true;
}

return false;
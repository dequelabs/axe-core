
var row, cell,
	headersTH = [];
for (var rowIndex = 0, rowLength = node.rows.length; rowIndex < rowLength; rowIndex++) {
	row = node.rows[rowIndex];
	for (var cellIndex = 0, cellLength = row.cells.length; cellIndex < cellLength; cellIndex++) {
		cell = row.cells[cellIndex];
		if (cell.nodeName.toUpperCase() === 'TH' && cell.getAttribute('headers')) {
			headersTH.push(cell);
		}
	}
}

if (headersTH.length) {
	this.relatedNodes(headersTH);
	return true;
}

return false;
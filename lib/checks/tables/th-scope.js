
var row, cell,
	noScopeTH = [];
for (var rowIndex = 0, rowLength = node.rows.length; rowIndex < rowLength; rowIndex++) {
	row = node.rows[rowIndex];
	for (var cellIndex = 0, cellLength = row.cells.length; cellIndex < cellLength; cellIndex++) {
		cell = row.cells[cellIndex];
		if (cell.nodeName.toUpperCase() === 'TH' && !cell.getAttribute('scope')) {
			noScopeTH.push(cell);
		}
	}
}

if (noScopeTH.length) {
	this.relatedNodes(noScopeTH);
	return true;
}

return false;
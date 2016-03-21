var row, cell, headerCells,
	badHeaders = [];

function checkHeader(header) {
	if (!header || !axe.commons.text.accessibleText(header)) {
		badHeaders.push(cell);
	}
}

for (var rowIndex = 0, rowLength = node.rows.length; rowIndex < rowLength; rowIndex++) {
	row = node.rows[rowIndex];
	for (var cellIndex = 0, cellLength = row.cells.length; cellIndex < cellLength; cellIndex++) {
		cell = row.cells[cellIndex];
		headerCells = axe.commons.dom.idrefs(cell, 'headers');
		if (headerCells.length) {
			headerCells.forEach(checkHeader);
		}
	}
}

if (badHeaders.length) {
	this.relatedNodes(badHeaders);
	return true;
}

return false;

var row, cell,
	badCells = [];

for (var rowIndex = 0, rowLength = node.rows.length; rowIndex < rowLength; rowIndex++) {
	row = node.rows[rowIndex];
	for (var cellIndex = 0, cellLength = row.cells.length; cellIndex < cellLength; cellIndex++) {
		cell = row.cells[cellIndex];

		if (badCells.indexOf(cell) === -1 &&
			cell.textContent.trim() !== '' &&
			axe.commons.table.isDataCell(cell) &&
			!axe.commons.aria.label(cell)
		) {
			var hasHeaders = axe.commons.table.getHeaders(cell);
			hasHeaders = hasHeaders.reduce(function (hasHeaders, header) {
				return (hasHeaders || header !== null && !!header.textContent.trim());
			}, false);
			if (!hasHeaders) {
				badCells.push(cell);
			}
		}
	}
}

if (badCells.length) {
	this.relatedNodes(badCells);
	return false;
}

return true;

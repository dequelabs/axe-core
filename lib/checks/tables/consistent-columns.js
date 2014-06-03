var expectedWidth = 0,
	rows = node.rows;

for (var i = 0, rowLength = rows.length; i < rowLength; i++) {
	var cells = rows[i].cells;
	var currentWidth = 0;

	for (var j = 0, cellLength = cells.length; j < cellLength; j++) {
		if (i === 0) {
			expectedWidth += cells[j].colSpan;
		}
		currentWidth += cells[j].colSpan;
	}
	if (expectedWidth !== currentWidth) {
		return false;
	}
}

return true;
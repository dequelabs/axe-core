
function getTableArray(node) {
	var table = [];
	var rows = node.rows;
	for (var i = 0, rowLength = rows.length; i < rowLength; i++) {
		var cells = rows[i].cells;

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
}

var table = getTableArray(node);
var relatedNodes = [];
var expectedWidth;
for (var i = 0, length = table.length; i < length; i++) {
	if (i === 0) {
		expectedWidth = table[i].length;
	} else if (expectedWidth !== table[i].length) {
		relatedNodes.push(node.rows[i]);
	}
}

return !relatedNodes.length;

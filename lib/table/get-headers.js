/*global table */


table.getHeaders = function (cell) {

	if (cell.getAttribute('headers')) {
		return kslib.dom.idrefs(cell, 'headers');
	}

	var headers = [], currentCell,
		tbl = kslib.table.toArray(kslib.dom.findUp(cell, 'table')),
		position = kslib.table.getCellPosition(cell);


	for (var x = position.x - 1; x >= 0; x--) {
		currentCell = tbl[position.y][x];

		if (kslib.table.isRowHeader(currentCell)) {
			headers.unshift(currentCell);
		}
	}

	for (var y = position.y - 1; y >= 0; y--) {
		currentCell = tbl[y][position.x];

		if (kslib.table.isColumnHeader(currentCell)) {
			headers.unshift(currentCell);
		}
	}

	return headers;

};
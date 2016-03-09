var cells = [];

for (var rowIndex = 0, rowLength = node.rows.length; rowIndex < rowLength; rowIndex++) {
	var row = node.rows[rowIndex];
	for (var cellIndex = 0, cellLength = row.cells.length; cellIndex < cellLength; cellIndex++) {
		cells.push(row.cells[cellIndex]);
	}
}

var ids = cells.reduce(function (ids, cell) {
	if (cell.id) {
		ids.push(cell.id);
	}
	return ids;
}, []);

var badCells = cells.reduce(function (badCells, cell) {
	var isSelf, notOfTable;

	// Get a list all the values of the headers attribute
	var headers = (cell.getAttribute('headers') || '')
	.split(/\s/)
	.reduce(function (headers, header) {
		header = header.trim();
		if (header) {
			headers.push(header);
		}
		return headers;
	}, []);

	if (headers.length !== 0) {
		// Check if the cell's id is in this list
		if (cell.id) {
			isSelf = (headers.indexOf(cell.id.trim()) !== -1);
		}

		// Check if the headers are of cells inside the table
		notOfTable = headers.reduce(function (fail, header) {
			return fail || (ids.indexOf(header) === -1);
		}, false);

		if (isSelf || notOfTable) {
			badCells.push(cell);
		}
	}
	return badCells;
}, []);


if (badCells.length > 0) {
	this.relatedNodes(badCells);
	return false;

} else {
	return true;
}

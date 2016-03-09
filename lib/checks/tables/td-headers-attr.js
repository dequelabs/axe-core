return true;

// var cells = [];

// for (var rowIndex = 0, rowLength = node.rows.length; rowIndex < rowLength; rowIndex++) {
// 	var row = node.rows[rowIndex];
// 	for (var cellIndex = 0, cellLength = row.cells.length; cellIndex < cellLength; cellIndex++) {
// 		cells.push(row.cells[cellIndex]);
// 	}
// }

// var ids = cells.map(function (cell) {
// 	return cell.id;
// }).filter(function (result) {
// 	return result;
// });

// var badCells = cells.reduce(function (badCells, cell) {
// 	var isSelf, notOfTable;
// 	// Get a list all the values of the headers attribute
// 	var headers = (cell.getAttribute('headers') || '').split(/\s/);

// 	// Check if the cell's id is in this list
// 	if (cell.id) {
// 		isSelf = (headers.indexOf(cell.id.trim()) !== -1);
// 	}

// 	// Check if the headers are of cells inside the table
// 	notOfTable = headers.reduce(function (fail, header) {
// 		return fail || (ids.indexOf(header.trim()) === -1);
// 	}, false);

// 	if (isSelf || notOfTable) {
// 		badCells.push(cell);
// 	}
// 	return badCells;
// }, []);


// if (badCells.length > 0) {
// 	this.relatedNodes(badCells);
// 	return true;

// } else {
// 	return false;
// }

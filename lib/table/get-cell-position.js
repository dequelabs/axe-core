/*global table, dom */

table.getCellPosition = function (cell) {

	var tbl = table.toArray(dom.findUp(cell, 'table')),
		index;

	for (var rowIndex = 0; rowIndex < tbl.length; rowIndex++) {
		index = tbl[rowIndex].indexOf(cell);
		if (index !== -1) {
			return {
				x: index,
				y: rowIndex
			};
		}
	}

};
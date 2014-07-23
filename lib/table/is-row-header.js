/*global table, dom */
table.isRowHeader = function (node) {


	var scope = node.getAttribute('scope');
	if (scope === 'row') {
		return true;
	} else if (scope || node.nodeName !== 'TH') {
		return false;
	}

	if (table.isColumnHeader(node)) {
		return false;
	}

	var currentCell,
		position = table.getCellPosition(node),
		tbl = table.toArray(dom.findUp(node, 'table'));

	for (var rowIndex = 0, rowLength = tbl.length; rowIndex < rowLength; rowIndex++) {
		currentCell = tbl[rowIndex][position.x];
		if (currentCell !== node) {
			if (table.isDataCell(currentCell)) {
				return false;
			}
		}
	}

	return true;

};
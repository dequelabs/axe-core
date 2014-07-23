/*global table, dom */

table.isColumnHeader = function (node) {

	var scope = node.getAttribute('scope');
	if (scope === 'col') {
		return true;
	} else if (scope || node.nodeName !== 'TH') {
		return false;
	}

	var currentCell,
		position = table.getCellPosition(node),
		tbl = table.toArray(dom.findUp(node, 'table')),
		cells = tbl[position.y];

	for (var cellIndex = 0, cellLength = cells.length; cellIndex < cellLength; cellIndex++) {
		currentCell = cells[cellIndex];
		if (currentCell !== node) {
			if (table.isDataCell(currentCell)) {
				return false;
			}
		}
	}

	return true;

};
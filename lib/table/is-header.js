/*global table, utils */
table.isHeader = function (cell) {
	if (table.isColumnHeader(cell) || table.isRowHeader(cell)) {
		return true;
	}

	if (cell.id) {
		return !!cell.ownerDocument.querySelector('[headers~="' + utils.escapeSelector(cell.id) + '"]');
	}

	return false;
};
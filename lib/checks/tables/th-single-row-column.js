import {
	isColumnHeader,
	isRowHeader,
	getCellPosition
} from '../../commons/table';

function thSingleRowColumn(node) {
	var row,
		cell,
		position,
		rowHeaders = [],
		columnHeaders = [];

	for (
		var rowIndex = 0, rowLength = node.rows.length;
		rowIndex < rowLength;
		rowIndex++
	) {
		row = node.rows[rowIndex];
		for (
			var cellIndex = 0, cellLength = row.cells.length;
			cellIndex < cellLength;
			cellIndex++
		) {
			cell = row.cells[cellIndex];
			if (cell.nodeType === 1) {
				if (isColumnHeader(cell) && columnHeaders.indexOf(rowIndex) === -1) {
					columnHeaders.push(rowIndex);
				} else if (isRowHeader(cell)) {
					position = getCellPosition(cell);
					if (rowHeaders.indexOf(position.x) === -1) {
						rowHeaders.push(position.x);
					}
				}
			}
		}
	}

	if (columnHeaders.length > 1 || rowHeaders.length > 1) {
		return true;
	}

	return false;
}

export default thSingleRowColumn;

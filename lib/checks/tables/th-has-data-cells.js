var tableUtils = axe.commons.table;
var cells = tableUtils.getAllCells(node);
var checkResult = this;

/**
 * Traverses a table in a given direction, passing it to the callback
 * @param  {array}    table    A matrix of the table obtained using axe.commons.table.toArray
 * @param  {object}   start    x/y coordinate: {x: 0, y: 0};
 * @param  {object}   dir      Direction that will be added recursively {x: 1, y: 0};
 * @param  {Function} callback Function to which each cell will be passed
 * @return {nodeElemtn}        If the callback returns true, the traversal will end and the cell will be returned
 */
function traverseTable(table, dir, start, callback) {
	'use strict';
	if (typeof start === 'function') {
		callback = start;
		start = {x:0, y:0};
	}
	if (typeof dir === 'string') {
		switch (dir) {
			case 'left': dir = { x: -1, y: 0 };
				break;
			case 'up': dir = { x: 0, y: -1 };
				break;
			case 'right': dir = { x: 1, y: 0 };
				break;
			case 'down': dir = { x: 0, y: 1 };
				break;
		}
	}

	var cell = (table[start.y] ? table[start.y][start.x] : undefined);
	if (!cell) {
		return;
	}

	if (callback(cell) === true) {
		return cell;
	}

	return traverseTable(table, dir, {
		x: start.x + dir.x,
		y: start.y + dir.y
	}, callback);
}


// Get a list of all headers reffed to in this rule
var reffedHeaders = [];
cells.forEach(function (cell) {
	var headers = cell.getAttribute('headers');
	if (headers) {
		reffedHeaders = reffedHeaders.concat(headers.split(/\s+/));
	}

	var ariaLabel = cell.getAttribute('aria-labelledby');
	if (ariaLabel) {
		reffedHeaders = reffedHeaders.concat(ariaLabel.split(/\s+/));
	}
});

// Get all the headers
var headers = cells.filter(function (cell) {
	if (axe.commons.text.sanitize(cell.textContent) === '') {
		return false;
	}
	return (cell.nodeName.toUpperCase() === 'TH' ||
		['rowheader', 'columnheader'].indexOf(cell.getAttribute('role')) !== -1);
});


var tableMatrix;
// Look for all the bad headers
return headers.reduce(function (res, header) {
	if (header.id && reffedHeaders.indexOf(header.id) !== -1) {
		return (!res ? res : true);
	}

	var hasCell = false;
	var pos = axe.commons.table.getCellPosition(header);

	// Only get the matrix once we need it
	tableMatrix = (tableMatrix ? tableMatrix : axe.commons.table.toArray(node));

	// Look for any data cells or row headers that this might refer to
	if (axe.commons.table.isColumnHeader(header)) {
		pos.y += 1;
		hasCell = !!traverseTable(tableMatrix, 'down', pos, function (cell) {
			return (cell.textContent.trim() !== '' &&
					!axe.commons.table.isColumnHeader(cell));
		});

	// Look for any data cells or column headers that this might refer to
	} else if (axe.commons.table.isRowHeader(header)) {
		pos.x += 1;
		hasCell = !!traverseTable(tableMatrix, 'right', pos, function (cell) {
			return (cell.textContent.trim() !== '' &&
					!axe.commons.table.isRowHeader(cell));
		});
	}

	// report the node as having failed
	if (!hasCell) {
		checkResult.relatedNodes(header);
	}
	return (!res ? res : hasCell);

}, true);


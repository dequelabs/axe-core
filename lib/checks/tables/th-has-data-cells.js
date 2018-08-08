const tableUtils = axe.commons.table;
const cells = tableUtils.getAllCells(node);
const checkResult = this;

// Get a list of all headers reffed to in this rule
let reffedHeaders = [];
cells.forEach(function(cell) {
	const headers = cell.getAttribute('headers');
	if (headers) {
		reffedHeaders = reffedHeaders.concat(headers.split(/\s+/));
	}

	const ariaLabel = cell.getAttribute('aria-labelledby');
	if (ariaLabel) {
		reffedHeaders = reffedHeaders.concat(ariaLabel.split(/\s+/));
	}
});

// Get all the headers
const headers = cells.filter(function(cell) {
	if (axe.commons.text.sanitize(cell.textContent) === '') {
		return false;
	}
	return (
		cell.nodeName.toUpperCase() === 'TH' ||
		['rowheader', 'columnheader'].indexOf(cell.getAttribute('role')) !== -1
	);
});

const tableGrid = tableUtils.toGrid(node);

// Look for all the bad headers
const out = headers.reduce(function(res, header) {
	if (
		header.getAttribute('id') &&
		reffedHeaders.includes(header.getAttribute('id'))
	) {
		return !res ? res : true;
	}

	let hasCell = false;
	const pos = tableUtils.getCellPosition(header, tableGrid);

	// Look for any data cells or row headers that this might refer to
	if (tableUtils.isColumnHeader(header)) {
		hasCell = tableUtils
			.traverse('down', pos, tableGrid)
			.reduce((out, cell) => {
				return (
					out ||
					(axe.commons.dom.hasContent(cell) && !tableUtils.isColumnHeader(cell))
				);
			}, false);
	}

	// Look for any data cells or column headers that this might refer to
	if (!hasCell && tableUtils.isRowHeader(header)) {
		hasCell = tableUtils
			.traverse('right', pos, tableGrid)
			.reduce((out, cell) => {
				return (
					out ||
					(axe.commons.dom.hasContent(cell) && !tableUtils.isRowHeader(cell))
				);
			}, false);
	}

	// report the node as having failed
	if (!hasCell) {
		checkResult.relatedNodes(header);
	}

	return res && hasCell;
}, true);

return out ? true : undefined;

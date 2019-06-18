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

let out = true;
headers.forEach(header => {
	if (
		header.getAttribute('id') &&
		reffedHeaders.includes(header.getAttribute('id'))
	) {
		return;
	}

	const pos = tableUtils.getCellPosition(header, tableGrid);

	// look for any column cell that has content and is not a column header
	let hasCell = false;
	if (tableUtils.isColumnHeader(header)) {
		hasCell = tableUtils
			.traverse('down', pos, tableGrid)
			.some(
				cell =>
					axe.commons.dom.hasContent(cell) && !tableUtils.isColumnHeader(cell)
			);
	}

	// look for any row cell that has content and is not a row header
	if (!hasCell && tableUtils.isRowHeader(header)) {
		hasCell = tableUtils
			.traverse('right', pos, tableGrid)
			.some(
				cell =>
					axe.commons.dom.hasContent(cell) && !tableUtils.isRowHeader(cell)
			);
	}

	// report the node as having failed
	if (!hasCell) {
		checkResult.relatedNodes(header);
	}

	out = out && hasCell;
});

return out ? true : undefined;

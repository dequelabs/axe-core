import {
	getAllCells,
	toGrid,
	getCellPosition,
	isColumnHeader,
	isRowHeader,
	traverse
} from '../../commons/table';
import { sanitize } from '../../commons/text';

function thHasDataCellsEvaluate(node, options, virtualNode, context) {
	const cells = getAllCells(node);
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
		if (sanitize(cell.textContent) === '') {
			return false;
		}
		return (
			cell.nodeName.toUpperCase() === 'TH' ||
			['rowheader', 'columnheader'].indexOf(cell.getAttribute('role')) !== -1
		);
	});

	const tableGrid = toGrid(node);

	let out = true;
	headers.forEach(header => {
		if (
			header.getAttribute('id') &&
			reffedHeaders.includes(header.getAttribute('id'))
		) {
			return;
		}

		const pos = getCellPosition(header, tableGrid);

		// ensure column header has at least 1 non-header cell
		let hasCell = false;
		if (isColumnHeader(header)) {
			hasCell = traverse('down', pos, tableGrid)
				.find(cell => !isColumnHeader(cell));
		}

		// ensure row header has at least 1 non-header cell
		if (!hasCell && isRowHeader(header)) {
			hasCell = traverse('right', pos, tableGrid)
				.find(cell => !isRowHeader(cell));
		}

		// report the node as having failed
		if (!hasCell) {
			checkResult.relatedNodes(header);
		}

		out = out && hasCell;
	});

	return out ? true : undefined;
}

export default thHasDataCellsEvaluate;
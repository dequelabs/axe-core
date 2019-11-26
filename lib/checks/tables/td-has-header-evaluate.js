import { hasContent } from '../../commons/dom';
import {
	getAllCells,
	toGrid,
	isDataCell,
	getHeaders
} from '../../commons/table';
import { label } from '../../commons/aria';

function tdHasHeaderEvaluate(node, options, virtualNode, context) {
	const badCells = [];
	const cells = getAllCells(node);
	const tableGrid = toGrid(node);

	cells.forEach(cell => {
		// For each non-empty data cell that doesn't have an aria label
		if (
			hasContent(cell) &&
			isDataCell(cell) &&
			!label(cell)
		) {
			// Check if it has any headers
			const hasHeaders = getHeaders(cell, tableGrid).some(header => {
				return header !== null && !!hasContent(header);
			});

			// If no headers, put it on the naughty list
			if (!hasHeaders) {
				badCells.push(cell);
			}
		}
	});

	if (badCells.length) {
		this.relatedNodes(badCells);
		return false;
	}

	return true;
}

export default tdHasHeaderEvaluate;
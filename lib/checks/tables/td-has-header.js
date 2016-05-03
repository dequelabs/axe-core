var tableUtils = axe.commons.table;
var badCells = [];
var cells = tableUtils.getAllCells(node);

cells.forEach((cell) => {
	// For each non-empty data cell that doesn't have an aria label
	if (cell.textContent.trim() !== '' &&
		tableUtils.isDataCell(cell) &&
		!axe.commons.aria.label(cell)
	) {
		// Check if it has any headers
		var hasHeaders = tableUtils.getHeaders(cell);
		hasHeaders = hasHeaders.reduce(function (hasHeaders, header) {
			return (hasHeaders || header !== null && !!header.textContent.trim());
		}, false);

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

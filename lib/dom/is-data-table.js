/*global dom */

dom.isDataTable = function (node) {

	var win = node.ownerDocument.defaultView;
	var role = node.getAttribute('role');

	// The element is not focusable and has role=presentation
	if (role === 'presentation' && !dom.isFocusable(node)) {
		return false;
	}

	// Table inside editable area is data table always since the table structure is crucial for table editing
	if (node.getAttribute('contenteditable') === 'true' || dom.findUp(node, '[contenteditable="true"]')) {
		return true;
	}

	// Table having ARIA table related role is data table
	if (role === 'grid' || role === 'treegrid') {
		return true;
	}

	// Table having ARIA landmark role is data table
	if (kslib.aria.getRoleType(role) === 'landmark') {
		return true;
	}

	// Table having datatable="0" attribute is layout table
	if (node.getAttribute('datatable') === '0') {
		return false;
	}

	// Table having summary attribute is data table
	if (node.getAttribute('summary')) {
		return true;

	}

	// @todo be smarter; dont accept any descendent
	// Table having legitimate data table structures is data table
	if (node.querySelector('col, colgroup, thead, tfoot, caption, th, [scope], [headers], [abbr]')) {
		return true;
	}

	var cells = 0;
	var rowLength = node.rows.length;
	var row, cell;
	var hasBorder = false;
	for (var rowIndex = 0; rowIndex < rowLength; rowIndex++) {
		row = node.rows[rowIndex];
		for (var cellIndex = 0, cellLength = row.cells.length; cellIndex < cellLength; cellIndex++) {
			cell = row.cells[cellIndex];
			if (!hasBorder && (cell.offsetWidth !== cell.clientWidth || cell.offsetHeight !== cell.clientHeight)) {
				hasBorder = true;
			}
			// abbr element as a single child element of table cell
			if (cell.children.length === 1 && cell.children[0].nodeName === 'ABBR') {
				return true;
			}
			cells++;
		}
	}

	// Table having nested table is layout table
	if (node.getElementsByTagName('table').length) {
		return false;
	}

	// Table having only one row or column is layout table (row)
	if (rowLength < 2) {
		return false;
	}

	// Table having only one row or column is layout table (column)
	var sampleRow = node.rows[Math.ceil(rowLength / 2)];
	if (sampleRow.cells.length === 1 && sampleRow.cells[0].colSpan === 1) {
		return false;
	}

	// Table having many columns (>= 5) is data table
	if (sampleRow.cells.length >= 5) {
		return true;
	}

	// Table having borders around cells is data table
	if (hasBorder) {
		return true;
	}

	// Table having differently colored rows is data table
	var style;
	for (rowIndex = 0; rowIndex < rowLength; rowIndex++) {
		row = node.rows[rowIndex];
		if (style && style !== win.getComputedStyle(row).getPropertyValue('background')) {
			return true;
		} else {
			style = win.getComputedStyle(row).getPropertyValue('background');
		}

	}

	// Table having many rows (>= 20) is data table
	if (rowLength >= 20) {
		return true;
	}

	// Wide table (more than 95% of the document width) is layout table
	if (dom.getElementCoordinates(node).width > dom.getViewportSize(win).width * 0.95) {
		return false;
	}

	// Table having small amount of cells (<= 10) is layout table
	if (cells < 10) {
		return false;
	}

	// Table containing embed, object, applet of iframe elements (typical advertisements elements) is layout table
	if (node.querySelector('object, embed, iframe, applet')) {
		return false;
	}

	// Otherwise it's data table
	return true;
};
var table = commons.dom.findUp(node, 'table');

if (commons.table.isDataTable(table)) {
	var tableArray = commons.table.toArray(table);
	return (tableArray.length >= 4 &&
			tableArray[0].length >= 4 &&
			tableArray[1].length >= 4 &&
			tableArray[2].length >= 4 &&
			tableArray[3].length >= 4);
}

return false;
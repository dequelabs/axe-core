if (commons.table.isDataTable(node)) {
	var tableArray = commons.table.toArray(node);
	return (tableArray.length >= 4 &&
			tableArray[0].length >= 4 &&
			tableArray[1].length >= 4 &&
			tableArray[2].length >= 4 &&
			tableArray[3].length >= 4);
}

return false;
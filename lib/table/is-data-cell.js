/*global table */

table.isDataCell = function (cell) {
	// A cell is said to be an empty cell if it contains no elements and its text content, if any, consists only of White_Space characters.
	if (!cell.children.length && !cell.innerText.trim()) {
		return false;
	}
	return cell.nodeName === 'TD';
};
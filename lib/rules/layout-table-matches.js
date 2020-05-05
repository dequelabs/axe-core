import { isFocusable } from '../commons/dom';
import { isDataTable } from '../commons/table';

function layoutTableMatches(node) {
	var role = (node.getAttribute('role') || '').toLowerCase();

	return (
		!((role === 'presentation' || role === 'none') && !isFocusable(node)) &&
		!isDataTable(node)
	);
}

export default layoutTableMatches;

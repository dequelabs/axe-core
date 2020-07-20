import { isDataTable } from '../commons/table';
import { isFocusable } from '../commons/dom';

// TODO: es-modules add tests. No way to access this on the `axe` object
function dataTableMatches(node) {
	return !isDataTable(node) && !isFocusable(node);
}

export default dataTableMatches;

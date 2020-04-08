// TODO: es-module-commons. convert to:
// export { default as isAriaCombobox } from 'path'
import getAllCells from './get-all-cells';
import getCellPosition from './get-cell-position';
import getHeaders from './get-headers';
import getScope from './get-scope';
import isColumnHeader from './is-column-header';
import isDataCell from './is-data-cell';
import isDataTable from './is-data-table';
import isHeader from './is-header';
import isRowHeader from './is-row-header';
import toGrid from './to-grid';
import traverse from './traverse';

/**
 * Namespace for table-related utilities.
 * @namespace table
 * @memberof axe.commons
 */
const table = {
	getAllCells,
	getCellPosition,
	getHeaders,
	getScope,
	isColumnHeader,
	isDataCell,
	isDataTable,
	isHeader,
	isRowHeader,
	toGrid,
	traverse,

	// This was the old name
	toArray: toGrid
};
commons.table = table;

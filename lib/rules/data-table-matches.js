import { isDataTable } from '../commons/table';

function dataTableMatches(node, virtualNode, context) {
  return isDataTable(node);
}

export default dataTableMatches;
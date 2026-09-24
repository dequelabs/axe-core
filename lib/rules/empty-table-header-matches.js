import { getRole } from '../commons/aria';

/**
 * Only test elements exposed as table headers. A th inside a table with
 * role="none" or role="presentation" inherits the presentational role.
 * @param {HTMLElement} node
 * @param {VirtualNode} virtualNode
 * @return {Boolean}
 */
export default function emptyTableHeaderMatches(node, virtualNode) {
  return ['rowheader', 'columnheader'].includes(getRole(virtualNode));
}

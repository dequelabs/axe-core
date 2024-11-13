import { parseTabindex } from '../core/utils';

function noNegativeTabindexMatches(node, virtualNode) {
  const tabindex = parseTabindex(virtualNode.attr('tabindex'));
  return isNaN(tabindex) || tabindex >= 0;
}

export default noNegativeTabindexMatches;

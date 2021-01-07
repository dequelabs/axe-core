import { getFlattenedTree, getSelectorData } from '../utils';

/**
 * Setup axe-core so axe.common functions can work properly.
 * @param {Node} [node=document.documentElement] optional node. NOTE: passing in anything other than body or the documentElement may result in incomplete results.
 */
function setup(node) {
  axe._tree = getFlattenedTree(node);
  axe._selectorData = getSelectorData(axe._tree);
}

export default setup;

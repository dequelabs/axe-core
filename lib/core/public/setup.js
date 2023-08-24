import { getFlattenedTree, getSelectorData } from '../utils';
import { setupGlobals } from './run/globals-setup';

/**
 * Setup axe-core so axe.common functions can work properly.
 * @param {Node} [node=document.documentElement] optional node. NOTE: passing in anything other than body or the documentElement may result in incomplete results.
 */
function setup(node) {
  if (axe._tree) {
    throw new Error(
      'Axe is already setup. Call `axe.teardown()` before calling `axe.setup` again.'
    );
  }
  // Normalize document
  if (
    node &&
    typeof node.documentElement === 'object' &&
    typeof node.defaultView === 'object'
  ) {
    node = node.documentElement;
  }

  setupGlobals(node);
  axe._tree = getFlattenedTree(node);
  axe._selectorData = getSelectorData(axe._tree);

  return axe._tree[0];
}

export default setup;

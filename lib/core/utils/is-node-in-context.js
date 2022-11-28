import contains from './contains';

/**
 * Determines if a node is included or excluded in a given context
 * @private
 * @param  {Node}  node     The node to test
 * @param  {Object}  context "Resolved" context object, @see resolveContext
 * @return {Boolean}         [description]
 */
export default function isNodeInContext(node, { include = [], exclude = [] }) {
  const filterInclude = include.filter(candidate => contains(candidate, node));
  if (filterInclude.length === 0) {
    return false;
  }
  const filterExcluded = exclude.filter(candidate => contains(candidate, node));
  if (filterExcluded.length === 0) {
    return true;
  }
  const deepestInclude = getDeepest(filterInclude);
  const deepestExclude = getDeepest(filterExcluded);
  return contains(deepestExclude, deepestInclude);
}

/**
 * Get the deepest node in a given collection
 * @private
 * @param  {Array} collection Array of nodes to test
 * @return {Node}             The deepest node
 */
function getDeepest(collection) {
  let deepest;
  for (const node of collection) {
    if (!deepest || !contains(node, deepest)) {
      deepest = node;
    }
  }
  return deepest;
}

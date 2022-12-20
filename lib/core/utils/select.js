import contains from './contains';
import querySelectorAllFilter from './query-selector-all-filter';
import isNodeInContext from './is-node-in-context';

/**
 * Selects elements which match `selector` that are included and excluded via the `Context` object
 * @param  {String} selector  CSS selector of the HTMLElements to select
 * @param  {Context} context  The "resolved" context object, @see Context
 * @return {Array}            Matching virtual DOM nodes sorted by DOM order
 */
export default function select(selector, context) {
  let result = [];
  let candidate;
  if (axe._selectCache) {
    // if used outside of run, it will still work
    for (let j = 0, l = axe._selectCache.length; j < l; j++) {
      // First see whether the item exists in the cache
      const item = axe._selectCache[j];
      if (item.selector === selector) {
        return item.result;
      }
    }
  }

  const outerIncludes = getOuterIncludes(context.include);
  const isInContext = getContextFilter(context);
  for (let i = 0; i < outerIncludes.length; i++) {
    candidate = outerIncludes[i];
    const nodes = querySelectorAllFilter(candidate, selector, isInContext);
    result = mergeArrayUniques(result, nodes);
  }
  if (axe._selectCache) {
    axe._selectCache.push({
      selector: selector,
      result: result
    });
  }
  return result;
}

/**
 * reduces the includes list to only the outermost includes
 * @private
 * @param {Array} the array of include nodes
 * @return {Array} the modified array of nodes
 */
function getOuterIncludes(includes) {
  return includes.reduce((res, el) => {
    if (!res.length || !contains(res[res.length - 1], el)) {
      res.push(el);
    }
    return res;
  }, []);
}

/**
 * Return a filter method to test if a node is in context; or
 *  null if the node is always included.
 * @private
 * @param {Context}
 * @return {Function|null}
 */
function getContextFilter(context) {
  // Since we're starting from included nodes,
  // if nothing is excluded, we can skip the filter step.
  if (!context.exclude || context.exclude.length === 0) {
    return null;
  }
  return node => isNodeInContext(node, context);
}

/**
 * Merge the unique items from Array 1 into 2, or from 2 into 1 (whichever is longest)
 * @private
 * @param  {Array} Arr1
 * @param  {Array} Arr2
 */
function mergeArrayUniques(arr1, arr2) {
  if (arr1.length === 0) {
    return arr2;
  }
  if (arr1.length < arr2.length) {
    // switch so the comparison is shortest
    const temp = arr1;
    arr1 = arr2;
    arr2 = temp;
  }
  for (let i = 0, l = arr2.length; i < l; i++) {
    if (!arr1.includes(arr2[i])) {
      arr1.push(arr2[i]);
    }
  }
  return arr1;
}

import cache from '../base/cache';

/**
 * Clean up axe-core tree and caches
 */
function teardown() {
  if (cache.get('globalDocumentSet')) {
    document = null;
  }
  if (cache.get('globalWindowSet')) {
    window = null;
  }

  axe._memoizedFns.forEach(fn => fn.clear());
  cache.clear();
  axe._tree = undefined;
  axe._selectorData = undefined;
}

export default teardown;

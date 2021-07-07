import cache from '../base/cache';
import { resetGlobals } from './run/globals-setup';

/**
 * Clean up axe-core tree and caches. `axe.run` will call this function at the end of the run so there's no need to call it yourself afterwards.
 */
function teardown() {
  // Reset MUST to happen before the cache is cleared
  resetGlobals();
  axe._memoizedFns.forEach(fn => fn.clear());
  cache.clear();
  axe._tree = undefined;
  axe._selectorData = undefined;
  axe._selectCache = undefined;
}

export default teardown;

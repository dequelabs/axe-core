import { memoize } from '../imports';

// FYI: memoize does not always play nice with esbuild
// and sometimes is built out of order.
// See: https://github.com/evanw/esbuild/issues/1433
//
// To get around this, you may need to import this
// file directly in the file you want to memoize.
//
// For example:
// import memoize from '../../core/utils/memoize';
// vs
// import memoize from '../../core/utils';

/**
 * Memoize a function.
 * @method memoize
 * @memberof axe.utils
 * @param {Function} fn Function to memoize
 * @return {Function}
 */
// TODO: es-modules._memoziedFns
axe._memoizedFns = [];
function memoizeImplementation(fn) {
  // keep track of each function that is memoized so it can be cleared at
  // the end of a run. each memoized function has its own cache, so there is
  // no method to clear all memoized caches. instead, we have to clear each
  // individual memoized function ourselves.
  const memoized = memoize(fn);
  axe._memoizedFns.push(memoized);
  return memoized;
}

export default memoizeImplementation;

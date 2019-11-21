import { memoizee } from '../imports';

export const memoizedFns = [];

/**
 * Memoize a function.
 * @method memoize
 * @memberof axe.utils
 * @param {Function} fn Function to memoize
 * @return {Function}
 */
function memoize(fn) {
	// keep track of each function that is memoized so it can be cleared at
	// the end of a run. each memoized function has its own cache, so there is
	// no method to clear all memoized caches. instead, we have to clear each
	// individual memoized function ourselves.
	const memoized = memoizee(fn);
	memoizedFns.push(memoized);
	return memoized;
}

export default memoize;

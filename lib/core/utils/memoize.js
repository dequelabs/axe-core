import memoize from 'memoizee';

const memoizedFns = [];

/**
 * Memoize a function.
 * @method memoize
 * @memberof axe.utils
 * @param {Function} fn Function to memoize
 * @return {Function}
 */
function memoizeImplementation(fn) {
	// keep track of each function that is memoized so it can be cleared at
	// the end of a run. each memoized function has its own cache, so there is
	// no method to clear all memoized caches. instead, we have to clear each
	// individual memoized function ourselves.
	const memoized = memoize(fn);
	memoizedFns.push(memoized);
	return memoized;
}

export function clearMemoziedFunctions() {
	memoizedFns.forEach(fn => fn.clear());
}

export default memoizeImplementation;

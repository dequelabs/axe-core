import memoize from 'memoizee';
import deepEqual from 'fast-deep-equal/es6';

/**
 * Memoize a function.
 * @method memoize
 * @memberof axe.utils
 * @param {Function} fn Function to memoize
 * @return {Function}
 */
// TODO: es-modules._memoziedFns
axe._memoizedFns = [];
export default function memoizeImplementation(fn, options) {
  // keep track of each function that is memoized so it can be cleared at
  // the end of a run. each memoized function has its own cache, so there is
  // no method to clear all memoized caches. instead, we have to clear each
  // individual memoized function ourselves.
  const memoized = memoize(fn, options);
  axe._memoizedFns.push(memoized);
  return memoized;
}

/**
 * Memoize a function that accepts parameters that can be strictly equal as well as parameters which can be deep equal (such as an options object).
 * @method memoizeWithFlexObject
 * @memberof axe.utils
 * @param {Function} fn Function to memoize
 * @return {Function}
 */
export function memoizeObjectArgs(fn, options) {
  /*
    memoize works by having each parameter resolve with a strict equals. this means that if the function you want to memoize takes an object which is created at call time (such as an options object), then memoize will not work for the function (as every call creates a unique parameter).
    to memoize these types of functions we need to pass the `normalizer` option to memoize which lets us create a custom way to resolve the function parameters to a unique index
  */
  let argMap = [];
  const memoized = memoize(fn, {
    ...options,
    normalizer: {
      get(args) {
        const index = argMap.findIndex(entry => {
          return entry.every((item, i) => {
            if (args[i]?.constructor === Object) {
              return deepEqual(item, args[i]);
            }

            return item === args[i];
          });
        });
        return index === -1 ? null : index;
      },
      set(args) {
        argMap.push([...args]);
        return argMap.length - 1;
      },
      clear() {
        argMap = [];
      }
    }
  });
  axe._memoizedFns.push(memoized);
  return memoized;
}

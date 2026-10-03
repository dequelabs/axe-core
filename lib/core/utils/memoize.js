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
 * @param {Object} [options] Options passed to memoizee, e.g. `{ primitive: true }`
 * @return {Function}
 */
// TODO: es-modules._memoziedFns
axe._memoizedFns = [];
export default function memoizeImplementation(fn, options) {
  // keep track of each function that is memoized so it can be cleared at
  // the end of a run. each memoized function has its own cache, so there is
  // no method to clear all memoized caches. instead, we have to clear each
  // individual memoized function ourselves.
  // Keep explicit memoizee options unchanged, including primitive mode.
  const length = fn.length;
  if (!options && Number.isInteger(length) && length > 0) {
    options = { normalizer: createIdentityNormalizer(length) };
  }
  const memoized = memoize(fn, options);
  axe._memoizedFns.push(memoized);
  return memoized;
}

/**
 * Build an identity lookup for a fixed-length argument tuple.
 * @param {number} length Number of arguments included in the cache key
 * @return {Object} Memoizee normalizer with deletion and clearing hooks
 */
function createIdentityNormalizer(length) {
  if (length === 1) {
    return createSingleArgumentNormalizer();
  }

  const lastIndex = length - 1;
  let root = new Map();
  let argsById = [];
  let nextId = 0;

  return {
    get(args) {
      let branch = root;
      for (let i = 0; i < lastIndex; i++) {
        branch = branch.get(args[i]);
        if (!branch) {
          return null;
        }
      }
      return branch.get(args[lastIndex]) ?? null;
    },
    set(args) {
      let branch = root;
      const values = [];
      const id = ++nextId;

      for (let i = 0; i < lastIndex; i++) {
        const value = (values[i] = args[i]);
        let nextBranch = branch.get(value);
        if (!nextBranch) {
          nextBranch = new Map();
          branch.set(value, nextBranch);
        }
        branch = nextBranch;
      }

      const lastValue = (values[lastIndex] = args[lastIndex]);
      branch.set(lastValue, id);
      argsById[id] = values;
      return id;
    },
    delete(id) {
      const args = argsById[id];
      if (!args) {
        return;
      }

      let branch = root;
      const path = [];
      for (let i = 0; i < lastIndex; i++) {
        const value = args[i];
        path.push([branch, value]);
        branch = branch.get(value);
      }
      branch.delete(args[lastIndex]);

      while (branch.size === 0 && path.length) {
        const [parent, value] = path.pop();
        parent.delete(value);
        branch = parent;
      }
      delete argsById[id];
    },
    clear() {
      root = new Map();
      argsById = [];
      nextId = 0;
    }
  };
}

/**
 * Build the single-argument identity lookup without a tuple trie.
 * @return {Object} Memoizee normalizer with deletion and clearing hooks
 */
function createSingleArgumentNormalizer() {
  let ids = new Map();
  let argsById = [];
  let nextId = 0;

  return {
    get(args) {
      return ids.get(args[0]) ?? null;
    },
    set(args) {
      const value = args[0];
      const id = ++nextId;
      ids.set(value, id);
      argsById[id] = value;
      return id;
    },
    delete(id) {
      ids.delete(argsById[id]);
      delete argsById[id];
    },
    clear() {
      ids = new Map();
      argsById = [];
      nextId = 0;
    }
  };
}

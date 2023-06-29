import cache from '../base/cache';

/**
 * Deeply clones an object or array
 * @param  {Mixed} obj The object/array to clone
 * @return {Mixed} A clone of the initial object or array
 */
export default function clone(obj, recursed) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // don't DOM nodes. since we can pass nodes from different window contexts
  // we'll also use duck typing to determine what is a DOM node
  if (
    (window?.Node && obj instanceof window.Node) ||
    (window?.HTMLCollection && obj instanceof window.HTMLCollection) ||
    ('nodeName' in obj && 'nodeType' in obj && 'ownerDocument' in obj)
  ) {
    return obj;
  }

  // handle circular references by caching the cloned object and returning it
  // clear for every new call to clone so we don't return a cached value for
  // a different object
  const seen = cache.get('utils.clone', () => new Map());
  if (!recursed) {
    seen.clear();
  }

  if (recursed && seen.has(obj)) {
    return seen.get(obj);
  }

  if (Array.isArray(obj)) {
    const out = [];
    seen.set(obj, out);
    obj.forEach(value => {
      out.push(clone(value, true));
    });
    return out;
  }

  const out = {};
  seen.set(obj, out);
  // eslint-disable-next-line guard-for-in
  for (const key in obj) {
    out[key] = clone(obj[key], true);
  }
  return out;
}

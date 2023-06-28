import cache from '../base/cache';

/**
 * Deeply clones an object or array
 * @param  {Mixed} obj The object/array to clone
 * @return {Mixed} A clone of the initial object or array
 */
export default function clone(obj) {
  // handle circular references by caching the cloned object and returning it
  const seen = cache.get('utils.clone', () => new WeakMap());
  if (seen.has(obj)) {
    return seen.get(obj);
  }

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

  if (Array.isArray(obj)) {
    const out = [];
    seen.set(obj, out);
    obj.forEach(value => {
      out.push(clone(value));
    });
    return out;
  }

  const out = {};
  seen.set(obj, out);
  // eslint-disable-next-line guard-for-in
  for (const key in obj) {
    out[key] = clone(obj[key]);
  }
  return out;
}

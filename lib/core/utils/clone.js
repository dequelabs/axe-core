/**
 * Deeply clones an object or array. DOM nodes or collections of DOM nodes are not deeply cloned and are instead returned as is.
 * @param  {Mixed} obj The object/array to clone
 * @return {Mixed} A clone of the initial object or array
 */
export default function clone(obj) {
  return cloneRecused(obj, new Map());
}

// internal function to hide non-user facing parameters
function cloneRecused(obj, seen) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // don't clone DOM nodes. since we can pass nodes from different window contexts
  // we'll also use duck typing to determine what is a DOM node
  if (
    (window?.Node && obj instanceof window.Node) ||
    (window?.HTMLCollection && obj instanceof window.HTMLCollection) ||
    ('nodeName' in obj && 'nodeType' in obj && 'ownerDocument' in obj)
  ) {
    return obj;
  }

  // handle circular references by caching the cloned object and returning it
  if (seen.has(obj)) {
    return seen.get(obj);
  }

  if (Array.isArray(obj)) {
    const out = [];
    seen.set(obj, out);
    obj.forEach(value => {
      out.push(cloneRecused(value, seen));
    });
    return out;
  }

  const out = {};
  seen.set(obj, out);
  // eslint-disable-next-line guard-for-in
  for (const key in obj) {
    out[key] = cloneRecused(obj[key], seen);
  }
  return out;
}

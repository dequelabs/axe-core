/**
 * Parses a tabindex value to return an integer if valid, or null if invalid.
 * @method parseTabindex
 * @memberof axe.utils
 * @param  {string|null} str
 * @return {number|null}
 */
function parseTabindex(value) {
  if (typeof value !== 'string') {
    return null;
  }

  // spec: https://html.spec.whatwg.org/#rules-for-parsing-integers
  const match = value.trim().match(/^([-+]?\d+)/);
  if (match) {
    return Number(match[1]);
  }

  return null;
}

export default parseTabindex;

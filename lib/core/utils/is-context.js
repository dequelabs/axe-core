import objectHasOwn from './object-has-own';
import isArrayLike from './is-array-like';

/**
 * Determine if some value can be parsed as a context
 * @private
 * @param  {Mixed} contextSpec The configuration object passed to `Context`
 * @return {boolea}
 */
export function isContextSpec(contextSpec) {
  return isContextObject(contextSpec) || isContextProp(contextSpec);
}

/**
 * Checks if the given context specification is a valid context object.
 *
 * @param {Object} contextSpec - The context specification object to check.
 * @returns {boolean} - Returns true if the context specification is a valid context object, otherwise returns false.
 */
export function isContextObject(contextSpec) {
  return ['include', 'exclude'].some(
    prop => objectHasOwn(contextSpec, prop) && isContextProp(contextSpec[prop])
  );
}

/**
 * Checks if the given contextList is a valid context property.
 * @param {string|Node|Array} contextList - The contextList to check.
 * @returns {boolean} - Returns true if the contextList is a valid context property, otherwise false.
 */
export function isContextProp(contextList) {
  return (
    typeof contextList === 'string' ||
    contextList instanceof window.Node ||
    isLabelledFramesSelector(contextList) ||
    isLabelledShadowDomSelector(contextList) ||
    isArrayLike(contextList)
  );
}

export function isLabelledFramesSelector(selector) {
  // This doesn't guarantee the selector is valid.
  // Just that this isn't a runOptions object
  // Normalization will ignore invalid selectors
  return objectHasOwn(selector, 'fromFrames');
}

export function isLabelledShadowDomSelector(selector) {
  // This doesn't guarantee the selector is valid.
  // Just that this isn't a runOptions object
  // Normalization will ignore invalid selectors
  return objectHasOwn(selector, 'fromShadowDom');
}

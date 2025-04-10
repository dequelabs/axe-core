import {
  assert as utilsAssert,
  objectHasOwn,
  isArrayLike,
  isContextObject,
  isContextProp,
  isLabelledFramesSelector,
  isLabelledShadowDomSelector
} from '../../utils';

/**
 * Normalize the input of "context" so that many different methods of input are accepted
 * @private
 * @param  {Mixed} contextSpec The configuration object passed to `Context`
 * @return {Object}            Normalized context spec to include both `include` and `exclude` arrays
 */
export function normalizeContext(contextSpec) {
  if (isContextObject(contextSpec)) {
    // Assert include / exclude isn't mixed with fromFrames / fromShadowDom
    const msg =
      ' must be used inside include or exclude. It should not be on the same object.';
    assert(!objectHasOwn(contextSpec, 'fromFrames'), 'fromFrames' + msg);
    assert(!objectHasOwn(contextSpec, 'fromShadowDom'), 'fromShadowDom' + msg);
  } else if (isContextProp(contextSpec)) {
    // Wrap in include
    contextSpec = { include: contextSpec, exclude: [] };
  } else {
    // Spec is unknown
    return { include: [document], exclude: [] };
  }

  const include = normalizeContextList(contextSpec.include);
  if (include.length === 0) {
    include.push(document); // Include defaults to [document] if empty
  }
  const exclude = normalizeContextList(contextSpec.exclude);
  return { include, exclude };
}

function normalizeContextList(selectorList = []) {
  const normalizedList = [];
  if (!isArrayLike(selectorList)) {
    selectorList = [selectorList];
  }
  // Use .length to handle jQuery-like objects
  for (let i = 0; i < selectorList.length; i++) {
    const normalizedSelector = normalizeContextSelector(selectorList[i]);
    if (normalizedSelector) {
      normalizedList.push(normalizedSelector);
    }
  }
  return normalizedList;
}

function normalizeContextSelector(selector) {
  if (selector instanceof window.Node) {
    return selector; // Nodes must not be wrapped in an array
  }
  if (typeof selector === 'string') {
    return [selector]; // Convert to frame selector
  }

  if (isLabelledFramesSelector(selector)) {
    assertLabelledFrameSelector(selector);
    selector = selector.fromFrames;
  } else if (isLabelledShadowDomSelector(selector)) {
    selector = [selector];
  }
  return normalizeFrameSelectors(selector);
}

function normalizeFrameSelectors(frameSelectors) {
  if (!Array.isArray(frameSelectors)) {
    return; // Invalid. Skip this selector
  }
  const normalizedSelectors = [];
  for (let selector of frameSelectors) {
    if (isLabelledShadowDomSelector(selector)) {
      assertLabelledShadowDomSelector(selector);
      selector = selector.fromShadowDom;
    }
    if (typeof selector !== 'string' && !isShadowSelector(selector)) {
      return; // Invalid. Skip this selector
    }
    normalizedSelectors.push(selector);
  }
  return normalizedSelectors;
}

function assertLabelledFrameSelector(selector) {
  assert(
    Array.isArray(selector.fromFrames),
    'fromFrames property must be an array'
  );
  assert(
    selector.fromFrames.every(
      fromFrameSelector => !objectHasOwn(fromFrameSelector, 'fromFrames')
    ),
    'Invalid context; fromFrames selector must be appended, rather than nested'
  );
  assert(
    !objectHasOwn(selector, 'fromShadowDom'),
    'fromFrames and fromShadowDom cannot be used on the same object'
  );
}

function assertLabelledShadowDomSelector(selector) {
  assert(
    Array.isArray(selector.fromShadowDom),
    'fromShadowDom property must be an array'
  );
  assert(
    selector.fromShadowDom.every(
      fromShadowDomSelector =>
        !objectHasOwn(fromShadowDomSelector, 'fromFrames')
    ),
    'shadow selector must be inside fromFrame instead'
  );
  assert(
    selector.fromShadowDom.every(
      fromShadowDomSelector =>
        !objectHasOwn(fromShadowDomSelector, 'fromShadowDom')
    ),
    'fromShadowDom selector must be appended, rather than nested'
  );
}

function isShadowSelector(selector) {
  return (
    Array.isArray(selector) && selector.every(str => typeof str === 'string')
  );
}

// Wrapper to ensure the correct message
function assert(bool, str) {
  utilsAssert(
    bool,
    `Invalid context; ${str}\nSee: https://github.com/dequelabs/axe-core/blob/master/doc/context.md`
  );
}

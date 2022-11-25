export function normalizeContext(contextSpec) {
  if (isContextProp(contextSpec)) {
    contextSpec = { include: contextSpec }
  } else if (!isContextObject(contextSpec)) {
    // Context is invalid or undefined
    return { include: [document], exclude: [] }
  }

  const include = normalizeContextList(contextSpec.include);
  if (include.length === 0) {
    include.push(document); // Include defaults to [document] if empty
  }
  const exclude = normalizeContextList(contextSpec.exclude);
  return { include, exclude };
}

function normalizeContextList(selectorList = []) {
  if (!isArrayLike(selectorList)) {
    selectorList = [selectorList];
  }
  
  let normalizedList = [];
  for (let i = 0; i < selectorList.length; i++) {
    const normalizedSelector = normalizeContextSelector(selectorList[i]);
    if (normalizedSelector) {
      normalizedList.push(normalizedSelector)
    }
  }
  return normalizedList;
}

function normalizeContextSelector(selector) {
  if (typeof selector === 'string') {
    return [selector] // Convert to frame selector
  }
  if (
    selector instanceof window.Node ||
    isValidFrameSelector(selector)
  ) {
    return selector
  }
  return 
}

function isContextObject(contextSpec) {
  if (typeof contextSpec !== 'object') {
    return false;
  }
  return (isContextProp(contextSpec.include) || isContextProp(contextSpec.exclude))
}

function isContextProp(contextList) {
  return (
    typeof contextList === 'string' ||
    contextList instanceof window.Node || 
    isArrayLike(contextList)
  )
}

function isValidFrameSelector(selector) {
  if (!Array.isArray(selector)) {
    return false;
  }
  return selector.every(selectorItem => {
    if (Array.isArray(selectorItem)) {
      return selectorItem.every(shadowSelector => typeof shadowSelector === 'string')
    }
    return typeof selectorItem === 'string'
  })
}

function isArrayLike(arr) {
  return (
    typeof arr === 'object' &&
    typeof arr.length === 'number' &&
    arr instanceof window.Node === false // Avoid DOM weirdness
  );
}

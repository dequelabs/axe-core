const separatorRegex = /[;,\s]/
const validRedirectNumRegex = /^[0-9.]+$/

function metaRefreshEvaluate(node, options, virtualNode) {
  const content = (virtualNode.attr('content') || '').trim();
  if (!content) {
    return true;
  }  
  const [redirectStr] = content.split(separatorRegex);
  if (!redirectStr.match(validRedirectNumRegex)) {
    return true;
  }
  // Prepend "0" to deal with the ".5" case:
  const redirectNum = parseInt('0' + redirectStr);
  if (typeof options?.minDelay === 'number' && redirectNum <= options.minDelay) {
    return true;
  }
  if (typeof options?.maxDelay === 'number' && redirectNum > options.maxDelay) {
    return true;
  }
  return false;
}

export default metaRefreshEvaluate;

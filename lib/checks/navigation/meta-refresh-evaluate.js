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
  const redirectDelay = parseInt('0' + redirectStr);
  this.data({ redirectDelay });
  if (typeof options?.minDelay === 'number' && redirectDelay <= options.minDelay) {
    return true;
  }
  if (typeof options?.maxDelay === 'number' && redirectDelay > options.maxDelay) {
    return true;
  }
  return false;
}

export default metaRefreshEvaluate;

const separatorRegex = /[;,\s]/;
const validRedirectNumRegex = /^[0-9.]+$/;

export default function metaRefreshEvaluate(node, options, virtualNode) {
  const { minDelay, maxDelay } = options || {};
  const content = (virtualNode.attr('content') || '').trim();
  const [redirectStr] = content.split(separatorRegex);
  if (!redirectStr.match(validRedirectNumRegex)) {
    return true;
  }

  const redirectDelay = parseFloat(redirectStr);
  this.data({ redirectDelay });
  if (typeof minDelay === 'number' && redirectDelay <= options.minDelay) {
    return true;
  }
  if (typeof maxDelay === 'number' && redirectDelay > options.maxDelay) {
    return true;
  }
  return false;
}

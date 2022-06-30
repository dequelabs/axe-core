const separatorRegex = /[;,\s]/;
const validRedirectNumRegex = /^[0-9.]+$/;

export default function metaRefreshEvaluate(node, options, virtualNode) {
  const content = (virtualNode.attr('content') || '').trim();
  if (!content) {
    return true;
  }
  const [redirectStr] = content.split(separatorRegex);
  if (!redirectStr.match(validRedirectNumRegex)) {
    return true;
  }
  const redirectDelay = praseFloat(redirectStr);
  this.data({ redirectDelay });
  if (
    typeof options?.minDelay === 'number' &&
    redirectDelay <= options.minDelay
  ) {
    return true;
  }
  if (
    typeof options?.maxDelay === 'number' &&
    redirectDelay > options.maxDelay
  ) {
    return true;
  }
  return false;
}

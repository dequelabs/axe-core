import { getElementByReference, isVisibleForScreenreader } from '../../commons/dom';

function skipLinkEvaluate(node) {
  const target = getElementByReference(node, 'href');
  if (target) {
    return isVisibleForScreenreader(target) || undefined;
  }
  return false;
}

export default skipLinkEvaluate;

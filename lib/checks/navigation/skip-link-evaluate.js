import {
  getElementByReference,
  isVisibleToScreenReaders
} from '../../commons/dom';

function skipLinkEvaluate(node) {
  const target = getElementByReference(node, 'href');
  if (target) {
    return isVisibleToScreenReaders(target) || undefined;
  }
  return false;
}

export default skipLinkEvaluate;

import { isHiddenForEveryone } from '../../commons/dom';

function accesskeysEvaluate(node) {
  if (!isHiddenForEveryone(node)) {
    this.data(node.getAttribute('accesskey'));
    this.relatedNodes([node]);
  }
  return true;
}

export default accesskeysEvaluate;

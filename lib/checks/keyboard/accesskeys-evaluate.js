import { isVisibleOnScreen } from '../../commons/dom';

function accesskeysEvaluate(node) {
  if (isVisibleOnScreen(node)) {
    this.data(node.getAttribute('accesskey'));
    this.relatedNodes([node]);
  }
  return true;
}

export default accesskeysEvaluate;

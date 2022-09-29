import { isHiddenForEveryone } from '../../commons/dom';

function accesskeysEvaluate(node, options, vNode) {
  if (!isHiddenForEveryone(vNode)) {
    this.data(vNode.attr('accesskey'));
    this.relatedNodes([node]);
  }
  return true;
}

export default accesskeysEvaluate;

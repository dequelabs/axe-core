import { sanitize, subtreeText } from '../../commons/text';
import AbstractVirtualNode from '../../core/base/virtual-node/abstract-virtual-node';
import { getNodeFromTree } from '../../core/utils';

export default sameCaptionSummaryEvaluate;

function sameCaptionSummaryEvaluate(node, options, virtualNode) {
  virtualNode =
    virtualNode instanceof AbstractVirtualNode
      ? virtualNode
      : getNodeFromTree(node);

  if (virtualNode && virtualNode.props.nodeName !== 'table') {
    return undefined;
  }

  if (virtualNode.children === undefined) {
    // undefined in this check means pass
    return false;
  }

  var summary = virtualNode.attr('summary');
  var captionNode = virtualNode.children.find(isCaptionNode);
  var caption = captionNode ? sanitize(subtreeText(captionNode)) : false;

  return (
    !!(summary && caption) &&
    sanitize(summary).toLowerCase() === sanitize(caption).toLowerCase()
  );
}

function isCaptionNode(virtualNode) {
  return virtualNode.props.nodeName === 'caption';
}

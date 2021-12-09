import { sanitize, subtreeText } from '../../commons/text';

export default sameCaptionSummaryEvaluate;

function sameCaptionSummaryEvaluate(node, options, virtualNode) {
  if (virtualNode.children === undefined) {
    return undefined;
  }

  var summary = virtualNode.attr('summary');
  var captionNode = virtualNode.children.find(isCaptionNode);
  var caption = captionNode ? sanitize(subtreeText(captionNode)) : false;

  if (!caption || !summary) {
    return false;
  }

  return sanitize(summary).toLowerCase() === sanitize(caption).toLowerCase();
}

function isCaptionNode(virtualNode) {
  return virtualNode.props.nodeName === 'caption';
}

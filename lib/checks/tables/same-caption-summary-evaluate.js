import { sanitize, subtreeText } from '../../commons/text';

export default sameCaptionSummaryEvaluate;

function sameCaptionSummaryEvaluate(node, options, virtualNode) {
  // undefined in this check means pass
  if (virtualNode.children === undefined) {
    return false;
  }

  var summary = virtualNode.attr('summary');
  var captionNode = virtualNode.children.find(isCaptionNode);
  var caption = sanitize(subtreeText(captionNode));

  return (
    !!(summary && caption) &&
    sanitize(summary).toLowerCase() === sanitize(caption).toLowerCase()
  );
}

function isCaptionNode(virtualNode) {
  return virtualNode.props.nodeName === 'caption';
}

import { queryDom } from '../../commons/dom';

function captionEvaluate(node, options, virtualNode) {
  const tracks = queryDom(virtualNode, 'track');
  const hasCaptions = tracks.some(vNode => {
    return (vNode.attr('kind') || '').toLowerCase() === 'captions';
  });

  // Undefined if there are no tracks - media may use another caption method
  return hasCaptions ? false : undefined;
}

export default captionEvaluate;

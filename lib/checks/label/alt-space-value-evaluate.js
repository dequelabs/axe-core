import { getRole } from '../../commons/aria';

function altSpaceValueEvaluate(node, options, virtualNode) {
  if (['presentation', 'none'].includes(getRole(virtualNode))) {
    return false;
  }

  const alt = virtualNode.attr('alt');
  const isOnlySpace = /^\s+$/;
  return typeof alt === 'string' && isOnlySpace.test(alt);
}

export default altSpaceValueEvaluate;

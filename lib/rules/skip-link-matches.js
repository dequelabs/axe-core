import { isSkipLink } from '../commons/dom';

function skipLinkMatches(node, virtualNode, context) {
  return isSkipLink(node);
}

export default skipLinkMatches;

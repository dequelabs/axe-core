import { sanitize } from '../commons/text';

function frameTitleHasTextMatches(node, virtualNode) {
  const title = virtualNode.attr('title');
  return !!sanitize(title);
}

export default frameTitleHasTextMatches;

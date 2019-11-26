import { sanitize } from '../commons/text';

function frameTitleHasTextMatches(node, virtualNode, context) {
  var title = node.getAttribute('title');
  return !!(title ? sanitize(title).trim() : '');
}

export default frameTitleHasTextMatches;

import { sanitize } from '../../commons/text';

function docHasTitleEvaluate(node, options, virtualNode, context) {
  var title = document.title;
  return !!(title ? sanitize(title).trim() : '');
}

export default docHasTitleEvaluate;
import { sanitize } from '../commons/text';
import { isVisibleOnScreen, isInTextBlock } from '../commons/dom';

function linkInTextBlockMatches(node) {
  var text = sanitize(node.innerText);
  var role = node.getAttribute('role');

  if (role && role !== 'link') {
    return false;
  }
  if (!text) {
    return false;
  }
  if (!isVisibleOnScreen(node)) {
    return false;
  }

  return isInTextBlock(node);
}

export default linkInTextBlockMatches;

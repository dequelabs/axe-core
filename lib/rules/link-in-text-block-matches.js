import { sanitize } from '../commons/text';
import { isVisibleOnScreen, isInTextBlock } from '../commons/dom';
import { getExplicitRole } from '../commons/aria';

function linkInTextBlockMatches(node) {
  const text = sanitize(node.innerText);
  const role = getExplicitRole(node);

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

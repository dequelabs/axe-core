import { isVisible } from '../commons/dom';

export default function hasVisibleTextMatches(node) {
  if (!isVisible(node, false)) {
    return false;
  }
  // TODO: Check there's actually some text
  return true;
}

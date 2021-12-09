import { isVisible } from '../commons/dom';

export default function hasVisibleTextMatches(node) {
  return isVisible(node, false);
}

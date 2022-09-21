import { isVisibleOnScreen } from '../commons/dom';

export default function hasVisibleTextMatches(node) {
  return isVisibleOnScreen(node);
}

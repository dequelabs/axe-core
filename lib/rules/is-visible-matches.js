import { isVisibleOnScreen } from '../commons/dom';

// @deprecated use isVisibleOnScreenMatches
export default function hasVisibleTextMatches(node) {
  return isVisibleOnScreen(node);
}

import { isVisibleOnScreen } from '../commons/dom';

export default function isVisibleOnScreenMatches(node) {
  return isVisibleOnScreen(node);
}

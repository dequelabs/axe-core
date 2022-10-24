import { isVisibleOnScreen } from '../commons/dom';

export default function isVisibleOnScreenMatches(node, virtualNode) {
  return isVisibleOnScreen(virtualNode);
}

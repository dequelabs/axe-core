import { hasLangText } from '../commons/dom'

function hasLangTextMatches(node, virtualNode) {
  return hasLangText(virtualNode);
}

export default hasLangTextMatches;

import { getRootNode, isFocusable } from '../commons/dom';
import { isAccessibleRef } from '../commons/aria';
import { escapeSelector } from '../core/utils';

function duplicateIdMiscMatches(node, virtualNode) {
  const id = virtualNode.attr('id').trim();
  const idSelector = `*[id="${escapeSelector(id)}"]`;
  const idMatchingElms = Array.from(
    getRootNode(node).querySelectorAll(idSelector)
  );

  return (
    !isAccessibleRef(node) && idMatchingElms.every(elm => !isFocusable(elm))
  );
}

export default duplicateIdMiscMatches;

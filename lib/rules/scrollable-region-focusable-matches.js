import hasContentVirtual from '../commons/dom/has-content-virtual';
import isComboboxPopup from '../commons/aria/is-combobox-popup';
import querySelectorAll from '../core/utils/query-selector-all';
import getScroll from '../core/utils/get-scroll';

export default function scrollableRegionFocusableMatches(node, virtualNode) {
  return (
    getScroll(node, 13) &&
    isComboboxPopup(virtualNode) === false &&
    hasVisibleChildren(virtualNode)
  );
}

function hasVisibleChildren(vNode) {
  const nodeAndDescendents = querySelectorAll(vNode, '*');
  return nodeAndDescendents.some(elm =>
    // (elm, noRecursion, ignoreAria)
    hasContentVirtual(elm, true, true)
  );
}

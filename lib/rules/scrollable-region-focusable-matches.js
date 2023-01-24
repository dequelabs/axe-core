import hasContentVirtual from '../commons/dom/has-content-virtual';
import isComboboxPopup from '../commons/aria/is-combobox-popup';
import { querySelectorAll, getScroll } from '../core/utils';

export default function scrollableRegionFocusableMatches(node, virtualNode) {
  return (
    // The element scrolls
    getScroll(node, 13) !== undefined &&
    // It's not a combobox popup, which commonly has keyboard focus added
    isComboboxPopup(virtualNode) === false &&
    // And there's something actually worth scrolling to
    isNoneEmptyElement(virtualNode)
  );
}

function isNoneEmptyElement(vNode) {
  return querySelectorAll(vNode, '*').some(elm =>
    // (elm, noRecursion, ignoreAria)
    hasContentVirtual(elm, true, true)
  );
}

import hasContentVirtual, {
  hasChildTextNodes
} from '../commons/dom/has-content-virtual';
import isComboboxPopup from '../commons/aria/is-combobox-popup';
import { querySelectorAll, getScroll } from '../core/utils';

export default function scrollableRegionFocusableMatches(node, virtualNode) {
  return (
    // The element scrolls
    getScroll(node, 13) !== undefined &&
    // It's not a combobox popup, which commonly has keyboard focus added
    isComboboxPopup(virtualNode) === false &&
    // And there's something actually worth scrolling to
    isNonEmptyElementOutsideViewableRect(virtualNode)
  );
}

function isNonEmptyElementOutsideViewableRect(vNode) {
  const boundingRect = vNode.boundingClientRect;

  return querySelectorAll(vNode, '*').some(elm => {
    // (elm, noRecursion, ignoreAria)
    if (!hasContentVirtual(elm, true, true)) {
      return false;
    }

    let rects = [];
    if (hasChildTextNodes(elm)) {
      rects.push(...getContentRects(elm));
    } else {
      rects = [elm.boundingClientRect];
    }

    return rects.some(rect => {
      return (
        rect.left < boundingRect.left ||
        rect.right > boundingRect.right ||
        rect.top < boundingRect.top ||
        rect.bottom > boundingRect.bottom
      );
    });
  });
}

function getContentRects(vNode) {
  const range = document.createRange();
  range.selectNodeContents(vNode.actualNode);
  return Array.from(range.getClientRects());
}

import hasContentVirtual, {
  hasChildTextNodes
} from '../commons/dom/has-content-virtual';
import isComboboxPopup from '../commons/aria/is-combobox-popup';
import { querySelectorAll, getScroll } from '../core/utils';

// A scroll region this small can't show any content, such as the 1px box
// of a visually hidden (sr-only) element
const MAX_UNUSABLE_SIZE = 1;

export default function scrollableRegionFocusableMatches(node, virtualNode) {
  return (
    // The element scrolls
    getScroll(node, 13) !== undefined &&
    // It's big enough to show its content
    node.clientWidth > MAX_UNUSABLE_SIZE &&
    node.clientHeight > MAX_UNUSABLE_SIZE &&
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

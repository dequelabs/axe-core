import hasContentVirtual from '../commons/dom/has-content-virtual';
import isComboboxPopup from '../commons/aria/is-combobox-popup';
import sanitize from '../commons/text/sanitize';
import { querySelectorAll, getScroll } from '../core/utils';

const buffer = 13;

export default function scrollableRegionFocusableMatches(node, virtualNode) {
  const boundingRect = virtualNode.boundingClientRect;
  return (
    // The element scrolls
    getScroll(node, buffer) !== undefined &&
    // It's not a combobox popup, which commonly has keyboard focus added
    isComboboxPopup(virtualNode) === false &&
    // And there's something actually worth scrolling to
    hasScrollableContent(node, virtualNode, boundingRect)
  );
}

function hasScrollableContent(node, virtualNode, boundingRect) {
  return querySelectorAll(virtualNode, '*').some(vNode => {
    const hasContent = hasContentVirtual(vNode, true, true);
    if (!hasContent) {
      return false;
    }

    return getChildTextRects(vNode).some(
      rect =>
        // part or all of the element is outside the scroll area
        rect.left - boundingRect.left + rect.width >
          node.clientWidth + buffer ||
        rect.top - boundingRect.top + rect.height > node.clientHeight + buffer
    );
  });
}

function getChildTextRects(vNode) {
  const boundingRect = vNode.boundingClientRect;
  const clientRects = [];

  vNode.actualNode.childNodes.forEach(textNode => {
    if (textNode.nodeType !== 3 || sanitize(textNode.nodeValue) === '') {
      return;
    }

    clientRects.push(...getContentRects(textNode));
  });

  return clientRects.length ? clientRects : [boundingRect];
}

function getContentRects(node) {
  const range = document.createRange();
  range.selectNodeContents(node);
  return Array.from(range.getClientRects());
}

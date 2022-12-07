import { getNodeFromTree, memoize } from '../../core/utils';
import { sanitize } from '../text';
import { getRectCenter, isPointInRect, getIntersectionRect } from '../math';
import getOverflowHiddenAncestors from './get-overflow-hidden-ancestors';

/**
 * Get the visible text client rects of a node.
 * @method getVisibleChildTextRects
 * @memberof axe.commons.dom
 * @instance
 * @param {Element} node
 */
const getVisibleChildTextRects = memoize(
  function getVisibleChildTextRectsMemoized(node) {
    const vNode = getNodeFromTree(node);
    const nodeRect = vNode.boundingClientRect;
    const clientRects = [];
    const overflowHiddenNodes = getOverflowHiddenAncestors(vNode);

    Array.from(node.childNodes).forEach(elm => {
      if (elm.nodeType !== 3 || sanitize(elm.textContent) === '') {
        return;
      }

      const contentRects = getContentRects(elm);
      if (isOutsideNodeBounds(contentRects, nodeRect)) {
        return;
      }

      contentRects.forEach(contentRect => {
        // filter out 0 width and height rects (newline characters)
        // ie11 has newline characters return 0.00998, so we'll say if the
        // line is < 1 it shouldn't be counted
        if (contentRect.width < 1 || contentRect.height < 1) {
          return;
        }

        // update rect size to take into account overflow hidden ancestors
        contentRect = overflowHiddenNodes.reduce(
          (rect, overflowNode) =>
            rect && getIntersectionRect(rect, overflowNode.boundingClientRect),
          contentRect
        );

        if (contentRect) {
          clientRects.push(contentRect);
        }
      });
    });

    return clientRects;
  }
);
export default getVisibleChildTextRects;

function getContentRects(node) {
  const range = document.createRange();
  range.selectNodeContents(node);
  return Array.from(range.getClientRects());
}

/**
 * if any text rect is larger than the bounds of the parent,
 * or goes outside of the bounds of the parent, we need to use
 * the parent rect so we stay within the bounds of the element.
 *
 * since we use the midpoint of the element when determining
 * the rect stack we will also use the midpoint of the text rect
 * to determine out of bounds.
 *
 * @see https://github.com/dequelabs/axe-core/issues/2178
 * @see https://github.com/dequelabs/axe-core/issues/2483
 * @see https://github.com/dequelabs/axe-core/issues/2681
 */
function isOutsideNodeBounds(rects, nodeRect) {
  return rects.some(rect => {
    const centerPoint = getRectCenter(rect);
    return !isPointInRect(centerPoint, nodeRect);
  });
}

import { getNodeFromTree } from '../../core/utils';
import { sanitize } from '../text';
import { getRectCenter, isPointInRect, getIntersectionRect } from '../math';
import getOverflowHiddenAncestors from './get-overflow-hidden-ancestors';

/**
 * Get the visible text client rects of a node.
 * @method getVisibleTextRects
 * @memberof axe.commons.dom
 * @instance
 * @param {Element} node
 */
export default function getVisibleTextRects(node) {
  const vNode = getNodeFromTree(node);
  const nodeRect = vNode.boundingClientRect;
  const clientRects = [];

  Array.from(node.childNodes).forEach(elm => {
    if (elm.nodeType !== 3 || sanitize(elm.textContent) === '') {
      return;
    }

    const range = document.createRange();
    range.selectNodeContents(elm);
    const rects = Array.from(range.getClientRects());

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
    const outsideRectBounds = rects.some(rect => {
      const centerPoint = getRectCenter(rect);
      return !isPointInRect(centerPoint, nodeRect);
    });
    if (outsideRectBounds) {
      return;
    }

    const overflowHiddenNodes = getOverflowHiddenAncestors(vNode);
    rects.forEach(rect => {
      // filter out 0 width and height rects (newline characters)
      // ie11 has newline characters return 0.00998, so we'll say if the
      // line is < 1 it shouldn't be counted
      if (rect.width < 1 || rect.height < 1) {
        return;
      }

      // update rect size to take into account
      // overflow hidden ancestors
      rect = overflowHiddenNodes.reduce((rect, overflowNode) => (
        rect && getIntersectionRect(rect, overflowNode.boundingClientRect)
      ), rect)

      if (rect) {
        clientRects.push(rect);
      }
    });
  });

  return clientRects;
}

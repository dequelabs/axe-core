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
function getVisibleChildTextRects(node) {
  return getVisibleChildTextRectsVirtual(getNodeFromTree(node));
}

const getVisibleChildTextRectsVirtual = memoize(
  function getVisibleChildTextRectsMemoized(vNode) {
    const node = vNode.actualNode;
    const nodeRect = vNode.boundingClientRect;
    const clientRects = [];
    const overflowHiddenNodes = getOverflowHiddenAncestors(vNode);

    node.childNodes.forEach(textNode => {
      if (textNode.nodeType !== 3 || sanitize(textNode.nodeValue) === '') {
        return;
      }

      const contentRects = getContentRects(textNode, vNode);
      if (isOutsideNodeBounds(contentRects, nodeRect)) {
        return;
      }

      clientRects.push(...filterHiddenRects(contentRects, overflowHiddenNodes));
    });

    /**
     * if all text rects are larger than the bounds of the node,
     * or goes outside of the bounds of the node, we need to use
     * the nodes bounding rect so we stay within the bounds of the
     * element.
     *
     * @see https://github.com/dequelabs/axe-core/issues/2178
     * @see https://github.com/dequelabs/axe-core/issues/2483
     * @see https://github.com/dequelabs/axe-core/issues/2681
     *
     * also need to resize the nodeRect to fit within the bounds of any overflow: hidden ancestors.
     *
     * @see https://github.com/dequelabs/axe-core/issues/4253
     */
    return clientRects.length
      ? clientRects
      : filterHiddenRects([nodeRect], overflowHiddenNodes);
  },
  { primitive: true }
);
export default getVisibleChildTextRects;

function getContentRects(node, vNode) {
  const range = document.createRange();
  range.selectNodeContents(node);
  const contentRects = Array.from(range.getClientRects());
  if (contentRects.length < 2 || !preservesWhiteSpace(vNode)) {
    return contentRects;
  }

  const whiteSpaceRects = getWhiteSpaceRects(node);
  return contentRects.filter(
    contentRect => !whiteSpaceRects.some(rect => isSameRect(rect, contentRect))
  );
}

/**
 * Check if white space of the node's text is preserved, which lets a
 * line break leave a rect that holds only white space (such as the
 * space that "hangs" at the end of a wrapped `pre-wrap` line).
 *
 * @see https://github.com/dequelabs/axe-core/issues/5128
 */
function preservesWhiteSpace(vNode) {
  const whiteSpace = vNode.getComputedStylePropertyValue('white-space');
  return ['pre', 'pre-wrap', 'break-spaces'].includes(whiteSpace);
}

/**
 * Get the client rects of every run of white space in a text node.
 */
function getWhiteSpaceRects(node) {
  const whiteSpaceRects = [];
  const range = document.createRange();
  for (const match of node.nodeValue.matchAll(/\s+/g)) {
    range.setStart(node, match.index);
    range.setEnd(node, match.index + match[0].length);
    whiteSpaceRects.push(...range.getClientRects());
  }
  return whiteSpaceRects;
}

function isSameRect(rectA, rectB) {
  return ['left', 'top', 'width', 'height'].every(
    prop => Math.abs(rectA[prop] - rectB[prop]) < 0.5
  );
}

/**
 * Check to see if the text rect size is outside the of the
 * nodes bounding rect. Since we use the midpoint of the element
 * when determining the rect stack we will also use the midpoint
 * of the text rect to determine out of bounds
 */
function isOutsideNodeBounds(rects, nodeRect) {
  return rects.some(rect => {
    const centerPoint = getRectCenter(rect);
    return !isPointInRect(centerPoint, nodeRect);
  });
}

/**
 * Filter out 0 width and height rects (newline characters) and
 * any rects that are outside the bounds of overflow hidden
 * ancestors
 */
function filterHiddenRects(contentRects, overflowHiddenNodes) {
  const visibleRects = [];
  contentRects.forEach(contentRect => {
    // ie11 has newline characters return 0.00998, so we'll say if the
    // line is < 1 it shouldn't be counted
    if (contentRect.width < 1 || contentRect.height < 1) {
      return;
    }

    // update the rect size to fit inside the bounds of all overflow
    // hidden ancestors
    const visibleRect = overflowHiddenNodes.reduce((rect, overflowNode) => {
      return rect && getIntersectionRect(rect, overflowNode.boundingClientRect);
    }, contentRect);

    if (visibleRect) {
      visibleRects.push(visibleRect);
    }
  });

  return visibleRects;
}

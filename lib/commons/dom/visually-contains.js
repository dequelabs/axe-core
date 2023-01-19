import { getNodeFromTree, getScroll } from '../../core/utils';

/**
 * Checks whether a parent element visually contains its child, either directly or via scrolling.
 * Assumes that |parent| is an ancestor of |node|.
 * @deprecated
 * @method visuallyContains
 * @memberof axe.commons.dom
 * @instance
 * @param {Element} node
 * @param {Element} parent
 * @return {boolean} True if node is visually contained within parent
 */
export default function visuallyContains(node, parent) {
  const parentScrollAncestor = getScrollAncestor(parent);

  // if the elements share a common scroll parent, we can check if the
  // parent visually contains the node. otherwise we need to check each
  // scroll parent in between the node and the parent since if the
  // element is off screen due to the scroll, it won't be visually contained
  // by the parent
  do {
    const nextScrollAncestor = getScrollAncestor(node);

    if (
      nextScrollAncestor === parentScrollAncestor ||
      nextScrollAncestor === parent
    ) {
      return contains(node, parent);
    }

    node = nextScrollAncestor;
  } while (node);

  return false;
}

/**
 * Return the ancestor node that is a scroll region.
 * @param {VirtualNode}
 * @return {VirtualNode|null}
 */
function getScrollAncestor(node) {
  const vNode = getNodeFromTree(node);
  let ancestor = vNode.parent;

  while (ancestor) {
    if (getScroll(ancestor.actualNode)) {
      return ancestor.actualNode;
    }

    ancestor = ancestor.parent;
  }
}

/**
 * Checks whether a parent element fully contains its child, either directly or via scrolling.
 * Assumes that |parent| is an ancestor of |node|.
 * @param {Element} node
 * @param {Element} parent
 * @return {boolean} True if node is visually contained within parent
 */
function contains(node, parent) {
  const style = window.getComputedStyle(parent);
  const overflow = style.getPropertyValue('overflow');

  // if parent element is inline, scrollArea will be too unpredictable
  if (style.getPropertyValue('display') === 'inline') {
    return true;
  }

  // use clientRects instead of boundingClientRect to account
  // for truncation of text (one of the rects will be the size
  // of the truncation)
  // @see https://github.com/dequelabs/axe-core/issues/2669
  const clientRects = Array.from(node.getClientRects());
  // getBoundingClientRect prevents overrides of left/top
  // (also can't destructure)
  const boundingRect = parent.getBoundingClientRect();
  const rect = {
    left: boundingRect.left,
    top: boundingRect.top,
    width: boundingRect.width,
    height: boundingRect.height
  };

  if (
    ['scroll', 'auto'].includes(overflow) ||
    parent instanceof window.HTMLHtmlElement
  ) {
    rect.width = parent.scrollWidth;
    rect.height = parent.scrollHeight;
  }

  // in Chrome text truncation on the parent will cause the
  // child to have multiple client rects (one for the bounding
  // rect of the element and one more for the bounding rect of
  // the truncation). however this doesn't happen for other
  // browsers so we'll make it so that if we detect text
  // truncation and there's only one client rect, we'll use
  // the bounding rect of the parent as the client rect of
  // the child
  if (
    clientRects.length === 1 &&
    overflow === 'hidden' &&
    style.getPropertyValue('white-space') === 'nowrap'
  ) {
    clientRects[0] = rect;
  }

  // check if any client rect is fully inside the parent rect
  // @see https://gist.github.com/Daniel-Hug/d7984d82b58d6d2679a087d896ca3d2b
  return clientRects.some(
    clientRect =>
      !(
        Math.ceil(clientRect.left) < Math.floor(rect.left) ||
        Math.ceil(clientRect.top) < Math.floor(rect.top) ||
        Math.floor(clientRect.left + clientRect.width) >
          Math.ceil(rect.left + rect.width) ||
        Math.floor(clientRect.top + clientRect.height) >
          Math.ceil(rect.top + rect.height)
      )
  );
}

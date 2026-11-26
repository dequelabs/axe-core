import getComposedParent from './get-composed-parent';
import getElementCoordinates from './get-element-coordinates';
import getViewportSize from './get-viewport-size';
import { nodeLookup, getScroll } from '../../core/utils';
import isFixedPosition from './is-fixed-position';

function noParentScrolled(element, offset) {
  element = getComposedParent(element);
  while (element && element.nodeName.toLowerCase() !== 'html') {
    if (element.scrollTop) {
      offset += element.scrollTop;
      if (offset >= 0) {
        return false;
      }
    }
    element = getComposedParent(element);
  }
  return true;
}

/**
 * Return the nearest scroll region between an element in a position: fixed
 * subtree and its fixed ancestor (including that ancestor). The element can be
 * scrolled into view inside that region even if it is outside the viewport.
 * @param {VirtualNode} vNode
 * @return {VirtualNode|undefined}
 */
function getFixedScrollRegion(vNode) {
  if (isFixedPosition(vNode, { skipAncestors: true })) {
    return;
  }
  let ancestor = vNode.parent;
  while (ancestor) {
    if (getScroll(ancestor.actualNode)) {
      return ancestor;
    }
    if (isFixedPosition(ancestor, { skipAncestors: true })) {
      return;
    }
    ancestor = ancestor.parent;
  }
}

/**
 * Determines if element is off screen
 * @method isOffscreen
 * @memberof axe.commons.dom
 * @instance
 * @param  {Element} element
 * @param {Object} [options]
 * @param {Boolean} [options.isAncestor] If this function is being called on an ancestor of the target node
 * @return {Boolean|undefined}
 */
function isOffscreen(element, { isAncestor } = {}) {
  if (isAncestor) {
    return false;
  }

  const { vNode, domNode } = nodeLookup(element);
  if (!domNode) {
    return undefined;
  }

  const docElement = document.documentElement;
  const styl = window.getComputedStyle(domNode);
  const dir = window
    .getComputedStyle(document.body || docElement)
    .getPropertyValue('direction');
  const isFixed = isFixedPosition(domNode);
  // an element in a scroll region of a fixed element can be scrolled into
  // view, unless the scroll region itself is offscreen, so it is checked
  // like an element that is not fixed
  // (@see https://github.com/dequelabs/axe-core/issues/5183)
  const fixedScrollRegion = isFixed && vNode && getFixedScrollRegion(vNode);
  if (fixedScrollRegion && isOffscreen(fixedScrollRegion)) {
    return true;
  }
  const preventsScrolling = isFixed && !fixedScrollRegion;
  const coords = isFixed
    ? domNode.getBoundingClientRect()
    : getElementCoordinates(domNode);

  // Consider 0 height/ width elements at origin visible
  if (coords.top === 0 && coords.bottom === 0) {
    return false;
  }
  if (coords.left === 0 && coords.right === 0) {
    return false;
  }

  if (
    coords.bottom <= 0 &&
    (noParentScrolled(domNode, coords.bottom) || styl.position === 'absolute')
  ) {
    return true;
  }

  const viewportSize = getViewportSize(window);
  if (preventsScrolling && coords.top >= viewportSize.height) {
    return true; // Positioned below the viewport
  }

  const rightEdge = Math.max(docElement.scrollWidth, viewportSize.width);
  if ((preventsScrolling || dir === 'rtl') && coords.left >= rightEdge) {
    return true; // Positioned right of the viewport, preventing right scrolling
  }

  if ((preventsScrolling || dir === 'ltr') && coords.right <= 0) {
    return true; // Positioned left of the viewport, preventing left scrolling
  }

  return false;
}

export default isOffscreen;

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
  const isFixed = isViewportAnchored(vNode);
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
  if (isFixed && coords.top >= viewportSize.height) {
    return true; // Positioned below the viewport
  }

  const rightEdge = Math.max(docElement.scrollWidth, viewportSize.width);
  if ((isFixed || dir === 'rtl') && coords.left >= rightEdge) {
    return true; // Positioned right of the viewport, preventing right scrolling
  }

  if ((isFixed || dir === 'ltr') && coords.right <= 0) {
    return true; // Positioned left of the viewport, preventing left scrolling
  }

  return false;
}

export default isOffscreen;

/**
 * Whether the element stays at one place in the viewport: it is position: fixed,
 * or it has a position: fixed ancestor and no scrollable ancestor (see getScroll)
 * on the way up to it, that ancestor included.
 * @param {VirtualNode|null|undefined} vNode
 * @return {Boolean}
 */
function isViewportAnchored(vNode) {
  if (!isFixedPosition(vNode)) {
    return false;
  }
  let node = vNode;
  while (!isFixedPosition(node, { skipAncestors: true })) {
    node = node.parent;
    if (getScroll(node.actualNode)) {
      return false;
    }
  }
  return true;
}

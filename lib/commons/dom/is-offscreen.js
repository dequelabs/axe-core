import getComposedParent from './get-composed-parent';
import getElementCoordinates from './get-element-coordinates';
import getViewportSize from './get-viewport-size';
import { nodeLookup } from '../../core/utils';
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

  const { domNode } = nodeLookup(element);
  if (!domNode) {
    return undefined;
  }

  const docElement = document.documentElement;
  const styl = window.getComputedStyle(domNode);
  const dir = window
    .getComputedStyle(document.body || docElement)
    .getPropertyValue('direction');
  const isFixed = isFixedPosition(domNode);
  const coords = isFixed
    ? domNode.getBoundingClientRect()
    : getElementCoordinates(domNode);

  if (coords.left === 0 && coords.right === 0) {
    //This is an edge case, an empty (zero-width) element that isn't positioned 'off screen'.
    return false;
  }

  if (
    coords.bottom <= 0 &&
    (noParentScrolled(domNode, coords.bottom) || styl.position === 'absolute')
  ) {
    return true;
  }

  if (isFixed && coords.top >= window.innerHeight) {
    return true; // Fixed above the viewport
  }

  if (isFixed && coords.left >= window.innerWidth) {
    return true; // Fixed right of the viewport
  }

  if (dir === 'ltr') {
    return coords.right <= 0;
  } else {
    const rightEdge = Math.max(
      docElement.scrollWidth,
      getViewportSize(window).width
    );
    return coords.left >= rightEdge;
  }
}

export default isOffscreen;

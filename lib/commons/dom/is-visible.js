import getRootNode from './get-root-node';
import isOffscreen from './is-offscreen';
import findUp from './find-up';
import {
  getScroll,
  getNodeFromTree,
  querySelectorAll,
  escapeSelector
} from '../../core/utils';
import AbstractVirtualNode from '../../core/base/virtual-node/abstract-virtual-node';

const clipRegex = /rect\s*\(([0-9]+)px,?\s*([0-9]+)px,?\s*([0-9]+)px,?\s*([0-9]+)px\s*\)/;
const clipPathRegex = /(\w+)\((\d+)/;

/**
 * Determine whether an element is visible
 * @method isVisible
 * @memberof axe.commons.dom
 * @instance
 * @param {HTMLElement} el The HTMLElement
 * @param {Boolean} screenReader When provided, will evaluate visibility from the perspective of a screen reader
 * @param {Boolean} recursed
 * @return {Boolean} The element's visibilty status
 */
export default function isVisible(el, screenReader, recursed) {
  if (!el) {
    throw new TypeError(
      'Cannot determine if element is visible for non-DOM nodes'
    );
  }

  const vNode = el instanceof AbstractVirtualNode ? el : getNodeFromTree(el);
  el = vNode ? vNode.actualNode : el;

  const cacheName = '_isVisible' + (screenReader ? 'ScreenReader' : '');
  const { DOCUMENT_NODE, DOCUMENT_FRAGMENT_NODE } = window.Node ?? {};
  const nodeType = vNode ? vNode.props.nodeType : el.nodeType;
  const nodeName = vNode ? vNode.props.nodeName : el.nodeName.toLowerCase();

  if (vNode && typeof vNode[cacheName] !== 'undefined') {
    return vNode[cacheName];
  }

  if (nodeType === DOCUMENT_NODE) {
    return true;
  }

  // always hidden
  if (elementHidden({ nodeName })) {
    return false;
  }

  if (el && nodeType === DOCUMENT_FRAGMENT_NODE) {
    el = el.host; // grab the host Node
  }

  // hidden from screen readers
  if (ariaHidden({ screenReader, el, vNode })) {
    return false;
  }

  // detatched virtual node
  if (!el) {
    const parent = vNode.parent;
    let visible = true;
    if (parent) {
      visible = isVisible(parent, screenReader, true);
    }

    if (vNode) {
      vNode[cacheName] = visible;
    }

    return visible;
  }

  const style = window.getComputedStyle(el, null);
  if (style === null) {
    return false;
  }

  // different ways to hide an element
  const hiddenMethods = [
    areaHidden,
    displayHidden,
    opacityHidden,
    clipHidden,
    scrollHidden,
    overflowHidden,
    visiblityHidden,
    offscreenHidden
  ];
  if (
    hiddenMethods.some(method =>
      method({
        el,
        nodeName,
        style,
        recursed,
        screenReader
      })
    )
  ) {
    return false;
  }

  const parent = el.assignedSlot ? el.assignedSlot : el.parentNode;
  let visible = false;
  if (parent) {
    visible = isVisible(parent, screenReader, true);
  }

  if (vNode) {
    vNode[cacheName] = visible;
  }

  return visible;
}

/**
 * Determine if an element is hidden by making the opacity 0
 */
function opacityHidden({ style, screenReader }) {
  return !screenReader && style.getPropertyValue('opacity') === '0';
}

/**
 * Determine if an element is hidden setting the display property
 */
function displayHidden({ style }) {
  return style.getPropertyValue('display') === 'none';
}

/**
 * Determine if an element is hidden by setting the visibility property
 */
function visiblityHidden({ style, recursed }) {
  // visibility cascades so we only need to check the first element
  return !recursed && style.getPropertyValue('visibility') === 'hidden';
}

/**
 * Determine if an element is hidden by setting aria-hidden
 */
function ariaHidden({ screenReader, el, vNode }) {
  const ariaHiddenValue = vNode
    ? vNode.attr('aria-hidden')
    : el.getAttribute('aria-hidden');
  return !!screenReader && ariaHiddenValue === 'true';
}

/**
 * Determine if an element is natively hidden
 */
function elementHidden({ nodeName }) {
  return ['style', 'script', 'noscript', 'template'].includes(nodeName);
}

/**
 * Determine if an element is hidden by using scroll and dimensions
 */
function scrollHidden({ el, style, screenReader }) {
  const scroll = getScroll(el);
  const elHeight = parseInt(style.getPropertyValue('height'));
  const elWidth = parseInt(style.getPropertyValue('width'));

  return !screenReader && !!scroll && (elHeight === 0 || elWidth === 0);
}

/**
 * Determine if an element is hidden by using overflow: hidden and dimensions
 */
function overflowHidden({ style, screenReader }) {
  const elHeight = parseInt(style.getPropertyValue('height'));
  const elWidth = parseInt(style.getPropertyValue('width'));

  return (
    !screenReader &&
    style.getPropertyValue('position') === 'absolute' &&
    (elHeight < 2 || elWidth < 2) &&
    style.getPropertyValue('overflow') === 'hidden'
  );
}

/**
 * Determine if an element is hidden by position offscreen
 */
function offscreenHidden({ el, recursed, screenReader }) {
  return !recursed && !screenReader && isOffscreen(el);
}

/**
 * Determine if an area element is hidden
 */
function areaHidden({ nodeName, el, screenReader, recursed }) {
  return nodeName === 'area' && !isAreaVisible(el, screenReader, recursed);
}

/**
 * Determines if an element is hidden with a clip or clip-path technique
 */
function clipHidden({ style, screenReader }) {
  if (screenReader) {
    return false;
  }

  const matchesClip = style.getPropertyValue('clip').match(clipRegex);
  const matchesClipPath = style
    .getPropertyValue('clip-path')
    .match(clipPathRegex);
  if (matchesClip && matchesClip.length === 5) {
    const position = style.getPropertyValue('position');
    // clip is only applied to absolutely positioned elements
    if (['fixed', 'absolute'].includes(position)) {
      return (
        matchesClip[3] - matchesClip[1] <= 0 &&
        matchesClip[2] - matchesClip[4] <= 0
      );
    }
  }
  if (matchesClipPath) {
    const type = matchesClipPath[1];
    const value = parseInt(matchesClipPath[2], 10);

    switch (type) {
      case 'inset':
        return value >= 50;
      case 'circle':
        return value === 0;
      default:
    }
  }

  return false;
}

/**
 * Check `AREA` element is visible
 * - validate if it is a child of `map`
 * - ensure `map` is referred by `img` using the `usemap` attribute
 * Note:
 * Firefox's user-agent always sets `AREA` element to `display:none`
 * hence excluding the edge case, for visibility computation
 * @param {Element} areaEl `AREA` element
 * @retruns {Boolean}
 */
function isAreaVisible(el, screenReader, recursed) {
  /**
   * Note:
   * - Verified that `map` element cannot refer to `area` elements across different document trees
   * - Verified that `map` element does not get affected by altering `display` property
   */
  const mapEl = findUp(el, 'map');
  if (!mapEl) {
    return false;
  }

  const mapElName = mapEl.getAttribute('name');
  if (!mapElName) {
    return false;
  }

  /**
   * `map` element has to be in light DOM
   */
  const mapElRootNode = getRootNode(el);
  if (!mapElRootNode || mapElRootNode.nodeType !== 9) {
    return false;
  }

  const refs = querySelectorAll(
    // TODO: es-module-_tree
    axe._tree,
    `img[usemap="#${escapeSelector(mapElName)}"]`
  );
  if (!refs || !refs.length) {
    return false;
  }

  return refs.some(({ actualNode }) =>
    isVisible(actualNode, screenReader, recursed)
  );
}

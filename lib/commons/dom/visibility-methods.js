import {
  getScroll,
  closest,
  getRootNode,
  querySelectorAll,
  escapeSelector
} from '../../core/utils';
import rectsOverlap from '../math/rects-overlap';
import getOverflowHiddenAncestors from './get-overflow-hidden-ancestors';

const clipRegex =
  /rect\s*\(([0-9]+)px,?\s*([0-9]+)px,?\s*([0-9]+)px,?\s*([0-9]+)px\s*\)/;
const clipPathRegex = /(\w+)\((\d+)/;

/**
 * Determine if an element is natively hidden
 * @param {VirtualNode} vNode
 * @return {Boolean}
 */
export function nativelyHidden(vNode) {
  return ['style', 'script', 'noscript', 'template'].includes(
    vNode.props.nodeName
  );
}

/**
 * Determine if an element is hidden using the display property
 * @param {VirtualNode} vNode
 * @return {Boolean}
 */
export function displayHidden(vNode) {
  // Firefox's user-agent always sets `area` element
  // to `display:none` so we can't rely on it to
  // check for hidden
  if (vNode.props.nodeName === 'area') {
    return false;
  }

  return vNode.getComputedStylePropertyValue('display') === 'none';
}

/**
 * Determine if an element is hidden using the visibility property. Visibility is only applicable for the node itself (and not any ancestors)
 * @param {VirtualNode} vNode
 * @param {Object} [options]
 * @param {Boolean} [options.isAncestor] If this function is being called on an ancestor for the target node
 * @return {Boolean}
 */
export function visibilityHidden(vNode, { isAncestor } = {}) {
  // because the parent can be hidden, and the child visible we
  // have to ignore visibility on ancestors. we don't need to look
  // at the parent either, because visibility inherits
  return (
    !isAncestor &&
    ['hidden', 'collapse'].includes(
      vNode.getComputedStylePropertyValue('visibility')
    )
  );
}

/**
 * Determine if an element is hidden using the content-visibility property
 * @param {VirtualNode} vNode
 * @return {Boolean}
 */
export function contentVisibiltyHidden(vNode, { isAncestor } = {}) {
  // content-visibility only applies to descendants
  // and does not hide the node with the property
  return (
    !!isAncestor &&
    vNode.getComputedStylePropertyValue('content-visibility') === 'hidden'
  );
}

/**
 * Determine if an element is hidden using the aria-hidden attribute
 * @param {VirtualNode} vNode
 * @return {Boolean}
 */
export function ariaHidden(vNode) {
  return vNode.attr('aria-hidden') === 'true';
}

/**
 * Determine if an element is hidden by making the opacity 0
 * @param {VirtualNode} vNode
 * @return {Boolean}
 */
export function opacityHidden(vNode) {
  return vNode.getComputedStylePropertyValue('opacity') === '0';
}

/**
 * Determine if an element is hidden by using scroll and dimensions
 * @param {VirtualNode} vNode
 * @return {Boolean}
 */
export function scrollHidden(vNode) {
  const scroll = getScroll(vNode.actualNode);
  const elHeight = parseInt(vNode.getComputedStylePropertyValue('height'));
  const elWidth = parseInt(vNode.getComputedStylePropertyValue('width'));

  return !!scroll && (elHeight === 0 || elWidth === 0);
}

/**
 * Determine if an element is hidden by using overflow: hidden.
 * @param {VirtualNode} vNode
 * @return {Boolean}
 */
export function overflowHidden(vNode, { isAncestor } = {}) {
  // an ancestor that is hidden outside an overflow
  // does not mean that a descendant is also hidden
  // since the descendant can reposition itself to be
  // in view of the overflow:hidden ancestor
  if (isAncestor) {
    return false;
  }

  const rect = vNode.boundingClientRect;
  const nodes = getOverflowHiddenAncestors(vNode);

  if (!nodes.length) {
    return false;
  }

  return nodes.some(node => {
    const nodeRect = node.boundingClientRect;

    if (nodeRect.width < 2 || nodeRect.height < 2) {
      return true;
    }

    return !rectsOverlap(rect, nodeRect);
  });
}

/**
 * Determines if an element is hidden with a clip or clip-path technique
 * @param {VirtualNode} vNode
 * @return {Boolean}
 */
export function clipHidden(vNode) {
  const matchesClip = vNode
    .getComputedStylePropertyValue('clip')
    .match(clipRegex);
  const matchesClipPath = vNode
    .getComputedStylePropertyValue('clip-path')
    .match(clipPathRegex);
  if (matchesClip && matchesClip.length === 5) {
    const position = vNode.getComputedStylePropertyValue('position');
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
 * Check `AREA` element is hidden
 * - validate if it is a child of `map`
 * - ensure `map` is referred by `img` using the `usemap` attribute
 * @param {VirtualNode} vNode
 * @param {Function} visibleFunction Function used to check if the image element is visible
 * @retruns {Boolean}
 */
export function areaHidden(vNode, visibleFunction) {
  /**
   * Note:
   * - Verified that `map` element cannot refer to `area` elements across different document trees
   * - Verified that `map` element does not get affected by altering `display` property
   */
  const mapEl = closest(vNode, 'map');
  if (!mapEl) {
    return true;
  }

  const mapElName = mapEl.attr('name');
  if (!mapElName) {
    return true;
  }

  /**
   * `map` element has to be in light DOM
   */
  const mapElRootNode = getRootNode(vNode.actualNode);
  if (!mapElRootNode || mapElRootNode.nodeType !== 9) {
    return true;
  }

  const refs = querySelectorAll(
    // TODO: es-module-_tree
    axe._tree,
    `img[usemap="#${escapeSelector(mapElName)}"]`
  );
  if (!refs || !refs.length) {
    return true;
  }

  return refs.some(ref => !visibleFunction(ref));
}

/**
 * Determine if element inside `details` is hidden
 */
export function detailsHidden(vNode) {
  if (vNode.parent?.props.nodeName !== 'details') {
    return false;
  }

  // first summary element is never hidden (subsequent ones are though)
  if (vNode.props.nodeName === 'summary') {
    const firstSummary = vNode.parent.children.find(
      node => node.props.nodeName === 'summary'
    );

    if (firstSummary === vNode) {
      return false;
    }
  }

  return !vNode.parent.hasAttr('open');
}

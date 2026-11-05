import rectsOverlap from '../math/rects-overlap';

const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';

// Elements that render text inside an SVG. Their painted colour comes from
// `fill`, not from `color`.
const TEXT_NODE_NAMES = ['text', 'tspan', 'textpath'];

// Elements inside an SVG that paint something. `use` and `image` are included
// because what they paint cannot be read from their own geometry.
const SHAPE_NODE_NAMES = [
  'circle',
  'ellipse',
  'image',
  'line',
  'path',
  'polygon',
  'polyline',
  'rect',
  'use'
];

/**
 * Whether an element renders text inside an SVG.
 * @method isSvgTextNode
 * @memberof axe.commons.color
 * @private
 * @param {Element} node
 * @return {Boolean}
 */
export function isSvgTextNode(node) {
  return (
    node?.namespaceURI === SVG_NAMESPACE &&
    TEXT_NODE_NAMES.includes(node.nodeName.toLowerCase())
  );
}

/**
 * The `<svg>` an element is rendered in, or null when it is not in one.
 * @param {Element} node
 * @return {Element|null}
 */
function getOwnerSvg(node) {
  // ownerSVGElement is null on the outermost <svg>, which cannot be text.
  return node.ownerSVGElement ?? null;
}

/**
 * Whether a shape paints anything at all. A shape with no fill and no stroke
 * is in the tree but invisible, so it cannot sit behind the text.
 * @param {Element} shape
 * @return {Boolean}
 */
function isPainted(shape) {
  const style = window.getComputedStyle(shape);
  if (style.getPropertyValue('display') === 'none') {
    return false;
  }
  if (style.getPropertyValue('visibility') === 'hidden') {
    return false;
  }
  if (parseFloat(style.getPropertyValue('opacity')) === 0) {
    return false;
  }

  const fill = style.getPropertyValue('fill');
  const hasFill =
    fill &&
    fill !== 'none' &&
    parseFloat(style.getPropertyValue('fill-opacity')) !== 0;
  if (hasFill) {
    return true;
  }

  const stroke = style.getPropertyValue('stroke');
  return (
    !!stroke &&
    stroke !== 'none' &&
    parseFloat(style.getPropertyValue('stroke-width')) !== 0 &&
    parseFloat(style.getPropertyValue('stroke-opacity')) !== 0
  );
}

/**
 * Describe what sits behind a text node inside an SVG.
 *
 * Returns null for anything that is not SVG text. Otherwise it reports the
 * `<svg>` the text belongs to, and whether any painted shape in that `<svg>`
 * overlaps the text. Overlap is deliberately answered from bounding boxes
 * only: a path's geometry can be any shape, so a box that intersects does not
 * prove a pixel does. That is why an overlap produces an incomplete result
 * rather than a colour.
 *
 * @method getSvgTextBackdrop
 * @memberof axe.commons.color
 * @private
 * @param {Element} node
 * @return {{svg: Element, overlaps: Boolean}|null}
 */
export function getSvgTextBackdrop(node) {
  if (!isSvgTextNode(node)) {
    return null;
  }

  const svg = getOwnerSvg(node);
  if (!svg) {
    return null;
  }

  const textRect = node.getBoundingClientRect();
  const shapes = svg.querySelectorAll(SHAPE_NODE_NAMES.join(','));

  for (const shape of shapes) {
    // A shape the text is inside of, such as a <use> that renders it, is not
    // behind it.
    if (shape.contains(node)) {
      continue;
    }
    if (!rectsOverlap(textRect, shape.getBoundingClientRect())) {
      continue;
    }
    if (isPainted(shape)) {
      return { svg, overlaps: true };
    }
  }

  return { svg, overlaps: false };
}

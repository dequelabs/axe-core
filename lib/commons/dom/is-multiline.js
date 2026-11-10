import getComposedParent from './get-composed-parent';

/**
 * Returns true if content has client rects that are rendered on different "lines".
 *
 * A rect that starts below the bottom of the rects before it is on a new line.
 * When the line-height is smaller than the text, the rects of neighbouring
 * lines overlap instead, see hasOverlappingLines.
 * @param {Element} domNode
 * @param {number} margin Rects this height or smaller are ignored (default: 2)
 * @returns {boolean}
 */
export default function isMultiline(domNode, margin = 2) {
  const range = domNode.ownerDocument.createRange();
  range.setStart(domNode, 0);
  range.setEnd(domNode, domNode.childNodes.length);
  const rects = Array.from(range.getClientRects());
  if (hasLineBelow(rects, margin)) {
    return true;
  }
  if (!hasOverlappingLines(domNode, rects, margin)) {
    return false;
  }
  // Rects that overlap can also come from content that is not on the lines
  // of the text, such as a label positioned just above it
  const lineRects = getLineRects(domNode, rects);
  if (lineRects === rects) {
    return true;
  }
  return (
    hasLineBelow(lineRects, margin) ||
    hasOverlappingLines(domNode, lineRects, margin)
  );
}

/**
 * @param {DOMRect[]} rects
 * @param {number} margin
 * @returns {boolean} Whether a rect starts below the bottom of the rects before it
 */
function hasLineBelow(rects, margin) {
  let lastLineEnd = 0;
  let lineCount = 0;
  for (const rect of rects) {
    if (rect.height <= margin) {
      continue;
    }
    if (lastLineEnd > rect.top + margin) {
      lastLineEnd = Math.max(lastLineEnd, rect.bottom);
    } else if (lineCount === 0) {
      lastLineEnd = rect.bottom;
      lineCount++;
    } else {
      return true;
    }
  }
  return false;
}

/**
 * Text in the same font has rects of the same height. On the next line they
 * start over from the start of the line and are a line-height lower, and when
 * the line-height is smaller than the text they still overlap. Content further
 * along the same line, or moved by less than a line-height, such as
 * superscripts, icons or relative positioning, stays on its line.
 * @param {Element} domNode
 * @param {DOMRect[]} rects
 * @param {number} margin
 * @returns {boolean}
 */
function hasOverlappingLines(domNode, rects, margin) {
  const lineHeight = getLineHeight(domNode);
  if (!Number.isFinite(lineHeight)) {
    return false;
  }
  const isRtl = window.getComputedStyle(domNode).direction === 'rtl';
  const firstRects = [];
  for (const rect of rects) {
    if (rect.height <= margin) {
      continue;
    }
    const firstRect = firstRects.find(
      ({ height }) => Math.abs(height - rect.height) < 1
    );
    if (!firstRect) {
      firstRects.push(rect);
      continue;
    }
    // An empty rect, such as a new line at the end of pre-wrap text, is not text
    const isEmpty = rect.width < 1;
    // Content on the same line follows the first rect, a new line starts over
    const isWrapped = isRtl
      ? rect.right > firstRect.left + 1
      : rect.left < firstRect.right - 1;
    const shift = rect.top - firstRect.top;
    if (
      !isEmpty &&
      isWrapped &&
      shift >= 0.95 * lineHeight &&
      rect.top < firstRect.bottom
    ) {
      return true;
    }
  }
  return false;
}

// How far content is from the lines of the text it is in
const LAYOUTS = ['line', 'atomic', 'out-of-flow'];

/**
 * The rects of the content that is laid out on the lines of the element: the
 * rects without content taken out of the flow (floats, absolute and fixed
 * positioning), and without the text of inline-blocks and other atomic
 * inlines, which is laid out on lines of its own. Their boxes stay. Returns
 * the same array when there is no such content.
 * @param {Element} domNode
 * @param {DOMRect[]} rects
 * @returns {DOMRect[]}
 */
function getLineRects(domNode, rects) {
  const layouts = new Map([[domNode, 'line']]);
  const getLayout = element => {
    if (!element) {
      return 'line';
    }
    if (!layouts.has(element)) {
      // Content is laid out like the element it is in, or like an element
      // around that one, whichever is further from the lines of the text
      const parentLayout = getLayout(getComposedParent(element));
      const rank = Math.max(
        LAYOUTS.indexOf(parentLayout),
        LAYOUTS.indexOf(getOwnLayout(element))
      );
      layouts.set(element, LAYOUTS[rank]);
    }
    return layouts.get(element);
  };

  const otherRects = [];
  // A range gives the boxes of the elements directly in it
  for (const child of domNode.children) {
    if (getLayout(child) === 'out-of-flow') {
      otherRects.push(...child.getClientRects());
    }
  }
  const range = domNode.ownerDocument.createRange();
  const walker = domNode.ownerDocument.createTreeWalker(
    domNode,
    window.NodeFilter.SHOW_TEXT
  );
  for (let text = walker.nextNode(); text; text = walker.nextNode()) {
    if (getLayout(text.parentNode) !== 'line') {
      range.selectNodeContents(text);
      otherRects.push(...range.getClientRects());
    }
  }
  if (otherRects.length === 0) {
    return rects;
  }
  return rects.filter(
    rect => !otherRects.some(otherRect => isSameRect(rect, otherRect))
  );
}

/**
 * @param {Element} element
 * @returns {string} "out-of-flow", "atomic" for an inline-block or other
 *   atomic inline, or "line" for content on the lines it is in
 */
function getOwnLayout(element) {
  const style = window.getComputedStyle(element);
  const display = style.getPropertyValue('display');
  if (display === 'contents') {
    return 'line';
  }
  if (['absolute', 'fixed'].includes(style.getPropertyValue('position'))) {
    return 'out-of-flow';
  }
  if (
    style.getPropertyValue('float') !== 'none' &&
    !isFlexOrGridItem(element)
  ) {
    return 'out-of-flow';
  }
  if (/^inline-(block|flex|grid|table)$/.test(display)) {
    return 'atomic';
  }
  return 'line';
}

/**
 * Float does not apply to the children of a flex or grid container
 * @param {Element} element
 * @returns {boolean}
 */
function isFlexOrGridItem(element) {
  const parent = getComposedParent(element);
  if (!parent) {
    return false;
  }
  const display = window.getComputedStyle(parent).getPropertyValue('display');
  return /(flex|grid)$/.test(display);
}

/**
 * @param {DOMRect} rect
 * @param {DOMRect} otherRect
 * @returns {boolean}
 */
function isSameRect(rect, otherRect) {
  return ['left', 'top', 'width', 'height'].every(
    side => Math.abs(rect[side] - otherRect[side]) < 0.01
  );
}

/**
 * Used line-height in the pixels of client rects. "normal" depends on the
 * font and is not smaller than the font size in common fonts, so the font
 * size is used for it. NaN when neither can be read.
 * @param {Element} domNode
 * @returns {number}
 */
function getLineHeight(domNode) {
  const style = window.getComputedStyle(domNode);
  let lineHeight = parseFloat(style.getPropertyValue('line-height'));
  if (!Number.isFinite(lineHeight)) {
    lineHeight = parseFloat(style.getPropertyValue('font-size'));
  }
  return lineHeight * getVerticalScale(domNode);
}

/**
 * Client rects include the zoom and transforms of the element and its
 * ancestors, the computed line-height does not. A rotation makes the bounding
 * box larger, which only makes the check stricter.
 * @param {Element} domNode
 * @returns {number}
 */
function getVerticalScale(domNode) {
  const { offsetWidth, offsetHeight } = domNode;
  if (!(offsetWidth > 0 && offsetHeight > 0)) {
    return 1;
  }
  const { width, height } = domNode.getBoundingClientRect();
  // offsetWidth and offsetHeight are rounded to whole pixels
  if (
    Math.abs(width - offsetWidth) <= 1 &&
    Math.abs(height - offsetHeight) <= 1
  ) {
    return 1;
  }
  return Math.max(width / offsetWidth, height / offsetHeight);
}

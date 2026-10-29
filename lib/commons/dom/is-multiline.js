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
  return hasOverlappingLines(domNode, rects, margin);
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

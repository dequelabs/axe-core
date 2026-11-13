const htmlNamespace = 'http://www.w3.org/1999/xhtml';

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
  let lastLineEnd = 0;
  let lineCount = 0;
  for (const rect of range.getClientRects()) {
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
  return hasOverlappingLines(domNode, margin);
}

/**
 * Text in one font has rects of the same height, with the same top on a line.
 * On the next line they are a line-height lower, and when the line-height is
 * smaller than the text they still overlap the line above.
 *
 * Only text that is in its place on the lines is looked at, see
 * getLineTextWalker. Anything else can be moved anywhere, and its rects say
 * nothing about the lines.
 */
function hasOverlappingLines(domNode, margin) {
  if (!isPlainHtml(domNode)) {
    return false;
  }
  const style = window.getComputedStyle(domNode);
  if (
    style.getPropertyValue('writing-mode') !== 'horizontal-tb' ||
    !hasPlainBaseline(style)
  ) {
    return false;
  }
  const lineHeight = getLineHeight(domNode, style);
  // Also false when the line-height is not known
  if (!(lineHeight > margin)) {
    return false;
  }

  const walker = getLineTextWalker(domNode, style);
  const range = domNode.ownerDocument.createRange();
  // The lines so far, each as the box around its rects
  const lines = [];
  // The rects that were too short to tell if the text is turned
  const shortSamples = new Set();
  let widest = { width: 0 };
  for (let text = walker.nextNode(); text; text = walker.nextNode()) {
    // White space at the start and the end is left out. A line with nothing
    // else on it has no text
    const start = text.data.search(/\S/);
    if (start === -1) {
      continue;
    }
    const end = text.data.trimEnd().length;
    range.setStart(text, start);
    range.setEnd(text, end);
    const rects = range.getClientRects();
    for (let index = 0; index < rects.length; index++) {
      const { width, height } = rects[index];
      // A rect without a width, such as a collapsed space, is not text
      if (height <= margin || width < 1) {
        continue;
      }
      const sample = { text, start, end, index, width, height };
      if (width > widest.width) {
        widest = sample;
      }
      if (!isNextLine(lines, rects[index], lineHeight)) {
        continue;
      }
      // The widest rect shows a turn best, this one is tried when that one
      // is too short
      for (const candidate of new Set([widest, sample])) {
        if (shortSamples.has(candidate)) {
          continue;
        }
        const turned = isTurned(range, candidate, lineHeight);
        if (turned !== undefined) {
          return !turned && !domNode.closest('canvas');
        }
        shortSamples.add(candidate);
      }
      // Give up, such as when each line is a single character
      if (shortSamples.size >= 8) {
        return false;
      }
    }
  }
  return false;
}

/**
 * Adds a rect to the lines.
 * @returns {boolean} True when the rect is on a next line: a line-height lower
 *   than a line of the same height, and under the text of that line.
 */
function isNextLine(lines, { top, bottom, left, right }, lineHeight) {
  const height = bottom - top;
  let line;
  let isNext = false;
  // The lines are in the order of the text, the last ones are the nearest
  for (let i = lines.length - 1; i >= 0 && lines[i].bottom > top; i--) {
    if (Math.abs(lines[i].bottom - lines[i].top - height) >= 1) {
      continue;
    }
    if (Math.abs(lines[i].top - top) < 1) {
      line = lines[i];
    } else if (
      top - lines[i].top >= 0.95 * lineHeight &&
      left < lines[i].right - 1 &&
      right > lines[i].left + 1
    ) {
      isNext = true;
    }
  }
  if (line) {
    line.left = Math.min(line.left, left);
    line.right = Math.max(line.right, right);
  } else {
    lines.push({ top, bottom, left, right });
  }
  return isNext;
}

/**
 * Whether the text is rotated or skewed. Its client rects are then the boxes
 * around the turned text, and say nothing about the lines. Such a box is
 * higher for a piece of text than for one of its characters.
 * @param {Range} range
 * @param {Object} sample A client rect of a text
 * @param {number} lineHeight
 * @returns {boolean|undefined} Undefined when the rect can not tell
 */
function isTurned(range, sample, lineHeight) {
  const { text, start, end, index, width, height } = sample;
  // Find a character of the rect. In text of one direction, the first one is
  // the first that gives the text up to and with it more rects than there are
  // before the rect
  let first = start;
  let last = end - 1;
  range.setStart(text, start);
  while (first < last) {
    const middle = Math.floor((first + last) / 2);
    range.setEnd(text, middle + 1);
    if (range.getClientRects().length > index) {
      last = middle;
    } else {
      first = middle + 1;
    }
  }
  // With both halves of a surrogate pair
  const size = text.data.codePointAt(first) > 0xffff ? 2 : 1;
  range.setStart(text, first);
  range.setEnd(text, first + size);
  // A character at the start of a line can also give a rect of the line
  // before, such as its hyphen. The nearest in height is used
  let character;
  for (const rect of range.getClientRects()) {
    if (
      !character ||
      Math.abs(height - rect.height) < Math.abs(height - character.height)
    ) {
      character = rect;
    }
  }
  if (!character) {
    return undefined;
  }
  if (Math.abs(height - character.height) >= 0.5) {
    return true;
  }
  // A turn that lowers the text by a line-height over the width of the rect
  // makes the rect this much higher than the character. When that is too
  // little to see, the rect is too short to tell
  const turnHeight = (lineHeight * (width - character.width)) / width;
  return turnHeight >= 1 ? false : undefined;
}

/**
 * Walks the text that is in its place on the lines of the element: its own
 * text, and the text of the inline elements in it, see isPlainInline.
 */
function getLineTextWalker(domNode, style) {
  const { NodeFilter } = window;
  const font = getFont(style);
  return domNode.ownerDocument.createTreeWalker(
    domNode,
    NodeFilter.SHOW_ALL,
    node => {
      // Text, also in a CDATA section
      if (node.nodeType === 3 || node.nodeType === 4) {
        return NodeFilter.FILTER_ACCEPT;
      }
      // Skip the element itself, reject it with everything in it
      return node.nodeType === 1 && isPlainInline(node, font)
        ? NodeFilter.FILTER_SKIP
        : NodeFilter.FILTER_REJECT;
    }
  );
}

/**
 * Whether the text of an element is on the lines, in the same way as the text
 * around the element.
 *
 * Not when the element is hidden with visibility or an opacity of 0, is
 * raised, lowered or moved up or down, when it has another font-size or
 * font-family, and not when it has a box of its own: blocks, inline-blocks and
 * replaced elements, and floated and absolutely positioned elements, which are
 * blocks too.
 */
function isPlainInline(element, font) {
  if (!isPlainHtml(element)) {
    return false;
  }
  const style = window.getComputedStyle(element);
  if (
    style.getPropertyValue('visibility') !== 'visible' ||
    // Another font has its text at another height on the same line
    getFont(style) !== font ||
    !hasPlainBaseline(style)
  ) {
    return false;
  }
  const display = style.getPropertyValue('display');
  // No box, the other properties do nothing
  if (display === 'contents') {
    return true;
  }
  if (
    display !== 'inline' ||
    parseFloat(style.getPropertyValue('opacity')) === 0 ||
    style.getPropertyValue('vertical-align') !== 'baseline' ||
    // A replaced element, such as a video, has a width when it is inline.
    // What is in it is not on the lines
    style.getPropertyValue('width') !== 'auto'
  ) {
    return false;
  }
  const position = style.getPropertyValue('position');
  if (position === 'static') {
    return true;
  }
  // Relative positioning moves the text when top or bottom is set
  return (
    position === 'relative' &&
    ['top', 'bottom'].every(side => {
      const offset = style.getPropertyValue(side);
      return offset === 'auto' || parseFloat(offset) === 0;
    })
  );
}

/**
 * Whether this is an HTML element that lays out its own content. A canvas
 * shows what is drawn on it. A shadow tree can put the content anywhere: a
 * details element has one, a closed one can not be seen, and a custom element
 * can have one.
 */
function isPlainHtml(element) {
  return (
    element.namespaceURI === htmlNamespace &&
    !element.shadowRoot &&
    !/-|^(canvas|details)$/.test(element.localName)
  );
}

/**
 * In Firefox an inline element is lowered or raised in an element that has,
 * or inherits, another dominant-baseline. All text with another one is left
 * out.
 */
function hasPlainBaseline(style) {
  return ['auto', ''].includes(style.getPropertyValue('dominant-baseline'));
}

function getFont(style) {
  return `${style.getPropertyValue('font-size')} ${style.getPropertyValue('font-family')}`;
}

/**
 * Used line-height in the pixels of client rects. "normal" depends on the
 * font and is not always more than the font size, so the font size is used
 * for it.
 * @returns {number} NaN when it is not known
 */
function getLineHeight(domNode, style) {
  let lineHeight = parseFloat(style.getPropertyValue('line-height'));
  if (!Number.isFinite(lineHeight)) {
    lineHeight = parseFloat(style.getPropertyValue('font-size'));
  }
  return lineHeight * getScale(domNode);
}

/**
 * Client rects include the zoom and the scale of the element and its
 * ancestors, the computed line-height does not.
 * @returns {number} NaN when the element has no box, and when its box does
 *   not have its proportions, such as most boxes that are rotated or skewed.
 *   A square keeps them, see isTurned
 */
function getScale(domNode) {
  const { offsetWidth, offsetHeight } = domNode;
  if (!(offsetWidth > 0 && offsetHeight > 0)) {
    return NaN;
  }
  const { width, height } = domNode.getBoundingClientRect();
  // offsetWidth and offsetHeight are whole pixels, in WebKit up to 2px more
  // than the box of an inline element
  if (
    Math.abs(width * offsetHeight - height * offsetWidth) >
    2 * (width + height)
  ) {
    return NaN;
  }
  if (
    Math.abs(width - offsetWidth) <= 2 &&
    Math.abs(height - offsetHeight) <= 2
  ) {
    return 1;
  }
  // The longer side is the more precise
  return width > height ? width / offsetWidth : height / offsetHeight;
}

/**
 * Returns true if content has client rects that have no vertical overlap.
 * I.e. they are rendered on different "lines".
 * @param {Element} domNode
 * @param {number} margin (default: 2)
 * @returns {number}
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
  return false;
}

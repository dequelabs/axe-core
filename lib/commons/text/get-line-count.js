/**
 * Return the number of line wraps in a DOM element
 * 
 * IMPORTANT: This function assumes single-column flowing text.
 * Floating images, flex-box, and positioned content can throw off
 * the count. 
 * @param {Element} domNode 
 * @param {number} margin (default: 2)
 * @returns {number}
 */
export default function getLineCount(domNode, margin = 2) {
  const range = domNode.ownerDocument.createRange();
  range.setStart(domNode, 0);
  range.setEnd(domNode, domNode.childNodes.length);
  let lastLineEnd = 0;
  let lineCount = 0;
  for (const rect of range.getClientRects()) {;
    if (rect.height <= margin) {
      continue;
    }
    if (lastLineEnd <= rect.top + margin) {
      lastLineEnd = rect.bottom;
      lineCount++
    } else {
      lastLineEnd = Math.max(lastLineEnd, rect.bottom);
    }
  }
  return lineCount;
}

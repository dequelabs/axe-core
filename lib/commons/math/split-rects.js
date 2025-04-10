/**
 * Given an outer rect, and a list of rects that overlap with it, find any rectangular
 * space that does not overlap.
 * @method getOffset
 * @memberof axe.commons.math
 * @param {DOMRect} outerRect
 * @param {DOMRect[]} overlapRects
 * @returns {DOMRect[]} Unique array of rects
 */
export default function splitRects(outerRect, overlapRects) {
  let uniqueRects = [outerRect];
  for (const overlapRect of overlapRects) {
    uniqueRects = uniqueRects.reduce((rects, inputRect) => {
      return rects.concat(splitRect(inputRect, overlapRect));
    }, []);

    // exit early if we get too many rects that it starts causing
    // a performance bottleneck
    // @see https://github.com/dequelabs/axe-core/issues/4359
    if (uniqueRects.length > 4000) {
      throw new Error('splitRects: Too many rects');
    }
  }
  return uniqueRects;
}

// Cut the input rect along any intersecting edge of the clip rect.
function splitRect(inputRect, clipRect) {
  const { top, left, bottom, right } = inputRect;
  const yAligned = top < clipRect.bottom && bottom > clipRect.top;
  const xAligned = left < clipRect.right && right > clipRect.left;

  const rects = [];
  if (between(clipRect.top, top, bottom) && xAligned) {
    rects.push({ top, left, bottom: clipRect.top, right });
  }
  if (between(clipRect.right, left, right) && yAligned) {
    rects.push({ top, left: clipRect.right, bottom, right });
  }
  if (between(clipRect.bottom, top, bottom) && xAligned) {
    rects.push({ top: clipRect.bottom, right, bottom, left });
  }
  if (between(clipRect.left, left, right) && yAligned) {
    rects.push({ top, left, bottom, right: clipRect.left });
  }
  if (rects.length === 0) {
    // Fully overlapping
    if (isEnclosedRect(inputRect, clipRect)) {
      return [];
    }

    rects.push(inputRect); // No intersection
  }

  return rects.map(computeRect); // add x / y / width / height
}

const between = (num, min, max) => num > min && num < max;

function computeRect(baseRect) {
  return new window.DOMRect(
    baseRect.left,
    baseRect.top,
    baseRect.right - baseRect.left,
    baseRect.bottom - baseRect.top
  );
}

function isEnclosedRect(rectA, rectB) {
  return (
    rectA.top >= rectB.top &&
    rectA.left >= rectB.left &&
    rectA.bottom <= rectB.bottom &&
    rectA.right <= rectB.right
  );
}

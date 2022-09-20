/**
 * Given an outer rect, and a list of rects that overlap with it, find any rectangular
 * space that does not overlap.
 * @method getOffset
 * @memberof axe.commons.math
 * @param {Rect} outerRect
 * @param {Rect[]} overlapRects
 * @returns uniqueRects {Rect[]}
 */
export default function splitRects(outerRect, overlapRects) {
  let uniqueRects = [outerRect];
  for (const overlapRect of overlapRects) {
    uniqueRects = uniqueRects.reduce((uniqueRects, inputRect) => {
      return uniqueRects.concat(splitRect(inputRect, overlapRect));
    }, []);
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
    rects.push(inputRect); // No intersection
  }
  return rects.map(computeRect); // add x / y / width / height
}

const between = (num, min, max) => num > min && num < max;

function computeRect(baseRect) {
  return {
    ...baseRect,
    x: baseRect.left,
    y: baseRect.top,
    height: baseRect.bottom - baseRect.top,
    width: baseRect.right - baseRect.left
  };
}

export function getBoundingRect(rectA, rectB) {
  const top = Math.min(rectA.top, rectB.top);
  const right = Math.max(rectA.right, rectB.right);
  const bottom = Math.max(rectA.bottom, rectB.bottom);
  const left = Math.min(rectA.left, rectB.left);
  return new window.DOMRect(left, top, right - left, bottom - top);
}

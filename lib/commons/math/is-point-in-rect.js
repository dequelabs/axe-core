export function isPointInRect({ x, y }, { top, right, bottom, left }) {
  return y >= top && x <= right && y <= bottom && x >= left;
}

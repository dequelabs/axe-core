const roundingMargin = 0.05;

export default function rectHasMinimumSize(minSize, { width, height }) {
  return (
    width + roundingMargin >= minSize && height + roundingMargin >= minSize
  );
}

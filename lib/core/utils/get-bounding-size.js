export default function getBoundingSize(domNode) {
  let width = parseInt(domNode.getAttribute('width'), 10);
  let height = parseInt(domNode.getAttribute('height'), 10);

  if (isNaN(width) || isNaN(height)) {
    const rect = domNode.getBoundingClientRect();
    width = isNaN(width) ? rect.width : width;
    height = isNaN(height) ? rect.height : height;
  }
  return { width, height }
}

export function createFrameContext(frame, { focusable, page }) {
  return {
    node: frame,
    include: [],
    exclude: [],
    initiator: false,
    focusable: focusable && frameFocusable(frame),
    size: getBoundingSize(frame),
    page
  };
}

function frameFocusable(frame) {
  const tabIndex = frame.getAttribute('tabindex');
  if (!tabIndex) {
    return true;
  }
  const int = parseInt(tabIndex, 10);
  return isNaN(int) || int >= 0;
}

function getBoundingSize(domNode) {
  let width = parseInt(domNode.getAttribute('width'), 10);
  let height = parseInt(domNode.getAttribute('height'), 10);

  if (isNaN(width) || isNaN(height)) {
    const rect = domNode.getBoundingClientRect();
    width = isNaN(width) ? rect.width : width;
    height = isNaN(height) ? rect.height : height;
  }
  return { width, height };
}

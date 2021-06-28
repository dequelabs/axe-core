import { getBoundingSize } from '../utils';

export default function createFrameContext(frame, { focusable, page }) {
  return {
    node: frame,
    include: [],
    exclude: [],
    initiator: false,
    focusable: focusable && frameFocusable(frame),
    size: getBoundingSize(frame),
    page
  }
}

function frameFocusable(frame) {
  var tabIndex = frame.getAttribute('tabindex');
  if (!tabIndex) {
    return true
  }
  const int = parseInt(tabIndex, 10)
  return isNaN(int) || int >= 0;
}

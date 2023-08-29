import memoize from './memoize';

/**
 * Get the scroll position of given element
 * @method getScroll
 * @memberof axe.utils
 * @param {Element} elm
 * @param {buffer} (Optional) allowed negligence in overflow
 * @returns {Object | undefined}
 */
function getScroll(elm, buffer = 0) {
  const overflowX = elm.scrollWidth > elm.clientWidth + buffer;
  const overflowY = elm.scrollHeight > elm.clientHeight + buffer;

  /**
   * if there is neither `overflow-x` or `overflow-y`
   * -> return
   */
  if (!(overflowX || overflowY)) {
    return;
  }

  const style = window.getComputedStyle(elm);
  const scrollableX = isScrollable(style, 'overflow-x');
  const scrollableY = isScrollable(style, 'overflow-y');

  /**
   * check direction of `overflow` and `scrollable`
   */
  if ((overflowX && scrollableX) || (overflowY && scrollableY)) {
    return {
      elm,
      top: elm.scrollTop,
      left: elm.scrollLeft
    };
  }
}

function isScrollable(style, prop) {
  const overflowProp = style.getPropertyValue(prop);
  return ['scroll', 'auto'].includes(overflowProp);
}

export default memoize(getScroll);

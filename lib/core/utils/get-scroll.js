import cache from '../base/cache';

/**
 * Get the scroll position of given element
 * @method getScroll
 * @memberof axe.utils
 * @param {Element} elm
 * @param {buffer} (Optional) allowed negligence in overflow
 * @returns {Object | undefined}
 */
export default function getScroll(elm, buffer = 0) {
  const cacheKey = `getScroll-${buffer}`;
  if (!cache.get(cacheKey)) {
    cache.set(cacheKey, new WeakMap());
  }
  const cacheMap = cache.get(cacheKey);
  if (cacheMap.has(elm)) {
    return cacheMap.get(elm);
  }
  const overflowX = elm.scrollWidth > elm.clientWidth + buffer;
  const overflowY = elm.scrollHeight > elm.clientHeight + buffer;

  /**
   * if there is neither `overflow-x` or `overflow-y`
   * -> return
   */
  if (!(overflowX || overflowY)) {
    cacheMap.set(elm, undefined);
    return;
  }

  const style = window.getComputedStyle(elm);
  const scrollableX = isScrollable(style, 'overflow-x');
  const scrollableY = isScrollable(style, 'overflow-y');

  /**
   * check direction of `overflow` and `scrollable`
   */
  if ((overflowX && scrollableX) || (overflowY && scrollableY)) {
    const result = {
      elm,
      top: elm.scrollTop,
      left: elm.scrollLeft
    };
    cacheMap.set(elm, result);
    return result;
  }
  cacheMap.set(elm, undefined);
}

function isScrollable(style, prop) {
  const overflowProp = style.getPropertyValue(prop);
  return ['scroll', 'auto'].includes(overflowProp);
}

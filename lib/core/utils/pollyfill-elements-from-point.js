// Spelled incorrectly intentionally (backwards compatibility).
export function pollyfillElementsFromPoint() {
  if (document.elementsFromPoint) return document.elementsFromPoint;
  if (document.msElementsFromPoint) return document.msElementsFromPoint;

  const usePointer = (function () {
    const element = document.createElement('x');
    element.style.cssText = 'pointer-events:auto';
    return element.style.pointerEvents === 'auto';
  })();

  const cssProp = usePointer ? 'pointer-events' : 'visibility';
  const cssDisableVal = usePointer ? 'none' : 'hidden';

  const style = document.createElement('style');
  style.innerHTML = usePointer
    ? '* { pointer-events: all }'
    : '* { visibility: visible }';

  return function (x, y) {
    let current, i, d;
    const elements = [];
    const previousPointerEvents = [];

    // startup
    document.head.appendChild(style);

    while (
      (current = document.elementFromPoint(x, y)) &&
      elements.indexOf(current) === -1
    ) {
      // push the element and its current style
      elements.push(current);

      previousPointerEvents.push({
        value: current.style.getPropertyValue(cssProp),
        priority: current.style.getPropertyPriority(cssProp)
      });

      // add "pointer-events: none", to get to the underlying element
      current.style.setProperty(cssProp, cssDisableVal, 'important');
    }

    // Due to negative index, documentElement could actually not be the last,
    // so we'll simply move it to the end
    if (elements.indexOf(document.documentElement) < elements.length - 1) {
      elements.splice(elements.indexOf(document.documentElement), 1);
      elements.push(document.documentElement);
    }

    // restore the previous pointer-events values
    for (
      i = previousPointerEvents.length;
      !!(d = previousPointerEvents[--i]);

    ) {
      elements[i].style.setProperty(
        cssProp,
        d.value ? d.value : '',
        d.priority
      );
    }

    // teardown;
    document.head.removeChild(style);

    return elements;
  };
}

if (typeof window.addEventListener === 'function') {
  document.elementsFromPoint = pollyfillElementsFromPoint();
}

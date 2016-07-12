// jshint ignore: start
/*
 These pollyfills came directly from the ES Specification it's self
 Contained within:
  - Object.assign
  - Array.prototype.find
*/
if (typeof Object.assign !== 'function') {
  (function () {
    Object.assign = function (target) {
      'use strict';
      if (target === undefined || target === null) {
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var output = Object(target);
      for (var index = 1; index < arguments.length; index++) {
        var source = arguments[index];
        if (source !== undefined && source !== null) {
          for (var nextKey in source) {
            if (source.hasOwnProperty(nextKey)) {
              output[nextKey] = source[nextKey];
            }
          }
        }
      }
      return output;
    };
  })();
}

if (!Array.prototype.find) {
  Array.prototype.find = function(predicate) {
    if (this === null) {
      throw new TypeError('Array.prototype.find called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    var value;

    for (var i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return value;
      }
    }
    return undefined;
  };
}


axe.utils.pollyfillElementsFromPoint = function () {
  if (document.elementsFromPoint) return document.elementsFromPoint;
  if (document.msElementsFromPoint) return document.msElementsFromPoint;

  var usePointer = (function () {
    var element = document.createElement('x');
    element.style.cssText = 'pointer-events:auto';
    return element.style.pointerEvents === 'auto';
  }());

  var cssProp = usePointer ? 'pointer-events' : 'visibility';
  var cssDisableVal = usePointer ? 'none' : 'hidden';

  var style = document.createElement('style');
  style.innerHTML = usePointer ? 
    '* { pointer-events: all }' : '* { visibility: visible }';

  return function (x, y) {
    var current, i, d;
    var elements = [];
    var previousPointerEvents = [];

    // startup
    document.head.appendChild(style);

    while ((current = document.elementFromPoint(x, y)) && elements.indexOf(current) === -1) {
      // push the element and its current style
      elements.push(current);

      previousPointerEvents.push({
        value: current.style.getPropertyValue(cssProp),
        priority: current.style.getPropertyPriority(cssProp)
      });

      // add "pointer-events: none", to get to the underlying element
      current.style.setProperty(cssProp, cssDisableVal, 'important');
    }

    // restore the previous pointer-events values
    for (i = previousPointerEvents.length; !!(d = previousPointerEvents[--i]);) {
      elements[i].style.setProperty(cssProp, d.value ? d.value : '', d.priority);
    }

    // teardown;
    document.head.removeChild(style);

    return elements;
  }
};


document.elementsFromPoint = axe.utils.pollyfillElementsFromPoint();


if (!Array.prototype.includes) {
  Array.prototype.includes = function(searchElement /*, fromIndex*/ ) {
    'use strict';
    var O = Object(this);
    var len = parseInt(O.length, 10) || 0;
    if (len === 0) {
      return false;
    }
    var n = parseInt(arguments[1], 10) || 0;
    var k;
    if (n >= 0) {
      k = n;
    } else {
      k = len + n;
      if (k < 0) {k = 0;}
    }
    var currentElement;
    while (k < len) {
      currentElement = O[k];
      if (searchElement === currentElement ||
         (searchElement !== searchElement && currentElement !== currentElement)) { // NaN !== NaN
        return true;
      }
      k++;
    }
    return false;
  };
}

// Production steps of ECMA-262, Edition 5, 15.4.4.17
// Reference: http://es5.github.io/#x15.4.4.17
if (!Array.prototype.some) {
  Array.prototype.some = function(fun/*, thisArg*/) {
    'use strict';

    if (this == null) {
      throw new TypeError('Array.prototype.some called on null or undefined');
    }

    if (typeof fun !== 'function') {
      throw new TypeError();
    }

    var t = Object(this);
    var len = t.length >>> 0;

    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    for (var i = 0; i < len; i++) {
      if (i in t && fun.call(thisArg, t[i], i, t)) {
        return true;
      }
    }

    return false;
  };
}
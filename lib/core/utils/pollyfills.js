/* eslint-disable */
/*
 These pollyfills came directly from the ES Specification it's self
 Contained within:
	- Object.assign
	- Array.prototype.find
*/
if (typeof Object.assign !== 'function') {
	(function() {
		Object.assign = function(target) {
			'use strict';
			if (target === undefined || target === null) {
				throw new TypeError('Cannot convert undefined or null to object');
			}

			const output = Object(target);
			for (let index = 1; index < arguments.length; index++) {
				const source = arguments[index];
				if (source !== undefined && source !== null) {
					for (const nextKey in source) {
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
	Object.defineProperty(Array.prototype, 'find', {
		value: function(predicate) {
			if (this === null) {
				throw new TypeError('Array.prototype.find called on null or undefined');
			}
			if (typeof predicate !== 'function') {
				throw new TypeError('predicate must be a function');
			}
			const list = Object(this);
			const length = list.length >>> 0;
			const thisArg = arguments[1];
			let value;

			for (let i = 0; i < length; i++) {
				value = list[i];
				if (predicate.call(thisArg, value, i, list)) {
					return value;
				}
			}
			return undefined;
		}
	});
}

axe.utils.pollyfillElementsFromPoint = function() {
	if (document.elementsFromPoint) return document.elementsFromPoint;
	if (document.msElementsFromPoint) return document.msElementsFromPoint;

	const usePointer = (function() {
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

	return function(x, y) {
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
};

if (typeof window.addEventListener === 'function') {
	document.elementsFromPoint = axe.utils.pollyfillElementsFromPoint();
}

if (!Array.prototype.includes) {
	Object.defineProperty(Array.prototype, 'includes', {
		value: function(searchElement) {
			'use strict';
			const O = Object(this);
			const len = parseInt(O.length, 10) || 0;
			if (len === 0) {
				return false;
			}
			const n = parseInt(arguments[1], 10) || 0;
			let k;
			if (n >= 0) {
				k = n;
			} else {
				k = len + n;
				if (k < 0) {
					k = 0;
				}
			}
			let currentElement;
			while (k < len) {
				currentElement = O[k];
				if (
					searchElement === currentElement ||
					(searchElement !== searchElement && currentElement !== currentElement)
				) {
					// NaN !== NaN
					return true;
				}
				k++;
			}
			return false;
		}
	});
}

// Production steps of ECMA-262, Edition 5, 15.4.4.17
// Reference: http://es5.github.io/#x15.4.4.17
if (!Array.prototype.some) {
	Object.defineProperty(Array.prototype, 'some', {
		value: function(fun) {
			'use strict';

			if (this == null) {
				throw new TypeError('Array.prototype.some called on null or undefined');
			}

			if (typeof fun !== 'function') {
				throw new TypeError();
			}

			const t = Object(this);
			const len = t.length >>> 0;

			const thisArg = arguments.length >= 2 ? arguments[1] : void 0;
			for (let i = 0; i < len; i++) {
				if (i in t && fun.call(thisArg, t[i], i, t)) {
					return true;
				}
			}

			return false;
		}
	});
}

if (!Array.from) {
	Object.defineProperty(Array, 'from', {
		value: (function() {
			const toStr = Object.prototype.toString;
			const isCallable = function(fn) {
				return (
					typeof fn === 'function' || toStr.call(fn) === '[object Function]'
				);
			};
			const toInteger = function(value) {
				const number = Number(value);
				if (isNaN(number)) {
					return 0;
				}
				if (number === 0 || !isFinite(number)) {
					return number;
				}
				return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
			};
			const maxSafeInteger = Math.pow(2, 53) - 1;
			const toLength = function(value) {
				const len = toInteger(value);
				return Math.min(Math.max(len, 0), maxSafeInteger);
			};

			// The length property of the from method is 1.
			return function from(arrayLike /*, mapFn, thisArg */) {
				// 1. Let C be the this value.
				const C = this;

				// 2. Let items be ToObject(arrayLike).
				const items = Object(arrayLike);

				// 3. ReturnIfAbrupt(items).
				if (arrayLike == null) {
					throw new TypeError(
						'Array.from requires an array-like object - not null or undefined'
					);
				}

				// 4. If mapfn is undefined, then let mapping be false.
				const mapFn = arguments.length > 1 ? arguments[1] : void undefined;
				let T;
				if (typeof mapFn !== 'undefined') {
					// 5. else
					// 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
					if (!isCallable(mapFn)) {
						throw new TypeError(
							'Array.from: when provided, the second argument must be a function'
						);
					}

					// 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
					if (arguments.length > 2) {
						T = arguments[2];
					}
				}

				// 10. Let lenValue be Get(items, "length").
				// 11. Let len be ToLength(lenValue).
				const len = toLength(items.length);

				// 13. If IsConstructor(C) is true, then
				// 13. a. Let A be the result of calling the [[Construct]] internal method of C with an argument list containing the single item len.
				// 14. a. Else, Let A be ArrayCreate(len).
				const A = isCallable(C) ? Object(new C(len)) : new Array(len);

				// 16. Let k be 0.
				let k = 0;
				// 17. Repeat, while k < len… (also steps a - h)
				let kValue;
				while (k < len) {
					kValue = items[k];
					if (mapFn) {
						A[k] =
							typeof T === 'undefined'
								? mapFn(kValue, k)
								: mapFn.call(T, kValue, k);
					} else {
						A[k] = kValue;
					}
					k += 1;
				}
				// 18. Let putStatus be Put(A, "length", len, true).
				A.length = len;
				// 20. Return A.
				return A;
			};
		})()
	});
}

if (!String.prototype.includes) {
	String.prototype.includes = function(search, start) {
		if (typeof start !== 'number') {
			start = 0;
		}
		if (start + search.length > this.length) {
			return false;
		} else {
			return this.indexOf(search, start) !== -1;
		}
	};
}

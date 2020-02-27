/**
 * Note:
 * This file is run via browserify to pull in the required dependencies.
 * See - './build/imports-generator'
 */

/**
 * Polyfill Object.assign
 * Reference https://github.com/zloirock/core-js/
 */
if (typeof Object.assign !== 'function') {
	require('core-js/features/object/assign');
}

/**
 * Polyfill Array.prototype.find
 * Reference https://github.com/zloirock/core-js/
 */
if (!Array.prototype.find) {
	require('core-js/features/array/find');
}

/**
 * Polyfill Array.prototype.includes
 * Reference https://github.com/zloirock/core-js/
 */
if (!Array.prototype.includes) {
	require('core-js/features/array/includes');
}

/**
 * Polyfill Array.prototype.some
 * Reference https://github.com/zloirock/core-js/
 */
if (!Array.prototype.some) {
	require('core-js/features/array/some');
}

/**
 * Polyfill Array.from
 * Reference https://github.com/zloirock/core-js/
 */
if (!Array.from) {
	require('core-js/features/array/from');
}

/**
 * Polyfill String.prototype.includes
 * Reference https://github.com/zloirock/core-js/
 */
if (!String.prototype.includes) {
	require('core-js/features/string/includes');
}

/**
 * Polyfill required TypedArray and functions
 * Reference https://github.com/zloirock/core-js/
 */
if (!('Uint32Array' in window)) {
	require('core-js/features/typed-array/uint32-array');
}
if (window.Uint32Array) {
	if (!('some' in window.Uint32Array.prototype)) {
		require('core-js/features/typed-array/some');
	}
	if (!('reduce' in window.Uint32Array.prototype)) {
		require('core-js/features/typed-array/reduce');
	}
}

/**
 * Polyfill `Promise`
 * Reference: https://www.npmjs.com/package/es6-promise
 */
if (!('Promise' in window)) {
	require('es6-promise').polyfill();
}

/**
 * Polyfill `WeakMap`
 * Reference: https://github.com/polygonplanet/weakmap-polyfill
 */
require('weakmap-polyfill');

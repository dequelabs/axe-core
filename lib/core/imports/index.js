/* global axe */

/**
 * Note:
 * This file is run via browserify to pull in the required dependencies.
 * See - './build/imports-generator'
 */

/**
 * Polyfill `Promise`
 * Reference: https://www.npmjs.com/package/es6-promise
 */
if (!('Promise' in window)) {
	require('es6-promise').polyfill();
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
 * Polyfill `WeakMap`
 * Reference: https://github.com/polygonplanet/weakmap-polyfill
 */
require('weakmap-polyfill');

/**
 * Polyfill Function.name (hack to replace instanceof)
 * TODO: es-modules. Remove once we can bundle entire codebase and
 * tests.
 */
if (!('name' in Function)) {
	Function.prototype.name = function name() {
		return this.toString().match(/^function\s*([^\s(]+)/)[1];
	};
}

/**
 * Namespace `axe.imports` which holds required external dependencies
 *
 * @namespace imports
 * @memberof axe
 */
axe.imports = {
	axios: require('axios'),
	CssSelectorParser: require('css-selector-parser').CssSelectorParser,
	doT: require('@deque/dot'),
	emojiRegexText: require('emoji-regex'),
	memoize: require('memoizee')
};

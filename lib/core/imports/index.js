/* global axe */

/**
 * Note:
 * This file is run via browserify to pull in the required dependencies.
 * See - './build/imports-generator'
 */

/**
 * Polyfill `Object.assign`
 */
if (typeof Object.assign !== 'function') {
	require('core-js/features/object/assign');
}

/**
 * Polyfill `Array.find`
 */
if (!Array.prototype.find) {
	require('core-js/features/array/find');
}

/**
 * Polyfill `Array.includes`
 */
if (!Array.prototype.includes) {
	require('core-js/features/array/includes');
}

/**
 * Polyfill `Array.some`
 */
if (!Array.prototype.some) {
	require('core-js/features/array/some');
}

/**
 * Polyfill `Array.from`
 */
if (!Array.from) {
	require('core-js/features/array/from');
}

/**
 * Polyfill `String.includes`
 */
if (!String.prototype.includes) {
	require('core-js/features/string/includes');
}

/**
 * Polyfill `Promise`
 */
if (!('Promise' in window)) {
	require('core-js/features/promise');
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
	doT: require('dot'),
	emojiRegexText: require('emoji-regex')
};

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
 * Polyfill `WeakMap`
 * Reference: https://github.com/polygonplanet/weakmap-polyfill
 */
require('weakmap-polyfill');

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

/* global axe */

/**
 * Note:
 * Npm script -> `imports-gen` runs browserify
 * to pull in the required dependencies.
 */

/**
 * Override global `window`
 */
require('es6-promise').polyfill();

/**
 * Namespace `axe.imports`
 * @namespace imports
 * @memberof axe
 */
axe.imports = {
	axios: require('axios'),
	doT: require('dot'),
	CssSelectorParser: require('css-selector-parser').CssSelectorParser
};

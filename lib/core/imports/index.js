/* global axe */

/**
 * Note:
 * Npm script -> `imports-gen` runs browserify
 * to pull in the required dependencies.
 */

/**
 * Polyfill for targets specified in `.babelrc`
 * Reference: https://babeljs.io/docs/en/next/babel-polyfill.html
 */
require('@babel/polyfill');

/**
 * Namespace `axe.imports` which holds required external dependencies
 *
 * @namespace imports
 * @memberof axe
 */
axe.imports = {
	axios: require('axios'),
	doT: require('dot'),
	CssSelectorParser: require('css-selector-parser').CssSelectorParser
};

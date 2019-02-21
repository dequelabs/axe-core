/* global axe */

/**
 * Note:
 * Npm script -> `imports-gen` runs browserify
 * to pull in the required dependencies.
 */

/**
 * Polyfill selectively based on usage
 * Reference:
 * - https://babeljs.io/docs/en/next/babel-polyfill.html
 * - https://github.com/babel/babel/blob/master/packages/babel-preset-env/data/built-in-features.js
 */
require('core-js/modules/es6.string.includes');
require('core-js/modules/es6.array.find');
require('core-js/modules/es7.array.includes');
require('core-js/modules/es6.array.some');
require('core-js/modules/es6.array.from');
require('core-js/modules/es6.object.assign');
require('core-js/modules/es6.promise');

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

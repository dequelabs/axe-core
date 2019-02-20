/* global axe */

/**
 * Note:
 * Npm script -> `imports-gen` runs browserify
 * to pull in the required dependencies.
 */

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

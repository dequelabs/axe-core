/* global axe */

// Note: the below is run via `browserify` build task - `build/imports-generator` and output into the `tmp` directory.

/**
 * Namespace for imports which holds globals of external dependencies.
 * @namespace imports
 * @memberof axe
 */
axe.imports = {
	axios: require('axios'),
	doT: require('dot'),
	CssSelectorParser: require('css-selector-parser').CssSelectorParser
};

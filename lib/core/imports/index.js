/* global axe */

/**
 * Note:
 * This file is run via browserify to pull in the required dependencies.
 * See - './build/imports-generator'
 */

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

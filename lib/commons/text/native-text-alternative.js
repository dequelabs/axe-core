import getRole from '../aria/get-role.js';
import log from '../../core/log.js';

// TODO: matches

/**
 * Get the accessible text using native HTML methods only
 * @param {VirtualNode} element
 * @param {Object} context
 * @property {Bool} debug Enable logging for formControlValue
 * @return {String} Accessible text
 */
function nativeTextAlternative(virtualNode, context = {}) {
	const { actualNode } = virtualNode;
	if (
		actualNode.nodeType !== 1 ||
		['presentation', 'none'].includes(getRole(actualNode))
	) {
		return '';
	}

	const textMethods = findTextMethods(virtualNode);
	// Find the first step that returns a non-empty string
	let accName = textMethods.reduce((accName, step) => {
		return accName || step(virtualNode, context);
	}, '');

	if (context.debug) {
		log(accName || '{empty-value}', actualNode, context);
	}
	return accName;
}

/**
 * Get accessible text functions for a specific native HTML element
 * @private
 * @param {VirtualNode} element
 * @return {Function[]} Array of native accessible name computation methods
 */
function findTextMethods(virtualNode) {
	const { nativeElementType, nativeTextMethods } = text;
	const nativeType = nativeElementType.find(({ matches }) => {
		return axe.commons.matches(virtualNode, matches);
	});

	// Use concat because namingMethods can be a string or an array of strings
	const methods = nativeType ? [].concat(nativeType.namingMethods) : [];

	return methods.map(methodName => nativeTextMethods[methodName]);
}

export default nativeTextAlternative;

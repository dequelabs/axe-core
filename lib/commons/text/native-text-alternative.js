import getRole from '../aria/get-role';
import matches from '../matches/matches';
import nativeElementType from './native-element-type';
import nativeTextMethods from './native-text-methods';

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
		axe.log(accName || '{empty-value}', actualNode, context);
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
	const nativeType = nativeElementType.find(type => {
		return matches(virtualNode, type.matches);
	});

	// Use concat because namingMethods can be a string or an array of strings
	const methods = nativeType ? [].concat(nativeType.namingMethods) : [];

	return methods.map(methodName => nativeTextMethods[methodName]);
}

export default nativeTextAlternative;

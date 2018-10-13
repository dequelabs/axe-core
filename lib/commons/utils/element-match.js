/* global axe */

axe.utils.elementMatch = elementMatch;
axe.utils.elementMatch.stringMatch = stringMatch;
axe.utils.elementMatch.functionReturnMatch = functionReturnMatch;

/**
 * Check if a DOM element matches a definition
 *
 * Example:
 * ```js
 * // Match a single nodeName:
 * axe.utils.elementMatch(elm, 'div')
 *
 * // Match one of multiple nodeNames:
 * axe.utils.elementMatch(elm, ['ul', 'ol'])
 *
 * // Match a node with nodeName 'button' and with aria-hidden: true:
 * axe.utils.elementMatch(elm, {
 * 	 nodeName: 'button',
 * 	 attributes: { 'aria-hidden': 'true' }
 * })
 *
 * // Mixed input. Match button nodeName, input[type=button] and input[type=reset]
 * axe.utils.elementMatch(elm, ['button', {
 * 	nodeName: 'input', // nodeName match isn't case sensitive
 * 	properties: { type: ['button', 'reset'] }
 * }])
 * ```
 *
 * - Array<ElementDefinition>: Return true if at least one element definition matches
 * - <ElementDefinition>:
 * 		- <String>: Element nodeName matches the string (upper case, case sensitive)
 * 		- <Object>: Return true if all properties match
 * 			- .nodeName<String>: Element nodeName matches the string
 * 			- .property<StringMatcher>: A property of the DOM node matches
 * 			- .attribute<StringMatcher>: The DOM node has the attribute and it matches
 *
 * <StringMatcher>: <String|Array|Regex|Function>:
 * 	- String: Strings matches the property or attribute value (case sensitive)
 *  - Array: Array includes the property or attribute value
 *  - Regex: Regex returns true when testing the property or attribute value
 *  - Function: Function returns true when testing the property or attribute value
 *
 * @param {HTMLElement|VirtualNode} node node to verify attributes against constraints
 * @param {Array<ElementDefinition>|String|Object|Function|Regex} definition
 * @return {Boolean} true/ false based on if node passes the constraints expected
 */
function elementMatch(node, definition) {
	node = node.actualNode || node;
	if (Array.isArray(definition)) {
		return definition.some(definition => elementMatch(node, definition));
	}

	// TODO: Account for case sentitivity when appropriate
	// TODO: Account for namespace somehow
	const nodeName = node.nodeName.toLowerCase();
	if (typeof definition === 'string') {
		return axe.utils.matchesSelector(node, definition);
	}

	if (!stringMatch(definition.nodeName, nodeName)) {
		return false;
	}

	if (definition.condition && !definition.condition(node)) {
		return false;
	}

	if (
		!functionReturnMatch(definition.attributes, attrName =>
			node.getAttribute(attrName)
		)
	) {
		return false;
	}

	if (!functionReturnMatch(definition.properties, propName => node[propName])) {
		return false;
	}

	return true;
}

function functionReturnMatch(matcher, getValue) {
	const matcherType = typeof matcher;
	if (matcherType === 'undefined') {
		return true;
	}
	if (matcherType !== 'object' || Array.isArray(matcher)) {
		throw new Error('Expect elementMatch properties to be an object');
	}
	// Check that the property has all the expected values
	return Object.entries(matcher).every(([propName, expectValue]) => {
		return stringMatch(expectValue, getValue(propName));
	});
}

function stringMatch(matcher, string) {
	const matcherType = typeof matcher;
	if (matcherType === 'undefined' || matcher === null) {
		return true;
	}
	if (Array.isArray(matcher)) {
		return matcher.includes(string);
	}
	if (matcherType === 'function') {
		return matcher(string);
	}
	if (matcher instanceof RegExp) {
		return matcher.test(string);
	}
	return matcher === string;
}

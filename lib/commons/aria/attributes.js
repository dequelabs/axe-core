/*global aria, axe, lookupTables */

/**
 * Get required attributes for a given role
 * @param  {String} role The role to check
 * @return {Array}
 */
aria.requiredAttr = function (role) {
	'use strict';
	var roles = lookupTables.role[role],
		attr = roles && roles.attributes && roles.attributes.required;
	return attr || [];
};

/**
 * Get allowed attributes for a given role
 * @param  {String} role The role to check
 * @return {Array}
 */
aria.allowedAttr = function (role) {
	'use strict';
	var roles = lookupTables.role[role],
		attr = (roles && roles.attributes && roles.attributes.allowed) || [],
		requiredAttr = (roles && roles.attributes && roles.attributes.required) || [];

	return attr.concat(lookupTables.globalAttributes).concat(requiredAttr);
};

/**
 * Check if an aria- attribute name is valid
 * @param  {String} att The attribute name
 * @return {Boolean}
 */
aria.validateAttr = function (att) {
	'use strict';
	return !!lookupTables.attributes[att];
};

/**
 * Validate the value of an ARIA attribute
 * @param  {HTMLElement} node The element to check
 * @param  {String} attr The name of the attribute
 * @return {Boolean}
 */
aria.validateAttrValue = function (node, attr) {
	//jshint maxcomplexity: 12
	'use strict';
	var matches, list,
		doc = document,
		value = node.getAttribute(attr),
		attrInfo = lookupTables.attributes[attr];

	if (!attrInfo) {
		return true;
	}

	switch (attrInfo.type) {
	case 'boolean':
	case 'nmtoken':
		return (typeof value === 'string' && attrInfo.values.indexOf(value.toLowerCase()) !== -1);

	case 'nmtokens': 
		list = axe.utils.tokenList(value);
		// Check if any value isn't in the list of values
		return list.reduce(function (result, token) {
			return (result && attrInfo.values.indexOf(token) !== -1);
		// Initial state, fail if the list is empty
		}, list.length !== 0);

	case 'idref':
		return !!(value && doc.getElementById(value));

	case 'idrefs':
		list = axe.utils.tokenList(value);
		// Check if any value isn't in the list of values
		return list.reduce(function (result, token) {
			return !!(result && doc.getElementById(token));
		// Initial state, fail if the list is empty
		}, list.length !== 0);

	case 'string':
		// anything goes
		return true;

	case 'decimal':
		matches = value.match(/^[-+]?([0-9]*)\.?([0-9]*)$/);
		return !!(matches && (matches[1] || matches[2]));

	case 'int':
		return (/^[-+]?[0-9]+$/).test(value);
	}
};

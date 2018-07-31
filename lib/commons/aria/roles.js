/* global aria, axe */

/**
 * Check if a given role is valid
 * @method isValidRole
 * @memberof axe.commons.aria
 * @instance
 * @param {String} role The role to check
 * @return {Boolean}
 */
aria.isValidRole = function(role) {
	'use strict';
	if (aria.lookupTable.role[role]) {
		return true;
	}

	return false;
};

/**
 * Get the roles that get name from the element's contents
 * @method getRolesWithNameFromContents
 * @memberof axe.commons.aria
 * @instance
 * @return {Array} Array of roles that match the type
 */
aria.getRolesWithNameFromContents = function() {
	return Object.keys(aria.lookupTable.role).filter(function(r) {
		return (
			aria.lookupTable.role[r].nameFrom &&
			aria.lookupTable.role[r].nameFrom.indexOf('contents') !== -1
		);
	});
};

/**
 * Get the roles that have a certain "type"
 * @method getRolesByType
 * @memberof axe.commons.aria
 * @instance
 * @param {String} roleType The roletype to check
 * @return {Array} Array of roles that match the type
 */
aria.getRolesByType = function(roleType) {
	return Object.keys(aria.lookupTable.role).filter(function(r) {
		return aria.lookupTable.role[r].type === roleType;
	});
};

/**
 * Get the "type" of role; either widget, composite, abstract, landmark or `null`
 * @method getRoleType
 * @memberof axe.commons.aria
 * @instance
 * @param {String} role The role to check
 * @return {Mixed} String if a matching role and its type are found, otherwise `null`
 */
aria.getRoleType = function(role) {
	var r = aria.lookupTable.role[role];
	return (r && r.type) || null;
};

/**
 * Get the required owned (children) roles for a given role
 * @method requiredOwned
 * @memberof axe.commons.aria
 * @instance
 * @param {String} role The role to check
 * @return {Mixed} Either an Array of required owned elements or `null` if there are none
 */
aria.requiredOwned = function(role) {
	'use strict';
	var owned = null,
		roles = aria.lookupTable.role[role];

	if (roles) {
		owned = axe.utils.clone(roles.owned);
	}
	return owned;
};

/**
 * Get the required context (parent) roles for a given role
 * @method requiredContext
 * @memberof axe.commons.aria
 * @instance
 * @param {String} role The role to check
 * @return {Mixed} Either an Array of required context elements or `null` if there are none
 */
aria.requiredContext = function(role) {
	'use strict';
	var context = null,
		roles = aria.lookupTable.role[role];

	if (roles) {
		context = axe.utils.clone(roles.context);
	}
	return context;
};

/**
 * Get a list of CSS selectors of nodes that have an implicit role
 * @method implicitNodes
 * @memberof axe.commons.aria
 * @instance
 * @param {String} role The role to check
 * @return {Mixed} Either an Array of CSS selectors or `null` if there are none
 */
aria.implicitNodes = function(role) {
	'use strict';

	var implicit = null,
		roles = aria.lookupTable.role[role];

	if (roles && roles.implicit) {
		implicit = axe.utils.clone(roles.implicit);
	}
	return implicit;
};

/**
 * Get the implicit role for a given node
 * @method implicitRole
 * @memberof axe.commons.aria
 * @instance
 * @param {HTMLElement} node The node to test
 * @return {Mixed} Either the role or `null` if there is none
 */
aria.implicitRole = function(node) {
	'use strict';

	/*
	 * Filter function to reduce a list of roles to a valid list of roles for a nodetype
	 */
	var isValidImplicitRole = function(set, role) {
		var validForNodeType = function(implicitNodeTypeSelector) {
			return axe.utils.matchesSelector(node, implicitNodeTypeSelector);
		};

		if (role.implicit && role.implicit.some(validForNodeType)) {
			set.push(role.name);
		}

		return set;
	};

	/*
	 * Score a set of roles and aria-attributes by its optimal score
	 * E.g. [{score: 2, name: button}, {score: 1, name: main}]
	 */
	var sortRolesByOptimalAriaContext = function(roles, ariaAttributes) {
		var getScore = function(role) {
			var allowedAriaAttributes = aria.allowedAttr(role);
			return allowedAriaAttributes.reduce(function(score, attribute) {
				return score + (ariaAttributes.indexOf(attribute) > -1 ? 1 : 0);
			}, 0);
		};

		var scored = roles.map(function(role) {
			return { score: getScore(role), name: role };
		});

		var sorted = scored.sort(function(scoredRoleA, scoredRoleB) {
			return scoredRoleB.score - scoredRoleA.score;
		});

		return sorted.map(function(sortedRole) {
			return sortedRole.name;
		});
	};

	/*
	 * Create a list of { name / implicit } role mappings to filter on
	 */
	var roles = Object.keys(aria.lookupTable.role).map(function(role) {
		var lookup = aria.lookupTable.role[role];
		return { name: role, implicit: lookup && lookup.implicit };
	});

	/* Build a list of valid implicit roles for this node */
	var availableImplicitRoles = roles.reduce(isValidImplicitRole, []);

	if (!availableImplicitRoles.length) {
		return null;
	}

	var nodeAttributes = node.attributes;
	var ariaAttributes = [];

	/* Get all aria-attributes defined for this node */
	/* Should be a helper function somewhere */
	for (var i = 0, j = nodeAttributes.length; i < j; i++) {
		var attr = nodeAttributes[i];
		if (attr.name.match(/^aria-/)) {
			ariaAttributes.push(attr.name);
		}
	}

	/* Sort roles by highest score, return the first */
	return sortRolesByOptimalAriaContext(
		availableImplicitRoles,
		ariaAttributes
	).shift();
};

/**
 * validate if a given role is an allowed ARIA role for
 * @method isAriaRoleAllowedOnElement
 * @param {HTMLElement} node the node to verify
 * @param {String} role aria role to check
 * @return {Boolean} retruns true/false
 */
aria.isAriaRoleAllowedOnElement = function isAriaRoleAllowedOnElement(
	node,
	role
) {
	const tagName = node.tagName.toUpperCase();
	const lookupTable = axe.commons.aria.lookupTable;

	// if element can have no role
	if (lookupTable.elementsAllowedNoRole.includes(tagName)) {
		return false;
	}
	// if element can have any role
	if (lookupTable.elementsAllowedAnyRole.includes(tagName)) {
		return true;
	}
	// check role allowedElements
	const roleValue = lookupTable.role[role];

	// if given role does not exist in lookupTable
	if (!roleValue) {
		return false;
	}

	// check if role has allowedElements
	if (
		!(
			roleValue.allowedElements &&
			Array.isArray(roleValue.allowedElements) &&
			roleValue.allowedElements.length
		)
	) {
		return false;
	}

	const nodeAttrs = Array.from(node.attributes).map(a => a.name.toUpperCase());

	let out = false;
	// check if the given element exists in allowedElements for the role
	roleValue.allowedElements.forEach(el => {
		// string
		if (typeof el === 'string') {
			if (el === tagName) {
				out = true;
			}
			return;
		}
		// object - match tag in allowedElement
		if (el.tagName !== tagName) {
			return;
		}
		if (!el.attributes) {
			return;
		}
		el.attributes.forEach(attr => {
			if (!nodeAttrs.includes(attr.name)) {
				return;
			}
			if (typeof attr.value === 'undefined') {
				out = true;
				return;
			}
			if (tagName === 'IMG' && attr.value === '') {
				out = true;
				return;
			}
			if (!node.getAttribute(attr.name)) {
				return;
			}
			const nodeAttrValue = node
				.getAttribute(attr.name)
				.trim()
				.toUpperCase();
			if (attr.value === nodeAttrValue) {
				out = true;
				return;
			}
		});
	});

	// check if tag has a custom function to check its validity against various tags
	if (Object.keys(lookupTable.evaluateRoleForElement).includes(tagName)) {
		out = lookupTable.evaluateRoleForElement[tagName]({ node, role, out });
	}

	return out;
};

/**
 * gets all unallowed roles for a given node
 * @method getAriaUnAllowedRoles
 * @param {Object} node HTMLElement to validate
 * @param {String} tagName tag name of a node
 * @param {String} allowImplicit option to allow implicit roles, defaults to true
 * @return {Array<String>} retruns an array of roles that are not allowed on the given node
 */
aria.getAriaUnAllowedRoles = function getAriaUnAllowedRoles(
	node,
	allowImplicit
) {
	/**
	 * Get roles applied to a given node
	 * @param {HTMLElement} node HTMLElement
	 * @return {Array<String>} return an array of roles applied to the node, if no roles, return an empty array.
	 */
	// TODO: not moving this to outer namespace yet, work with wilco to see overlap with his PR(WIP) - aria.getRole
	function getRoleSegments(node) {
		let roles = [];
		if (!node) {
			return roles;
		}
		if (node.hasAttribute('role')) {
			const nodeRoles = axe.utils.tokenList(
				node.getAttribute('role').toLowerCase()
			);
			roles = roles.concat(nodeRoles);
		}
		if (node.hasAttributeNS('http://www.idpf.org/2007/ops', 'type')) {
			const epubRoles = axe.utils
				.tokenList(
					node
						.getAttributeNS('http://www.idpf.org/2007/ops', 'type')
						.toLowerCase()
				)
				.map(role => `doc-${role}`);
			roles = roles.concat(epubRoles);
		}
		return roles;
	}

	const tagName = node.tagName.toUpperCase();

	// by pass custom elements
	if (!axe.utils.isValidHtmlTag(tagName)) {
		return [];
	}

	// by pass other elements that may not be a known html element
	if (
		document.createElement(tagName).toString() === '[object HTMLUnknownElement]'
	) {
		return [];
	}

	const roleSegments = getRoleSegments(node);
	const implicitRole = axe.commons.aria.implicitRole(node);
	// stores all roles that are not allowed for a specific element most often an element only has one explicit role
	return roleSegments.filter(role => {
		if (!axe.commons.aria.isValidRole(role)) {
			// do not check made-up/ fake roles
			return;
		}
		// check if an implicit role may be set explicit following a setting
		if (!allowImplicit && role === implicitRole) {
			// edge case: setting implicit role row on tr element is allowed when child of table[role='grid']
			if (
				!(
					role === 'row' &&
					tagName === 'TR' &&
					axe.commons.utils
						.matchesSelector('table[role="grid"] > tr')
						.some(tr => tr === node)
				)
			) {
				return role;
			}
		}
		if (!aria.isAriaRoleAllowedOnElement(node, role)) {
			return role;
		}
	});
};

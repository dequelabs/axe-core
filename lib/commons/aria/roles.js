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
 * check if a given role is applicable and or allowed for a given node/ HTMLElement
 * @method isApplicableRoleForNode
 * @instance
 * @param {HTMLElement} node HTMLElement
 * @param {string} role role to be check if valid(allowed) against the given node
 * @return {boolean} returns true if given role is allowed on the node, false otherwise
 * @private
 */
function isApplicableRoleForNode(node, roleValue) {
	const tagName = node.tagName.toUpperCase();
	const nodeAttrs = Array.from(node.attributes).map(a => a.name.toUpperCase());

	if (
		!(
			roleValue.allowedElements &&
			Array.isArray(roleValue.allowedElements) &&
			roleValue.allowedElements.length
		)
	) {
		return false;
	}

	let isApplicable = false;
	roleValue.allowedElements.forEach(el => {
		// string
		if (typeof el === 'string') {
			if (el === tagName) {
				isApplicable = true;
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
				isApplicable = true;
				return;
			}
			if (tagName === 'IMG' && attr.value === '') {
				isApplicable = true;
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
				isApplicable = true;
				return;
			}
		});
	});
	return isApplicable;
}

/**
 * validate if a given role is an allowed ARIA role.
 * @method validateAllowedAriaRole
 * @param {String} tagName tag name of a node
 * @param {String} role aria role to check
 * @return {Boolean} retruns true/false
 * @private
 */
function validateAllowedAriaRole(node, tagName, role) {
	/**
	 * Collection of functions, which evaluate if a given ROLE is allowed on a specified type of ELEMENT.
	 * @type {Object}
	 */
	const elementCheck = {
		A: ({ node, isApplicable }) => {
			if (node.namespaceURI === 'http://www.w3.org/2000/svg') {
				return true;
			}
			if (node.href.length) {
				return isApplicable;
			}
			return true;
		},
		AREA: ({ node }) => !node.href,
		BUTTON: ({ node, role, isApplicable }) => {
			if (node.getAttribute('type') === 'menu') {
				return role === 'menuitem';
			}
			return isApplicable;
		},
		IMG: ({ node, isApplicable }) => {
			if (node.alt) {
				return !isApplicable;
			}
			return isApplicable;
		},
		INPUT: ({ node, role, isApplicable }) => {
			switch (node.type) {
				case 'button':
				case 'image':
					return isApplicable;
				case 'checkbox':
					if (role === 'button' && node.hasAttribute('aria-pressed')) {
						return true;
					}
					return isApplicable;
				case 'radio':
					return role === 'menuitemradio';
				default:
					return false;
			}
		},
		LI: ({ node, isApplicable }) => {
			const hasImplicitListitemRole = node.matches('ol li, ul li');
			if (hasImplicitListitemRole) {
				return isApplicable;
			}
			return true;
		},
		LINK: ({ node }) => !node.href,
		MENU: ({ node }) => {
			if (node.getAttribute('type') === 'context') {
				return false;
			}
			return true;
		},
		OPTION: ({ node }) => {
			const withinOptionList = node.matches(
				'select > option, datalist > option, optgroup > option'
			);
			return !withinOptionList;
		},
		SELECT: ({ node, role }) =>
			!node.multiple && node.size <= 1 && role === 'menu',
		SVG: ({ node, isApplicable }) => {
			// if in svg context it all roles may be used
			if (
				node.parentNode &&
				node.parentNode.namespaceURI === 'http://www.w3.org/2000/svg'
			) {
				return true;
			}
			return isApplicable;
		}
	};

	const lookupTableRole = axe.commons.aria.lookupTable.role;
	const canHaveNoRole = lookupTableRole.NO_ROLE.allowedElements.includes(
		tagName
	);
	if (canHaveNoRole) {
		return false;
	}
	const canHaveAnyRole = lookupTableRole.ANY_ROLE.allowedElements.includes(
		tagName
	);
	if (canHaveAnyRole) {
		return true;
	}

	let isApplicable = false;
	if (lookupTableRole[role]) {
		isApplicable = isApplicableRoleForNode(node, lookupTableRole[role]);
	}
	if (elementCheck[tagName]) {
		// check if tag has a custom function to check its validity against various tags
		isApplicable = elementCheck[tagName]({ node, role, isApplicable });
	}
	return isApplicable;
}

/**
 * gets all unallowed roles for a given node
 * @method getAriaUnAllowedRoles
 * @param {Object} node HTMLElement to validate
 * @param {String} tagName tag name of a node
 * @param {String} allowImplicit option to allow implicit roles, defaults to true
 * @return {Array<String>} retruns an array of roles that are not allowed on the given node
 */
function getAriaUnAllowedRoles(node, tagName, allowImplicit) {
	/**
	 * Get roles applied to a given node
	 * @param {HTMLElement} node HTMLElement
	 * @return {Array<String>} return an array of roles applied to the node, if no roles, return an empty array.
	 */
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

	const roleSegments = getRoleSegments(node);
	const implicitRole = axe.commons.aria.implicitRole(node);

	// stores all roles that are not allowed for a specific element most often an element only has one explicit role
	const disallowedRoles = roleSegments.filter(role => {
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
		if (!validateAllowedAriaRole(node, tagName, role)) {
			return role;
		}
	});

	return disallowedRoles;
}
aria.getAriaUnAllowedRoles = getAriaUnAllowedRoles;

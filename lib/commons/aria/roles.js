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
 * Get roles applied to a given node
 * @method getRoleSegments
 * @memberof axe.commons.aria
 * @instance
 * @param {HTMLElement} node HTMLElement
 * @return {Array<String>} return an array of roles applied to the node, if no roles, return an empty array.
 */
aria.getRoleSegments = function(node) {
	let roles = [];
	if (node && node.hasAttribute('role')) {
		roles = roles.concat(node.getAttribute('role').split(' '));
	}
	if (node && node.hasAttributeNS('http://www.idpf.org/2007/ops', 'type')) {
		let rawEpubRoles = node.getAttributeNS(
			'http://www.idpf.org/2007/ops',
			'type'
		);
		let epubRoles = rawEpubRoles.split(' ');
		roles = roles.concat(
			epubRoles.map(role => {
				return `doc-${role}`;
			})
		);
	}
	return roles;
};

/**
 * Get roles applicable and or allowed for a given node/ HTMLElement
 * @method getApplicableRolesForNode
 * @instance
 * @param {HTMLElement} node HTMLElement
 * @return {Array<String>} return an array of roles applicable to the node, if no roles, return an empty array.
 * @private
 */
function getApplicableRolesForNode(node) {
	const tagName = node.tagName.toUpperCase();
	const nodeAttrs = Array.from(node.attributes).map(a => a.name.toUpperCase());

	const rolesTable = axe.commons.aria.lookupTable.role;
	return Object.keys(axe.commons.aria.lookupTable.role).reduce((out, role) => {
		const roleValue = rolesTable[role];
		if (
			roleValue.allowedElements &&
			Array.isArray(roleValue.allowedElements) &&
			roleValue.allowedElements.length
		) {
			// enumerate allowed elements and extract matching tagName
			roleValue.allowedElements.forEach(el => {
				// string
				if (typeof el === 'string') {
					if (el.toUpperCase() === tagName) {
						out.push(role);
					}
					return;
				}
				// object - match tag in allowedElement
				if (el.tagName.toUpperCase() === tagName) {
					if (!el.attributes) {
						out.push(role);
						return;
					}
					el.attributes.forEach(attr => {
						// check if attribute exsits
						if (nodeAttrs.includes(attr.name.toUpperCase())) {
							// check if value matches
							if (attr.value === '') {
								out.push(role);
								return;
							}
							const nodeAttrValue = node.getAttribute(attr).toUpperCase();
							if (attr.value.toUpperCase() === nodeAttrValue) {
								out.push(role);
								return;
							}
						}
					});
				}
			});
		}
		return out;
	}, []);
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
		a: (node, role, applicableRoles) => {
			if (node.namespaceURI === 'http://www.w3.org/2000/svg') {
				return true;
			}
			if (node.href) {
				return applicableRoles.includes(role);
			}
			return true;
		},
		area: node => !node.href,
		button: (node, role, applicableRoles) => {
			if (node.getAttribute('type') === 'menu') {
				return role === 'menuitem';
			}
			return applicableRoles.includes(role);
		},
		img: (node, role, applicableRoles) => {
			const hasAllowedEmptyAltRole = applicableRoles.includes(role);
			if (node.alt) {
				return !hasAllowedEmptyAltRole;
			}
			return hasAllowedEmptyAltRole;
		},
		input: (node, role, applicableRoles) => {
			switch (node.type) {
				case 'button':
					return applicableRoles.includes(role);
				case 'checkbox':
					if (role === 'button' && node.hasAttribute('aria-pressed')) {
						return true;
					}
					return applicableRoles.includes(role);
				case 'image':
					return applicableRoles.includes(role);
				case 'radio':
					return role === 'menuitemradio';
				default:
					return false;
			}
		},
		li: (node, role, applicableRoles) => {
			const hasImplicitListitemRole = node.matches('ol li, ul li');
			if (hasImplicitListitemRole) {
				return applicableRoles.includes(role);
			}
			return true;
		},
		link: node => !node.href,
		menu: node => {
			if (node.getAttribute('type') === 'context') {
				return false;
			}
			return true;
		},
		option: node => {
			const withinOptionList = node.matches(
				'select > option, datalist > option, optgroup > option'
			);
			return !withinOptionList;
		},
		select: (node, role) => !node.multiple && node.size <= 1 && role === 'menu',
		svg: (node, role, applicableRoles) => {
			// if in svg context it all roles may be used
			if (
				node.parentNode &&
				node.parentNode.namespaceURI === 'http://www.w3.org/2000/svg'
			) {
				return true;
			}
			return applicableRoles.includes(role);
		}
	};

	const canHaveNoRole = axe.commons.aria.lookupTable.role.NO_ROLE.allowedElements.includes(
		tagName
	);
	if (canHaveNoRole) {
		return false;
	}

	const canHaveAnyRole = axe.commons.aria.lookupTable.role.ANY_ROLE.allowedElements.includes(
		tagName
	);
	if (canHaveAnyRole) {
		return true;
	}

	let out = true;
	const applicableRoles = getApplicableRolesForNode(node);
	if (applicableRoles && !applicableRoles.includes(role)) {
		out = false;
	}
	if (elementCheck[tagName]) {
		// check if tag has a custom function to check its validity against various tags
		out = elementCheck[tagName](node, role, applicableRoles);
	}
	return out;
}

/**
 * validates role(s) for aria allowed (sub)roles conformance
 * @method validateAllowedAriaRole
 * @param {Object} node HTMLElement to validate
 * @param {String} tagName tag name of a node
 * @param {String} allowImplicit option to allow implicit roles, defaults to true
 * @return {Boolean} retruns true/false
 * @private
 */
aria.isAriaAllowedRole = function(node, tagName, allowImplicit) {
	const roleSegments = axe.commons.aria.getRoleSegments(node);
	const implicitRole = axe.commons.aria.implicitRole(node);

	// stores all roles that are not allowed for an specific element most often an element only has one explicit role
	const disallowedRoles = roleSegments.reduce((out, role) => {
		// check if an implicit role may be set explicit following a setting
		if (!allowImplicit && role === implicitRole) {
			// edge case: setting implicit role row on tr element is allowed when child of table[role='grid']
			if (
				!(
					role === 'row' &&
					tagName === 'tr' &&
					axe.commons.utils.matchesSelector('table[role="grid"] :scope')
				)
			) {
				out.push(role);
			}
		}

		if (!axe.commons.aria.isValidRole(role)) {
			// do not check made-up/ fake roles
			return out;
		}

		const allowed = validateAllowedAriaRole(node, tagName, role);
		if (!allowed) {
			out.push(role);
		}
		return out;
	}, []);

	if (disallowedRoles.length) {
		return false;
	}
	return true;
};

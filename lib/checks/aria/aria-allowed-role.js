/**
 * Implements allowed roles defined at:
 * https://www.w3.org/TR/html-aria/#docconformance
 * https://www.w3.org/TR/SVG2/struct.html#implicit-aria-semantics
 */
options = options || { allowImplicit: true, ignoredTags: [] };

const tagName = node.tagName.toLowerCase();

// check if the element should be ignored, by an user setting
if (options.ignoredTags && options.ignoredTags.indexOf(tagName) > -1) {
	return true;
}

const roleSegments = axe.commons.aria.getRoleSegments(node);
const implicitRole = axe.commons.aria.implicitRole(node);

/**
 * Helper object with functions to computed is role allowed for a given tag
 */
const elementCheck = {
	a: (node, role) => {
		if (node.namespaceURI === 'http://www.w3.org/2000/svg') {
			return true;
		}
		if (node.href) {
			return axe.commons.aria.isAllowedSubsetRole('aWithHref', role);
		} else {
			return true;
		}
	},
	area: (node) => !(node.href),
	button: (node, role) => {
		if (node.getAttribute('type') === 'menu') {
			return role === 'menuitem';
		}
		return axe.commons.aria.isAllowedSubsetRole('button', role);
	},
	img: (node, role) => {
		const hasAllowedEmptyAltRole = axe.commons.aria.isAllowedSubsetRole('imgWithEmptyAlt', role);
		if (node.alt) {
			// any role except the roles used by empty alt values
			return !hasAllowedEmptyAltRole;
		} else {
			return hasAllowedEmptyAltRole;
		}
	},
	input: (node, role) => {
		switch (node.type) {
		case 'button':
			return axe.commons.aria.isAllowedSubsetRole('inputTypeButton', role);
		case 'checkbox':
			if (role === 'button' && node.hasAttribute('aria-pressed')) {
				return true;
			}
			return axe.commons.aria.isAllowedSubsetRole('inputTypeCheckbox', role);
		case 'image':
			return axe.commons.aria.isAllowedSubsetRole('inputTypeImage', role);
		case 'radio':
			return role === 'menuitemradio';
		default:
			return false;
		}
	},
	li: (node, role) => {
		const hasImplicitListitemRole = node.matches('ol li, ul li');
		if (hasImplicitListitemRole) {
			return axe.commons.aria.isAllowedSubsetRole('li', role);
		} else {
			return true;
		}
	},
	link: (node) => !(node.href),
	menu: (node) => {
		if (node.getAttribute('type') === 'context') {
			return false;
		}
		return true;
	},
	option: (node) => {
		const withinOptionList = node.matches('select > option, datalist > option, optgroup > option');
		return !withinOptionList;
	},
	select: (node, role) => (!node.multiple && node.size <= 1 && role === 'menu'),
	svg: (node, role) => {
		// if in svg context it all roles may be used
		if (node.parentNode && node.parentNode.namespaceURI === 'http://www.w3.org/2000/svg') {
			return true;
		}
		return axe.commons.aria.isAllowedSubsetRole('svg', role);
	}
};

// stores all roles that are not allowed for an specific element, most often an element only as one explicit role
const disallowedRoles = roleSegments.reduce((out, role) => {
	let allowed = true;
	// check if an implicit role may be set explicit following a setting
	if (!options.allowImplicit &&
		role === implicitRole) {
		// edge case: setting implicit role row on tr element is allowed when child of table[role='grid']
		if (!(role === 'row' &&
			tagName === 'tr' &&
			axe.commons.utils.matchesSelector('table[role="grid"] :scope'))) {
			out.push(role);
		}
	}
	// check within if the element has an allowed subset of roles
	if (allowed) {
		allowed = axe.commons.aria.isAllowedRole(tagName, role);
	}

	// check if tag has a custom function to check its validity against various tags
	if (allowed && elementCheck[tagName]) {
		allowed = elementCheck[tagName](node, role);
	}
	if (!allowed) {
		out.push(role);
	}
	return out;
}, []);

if (disallowedRoles.length) {
	return false;
}

return true;

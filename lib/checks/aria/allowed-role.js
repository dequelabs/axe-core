/**
 * Implements allowed roles defined at:
 * * https://www.w3.org/TR/html-aria/#docconformance
 * * https://www.w3.org/TR/SVG2/struct.html#implicit-aria-semantics
 */

options = options || {
	allowImplicit: true,
	ignoredTags: []
};

/**
 * Stores info which is used in functions of elementCheck or with elementsWithAnAllowedSubset,
 * mostly a key as tagName with an array of allowed roles for that tag
 * @type {Object}
 */
var roleSubset = {
	'aWithHref': [
		'button', 'checkbox', 'menuitem', 'menuitemcheckbox', 'menuitemradio',
		'option', 'radio', 'switch', 'tab', 'treeitem', 'doc-backlink',
		'doc-biblioref', 'doc-glossref', 'doc-noteref'
	],
	'button': [
		'checkbox', 'link', 'menuitem', 'menuitemcheckbox', 'menuitemradio',
		'option', 'radio', 'switch', 'tab'
	],
	'imgWithEmptyAlt': [ 'presentation', 'none' ],
	'inputTypeButton': [
		'link', 'menuitem', 'menuitemcheckbox', 'menuitemradio', 'radio', 'switch',
		'option', 'tab'
	],
	'inputTypeImage': [
		'link', 'menuitem', 'menuitemcheckbox', 'menuitemradio', 'radio', 'switch'
	],
	'inputTypeCheckbox': [ 'menuitemcheckbox', 'option', 'switch' ],
	'li': [
		'menuitem', 'menuitemcheckbox', 'menuitemradio', 'option', 'none',
		'presentation', 'radio', 'separator', 'tab', 'treeitem', 'doc-biblioentry',
		'doc-endnote'
	],
	'svg': [ 'application', 'document', 'img' ]
};

/**
 * Checks if given role is allowed for given tag
 * @param  {string}  tagName key of roleSubset
 * @param  {string}  role    current role
 * @return {Boolean}         True if allowed
 */
function withinSubset(tagName, role) {
	if(!roleSubset[tagName]) {
		return false;
	}

	return roleSubset[tagName].indexOf(role) > -1;
}

/**
 * Contains a function for each htmlTag where not all roles allowed
 * @type {Object}
 */
var elementCheck = {
	a: (node, role) => {
		if(node.namespaceURI === 'http://www.w3.org/2000/svg') {
			return true;
		}

		if(node.href) {
			return withinSubset('aWithHref', role);
		} else {
			return true;
		}
	},
	area: (node) => !(node.href),
	button: (node, role) => {
		if(node.getAttribute('type') === 'menu' ) {
			return role === 'menuitem';
		}
		return withinSubset('button', role);
	},
	img: (node, role) => {
		var hasAllowedEmptyAltRole = withinSubset('imgWithEmptyAlt', role);

		if(node.alt) {
      // any role except the roles used by empty alt values
			return !hasAllowedEmptyAltRole;
		} else {
			return hasAllowedEmptyAltRole;
		}
	},
	input: (node, role) => {
		switch(node.type) {
			case 'button':
				return withinSubset('inputTypeButton', role);
			case 'checkbox':
				if(role === 'button' && node.hasAttribute('aria-pressed')) {
					return true;
				}
				return withinSubset('inputTypeCheckbox', role);
			case 'image':
				return withinSubset('inputTypeImage', role);
			case 'radio':
				return role === 'menuitemradio';
			default:
				return false;
		}
	},
	li: (node, role) => {
		let hasImplicitListitemRole = node.matches('ol li, ul li');

		if(hasImplicitListitemRole) {
			return withinSubset('li', role);
		} else {
			return true;
		}
	},
	link: (node) => !(node.href),
	menu: (node) => {
		if(node.getAttribute('type') === 'context'){
			return false;
		}
		return true;
	},
	option: (node) => {
		let withinOptionList = node.matches('select > option, datalist > option, optgroup > option');
		return !withinOptionList;
	},
	select: (node, role) => (!node.multiple && node.size <= 1 && role === 'menu'),
	svg: (node, role) => {
    // if in svg context it all roles may be used
		if(node.parentNode && node.parentNode.namespaceURI === 'http://www.w3.org/2000/svg') {
			return true;
		}

		return withinSubset('svg', role);
	}
};

var roleSegments = axe.commons.aria.getRoleSegments(node);
var implicitRole = axe.commons.aria.implicitRole(node);
var tagName = axe.utils.getTagName(node);

// stores all roles that are not allowed for an specific element,
// most often an element only as one explicit role
var disallowedRoles = [];

// check if should the element should be ignored, by an user setting
if (options.ignoredTags && options.ignoredTags.indexOf(tagName) > -1) {
	return true;
}

roleSegments.forEach(function(role) {
	var allowed = true;

	// check if an implicit role may be set explicit following a setting
	if (!options.allowImplicit && role === implicitRole) {
    // edge case: setting implicit role row on tr element is allowed when child of table[role='grid']
		if (!(role === 'row' && tagName === 'tr' && axe.commons.utils.matchesSelector('table[role="grid"] :scope'))) {
			disallowedRoles.push(role);
		}
	}

  // check within if the element has an allowed subset of roles
	if (allowed) {
		allowed = axe.commons.aria.isAllowedRole(tagName, role);
	}

	// check if tag has a custom function to check its validity
	if (allowed && elementCheck[tagName]) {
		allowed = elementCheck[tagName](node, role);
	}

	if(!allowed) {
		disallowedRoles.push(role);
	}
});

if (disallowedRoles.length) {
	// this.data(disallowedRoles);
	return false;
}

return true;

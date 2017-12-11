/**
 * Implements allowed roles defined at:
 * * https://www.w3.org/TR/html-aria/#docconformance
 * * https://www.w3.org/TR/SVG2/struct.html#implicit-aria-semantics
 */

var elementsHasNoAllowedRoles = [
	'base', 'body', 'caption', 'col', 'colgroup', 'datalist', 'dd', 'details',
	'dt', 'head', 'html', 'keygen', 'label', 'legend', 'main', 'map',
	'math', 'menuitem', 'meta', 'meter', 'noscript', 'optgroup', 'param',
	'picture', 'progress', 'script', 'source', 'style', 'summary', 'template',
	'textarea', 'title', 'track', 'clipPath', 'cursor', 'defs', 'desc', 'feBlend',
	'feColorMatrix', 'feComponentTransfer', 'feComposite', 'feConvolveMatrix',
	'feDiffuseLighting', 'feDisplacementMap', 'feDistantLight', 'feDropShadow',
	'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR', 'feGaussianBlur',
	'feImage', 'feMerge', 'feMergeNode', 'feMorphology', 'feOffset',
	'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile', 'feTurbulence',
	'filter', 'hatch', 'hatchpath', 'linearGradient', 'marker', 'mask',
	'meshgradient', 'meshpatch', 'meshrow', 'metadata', 'mpath', 'pattern',
	'radialGradient', 'solidcolor', 'stop', 'switch', 'view'
];

var elementsWithAnAllowedSubset = [
	'article', 'aside', 'audio', 'dialog', 'dl', 'embed', 'figcaption',
	'fieldset', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
	'header', 'hr', 'iframe', 'nav', 'object', 'ol', 'section', 'ul', 'video'
];

/**
 * Stores info which is used in functions of customElementCheck or with elementsWithAnAllowedSubset,
 * mostly a key as tagName with an array of allowed roles for that tag
 * @type {Object}
 */
var allowedSubsets = {
	'aWithHref': [
		'button', 'checkbox', 'menuitem', 'menuitemcheckbox', 'menuitemradio',
		'option', 'radio', 'switch', 'tab', 'treeitem', 'doc-backlink',
		'doc-biblioref', 'doc-glossref', 'doc-noteref'
	],
	'article': [
		'feed', 'presentation', 'none', 'document', 'application', 'main', 'region'
	],
	'aside': [
		'feed', 'note', 'presentation', 'none', 'region', 'search', 'doc-example',
		'doc-footnote', 'doc-pullquote', 'doc-tip'
	],
	'audio': [ 'application' ],
	'button': [
		'checkbox', 'link', 'menuitem', 'menuitemcheckbox', 'menuitemradio',
		'option', 'radio', 'switch', 'tab'
	],
	'dialog': ['alertdialog'],
	'dl': ['group', 'presentation', 'none', 'doc-glossary'],
	'embed': [ 'application', 'document', 'presentation', 'none', 'img' ],
	'figcaption': [ 'group', 'presentation', 'none' ],
	'figure': [ 'group', 'presentation', 'none' ],
	'fieldset': 	[ 'group', 'presentation', 'none' ],
	'footer': [ 'group', 'none', 'presentation', 'doc-footnote' ],
	'form': [ 'search', 'none', 'presentation' ],
	'h1': [ 'tab', 'none', 'presentation', 'doc-subtitle' ],
	'h2': [ 'tab', 'none', 'presentation', 'doc-subtitle' ],
	'h3': [ 'tab', 'none', 'presentation', 'doc-subtitle' ],
	'h4': [ 'tab', 'none', 'presentation', 'doc-subtitle' ],
	'h5': [ 'tab', 'none', 'presentation', 'doc-subtitle' ],
	'h6': [ 'tab', 'none', 'presentation', 'doc-subtitle' ],
	'header': [ 'group', 'none', 'presentation', 'doc-footnote' ],
	'hr': [ 'presentation', 'doc-pagebreak' ],
	'iframe': [ 'application', 'document', 'img' ],
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
	'nav': [ 'doc-index', 'doc-pagelist', 'doc-toc' ],
	'object': [ 'application', 'document', 'img' ],
	'ol': [
		'directory', 'group', 'listbox', 'menu', 'menubar', 'none', 'presentation',
		'radiogroup', 'tablist', 'toolbar', 'tree'
	],
	'section': [
		'alert', 'alertdialog', 'application', 'banner', 'complementary',
		'contentinfo', 'dialog', 'document', 'feed', 'log', 'main', 'marquee',
		'navigation', 'none', 'presentation', 'search', 'status', 'tabpanel',
		'doc-abstract', 'doc-acknowledgments', 'doc-afterword', 'doc-appendix',
		'doc-bibliography', 'doc-chapter', 'doc-colophon', 'doc-conclusion',
		'doc-credit', 'doc-credits', 'doc-dedication', 'doc-endnotes', 'doc-epilogue',
		'doc-errata', 'doc-example', 'doc-foreword', 'doc-index', 'doc-introduction',
		'doc-notice', 'doc-pagelist', 'doc-part', 'doc-preface', 'doc-prologue',
		'doc-pullquote', 'doc-qna', 'doc-toc'
	],
	'svg': [ 'application', 'document', 'img' ],
	'ul': [
		'directory', 'group', 'listbox', 'menu', 'menubar', 'radiogroup',
		'tablist', 'toolbar', 'tree', 'presentation'
	],
	'video': [ 'application' ]
};

/**
 * Returns the tagName,
 * if it is a HTMLElement it gets lowercased
 * @param  {Element} el element
 * @return {String}     normalized tagName
 */
function getNormalizedTagName(el) {
	if (el.namespaceURI === 'http://www.w3.org/1999/xhtml') {
		return el.tagName.toLowerCase();
	}

	return el.tagName;
}

/**
 * Finds nearest parent with a specifig tagName
 * @param  {Element} 				el      child - starting pointer
 * @param  {Array<String>} 	tagName Array containg capatilized tagnames
 * @return {Element}                Parent that matches one of the tagnames
 */
function getParentWithTagName(el, tagName) {
	while (el.parentNode){
		if(tagName.indexOf(el.tagName) > -1) { return el; }
		el = el.parentNode;
	}
}

/**
 * Checks if given role is allowed for given tag
 * @param  {string}  tagName key of allowedSubsets
 * @param  {string}  role    current role
 * @return {Boolean}         True if allowed
 */
function hasAllowedRole(tagName, role) {
	if(!allowedSubsets[tagName]) {
		return false;
	}

	return allowedSubsets[tagName].indexOf(role) > -1;
}

/**
 * Contains a function for each htmlTag where not all roles allowed
 * @type {Object}
 */
var customElementCheck = {
	a: (node, role) => {
		if(node.namespaceURI === 'http://www.w3.org/2000/svg') {
			return true;
		}

		if(node.href) {
			return hasAllowedRole('aWithHref', role);
		} else {
			return true;
		}
	},
	area: (node) => !(node.href),
	button: (node, role) => {
		if(node.getAttribute('type') === 'menu' ) {
			return role === 'menuitem';
		}
		return hasAllowedRole('button', role);
	},
	img: (node, role) => {
		var hasAllowedEmptyAltRole = hasAllowedRole('imgWithEmptyAlt', role);

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
				return hasAllowedRole('inputTypeButton', role);
			case 'checkbox':
				if(role === 'button' && node.hasAttribute('aria-pressed')) {
					return true;
				}
				return hasAllowedRole('inputTypeCheckbox', role);
			case 'image':
				return hasAllowedRole('inputTypeImage', role);
			case 'radio':
				return role === 'menuitemradio';
			default:
				return false;
		}
	},
	li: (node, role) => {
		let hasImplicitListitemRole = getParentWithTagName(node, ['OL', 'UL']);

		if(hasImplicitListitemRole) {
			return hasAllowedRole('li', role);
		} else {
			return true;
		}
	},
	link: (node) => !(node.href),
	menu: (node) => {
		if(node.type === 'context'){
			return false;
		}
		return true;
	},
	option: (node) => {
		let withinOptionList = ['SELECT', 'OPTGROUP', 'DATALIST'].indexOf(node.parentNode.tagName) > -1;
		return !withinOptionList;
	},
	select: (node, role) => (!node.multiple && node.size <= 1 && role === 'menu'),
	svg: (node, role) => {
    // if in svg context it all roles may be used
		if(node.parentNode && node.parentNode.namespaceURI === 'http://www.w3.org/2000/svg') {
			return true;
		}

		return hasAllowedRole('svg', role);
	}
};

var role = node.getAttribute('role');
var tagName = getNormalizedTagName(node);
var result = true;

// check if tag is allowed to have a role
if(elementsHasNoAllowedRoles.indexOf(tagName) > -1) {
	result = false;
}

// check if tag has a custom function to check its validity
if (result && customElementCheck[tagName]) {
	result = customElementCheck[tagName](node, role);
}

// check if the tag allows a subset of all allowed roles
if(result && elementsWithAnAllowedSubset.indexOf(tagName) > -1) {
	result = hasAllowedRole(tagName, role);
}

// disallow the use of implicit roles
var implicitRole = axe.commons.aria.implicitRole(node);
if(result && role === implicitRole){
	result = false;
}

// all roles are allowed for given tag
return result;

/*! FireEyes Rule Library v1.0.0
 * Copyright (c) 2013 Deque Systems, Inc.
 */
(function (global) {

var felib = {};

var aria = felib.aria = {},
	lookupTables = aria._lut = {};

lookupTables.attributeTypes = {
	'aria-activedescendant': {
		type: 'http://www.w3.org/2001/XMLSchema#idref'
	},
	'aria-atomic': {
		type: 'http://www.w3.org/2001/XMLSchema#boolean',
		values: ['true', 'false']
	},
	'aria-autocomplete': {
		type: 'http://www.w3.org/2001/XMLSchema#nmtoken',
		values: ['inline', 'list', 'both', 'none']
	},
	'aria-busy': {
		type: 'http://www.w3.org/2001/XMLSchema#boolean',
		values: ['true', 'false']
	},
	'aria-checked': {
		type: 'http://www.w3.org/2001/XMLSchema#nmtoken',
		values: ['true', 'false', 'mixed', 'undefined']
	},
	'aria-controls': {
		type: 'http://www.w3.org/2001/XMLSchema#idrefs'
	},
	'aria-describedby': {
		type: 'http://www.w3.org/2001/XMLSchema#idrefs'
	},
	'aria-disabled': {
		type: 'http://www.w3.org/2001/XMLSchema#boolean',
		values: ['true', 'false']
	},
	'aria-dropeffect': {
		type: 'http://www.w3.org/2001/XMLSchema#nmtokens',
		values: ['copy', 'move', 'reference', 'execute', 'popup', 'none']
	},
	'aria-expanded': {
		type: 'http://www.w3.org/2001/XMLSchema#nmtoken',
		values: ['true', 'false', 'undefined']
	},
	'aria-flowto': {
		type: 'http://www.w3.org/2001/XMLSchema#idrefs'
	},
	'aria-grabbed': {
		type: 'http://www.w3.org/2001/XMLSchema#nmtoken',
		values: ['true', 'false', 'undefined']
	},
	'aria-haspopup': {
		type: 'http://www.w3.org/2001/XMLSchema#boolean',
		values: ['true', 'false']
	},
	'aria-hidden': {
		type: 'http://www.w3.org/2001/XMLSchema#boolean',
		values: ['true', 'false']
	},
	'aria-invalid': {
		type: 'http://www.w3.org/2001/XMLSchema#nmtoken',
		values: ['true', 'false', 'spelling', 'grammar']
	},
	'aria-label': {
		type: 'http://www.w3.org/2001/XMLSchema#string'
	},
	'aria-labelledby': {
		type: 'http://www.w3.org/2001/XMLSchema#idrefs'
	},
	'aria-level': {
		type: 'http://www.w3.org/2001/XMLSchema#int'
	},
	'aria-live': {
		type: 'http://www.w3.org/2001/XMLSchema#nmtoken',
		values: ['off', 'polite', 'assertive']
	},
	'aria-multiline': {
		type: 'http://www.w3.org/2001/XMLSchema#boolean',
		values: ['true', 'false']
	},
	'aria-multiselectable': {
		type: 'http://www.w3.org/2001/XMLSchema#boolean',
		values: ['true', 'false']
	},
	'aria-orientation' : {
		type : 'http://www.w3.org/2001/XMLSchema#nmtoken',
		values : ['horizontal', 'vertical']
	},
	'aria-owns': {
		type: 'http://www.w3.org/2001/XMLSchema#idrefs'
	},
	'aria-posinset': {
		type: 'http://www.w3.org/2001/XMLSchema#int'
	},
	'aria-pressed': {
		type: 'http://www.w3.org/2001/XMLSchema#nmtoken',
		values: ['true', 'false', 'mixed', 'undefined']
	},
	'aria-readonly': {
		type: 'http://www.w3.org/2001/XMLSchema#boolean',
		values: ['true', 'false']
	},
	'aria-relevant': {
		type: 'http://www.w3.org/2001/XMLSchema#nmtokens',
		values: ['additions', 'removals', 'text', 'all']
	},
	'aria-required': {
		type: 'http://www.w3.org/2001/XMLSchema#boolean',
		values: ['true', 'false']
	},
	'aria-selected': {
		type: 'http://www.w3.org/2001/XMLSchema#nmtoken',
		values: ['true', 'false', 'undefined']
	},
	'aria-setsize': {
		type: 'http://www.w3.org/2001/XMLSchema#int'
	},
	'aria-sort': {
		type: 'http://www.w3.org/2001/XMLSchema#nmtoken',
		values: ['ascending', 'descending', 'other', 'none']
	},
	'aria-valuemax': {
		type: 'http://www.w3.org/2001/XMLSchema#decimal'
	},
	'aria-valuemin': {
		type: 'http://www.w3.org/2001/XMLSchema#decimal'
	},
	'aria-valuenow': {
		type: 'http://www.w3.org/2001/XMLSchema#decimal'
	},
	'aria-valuetext': {
		type: 'http://www.w3.org/2001/XMLSchema#string'
	}
};

lookupTables.globalAttributes = [
	'aria-atomic', 'aria-busy', 'aria-controls', 'aria-describedby',
	'aria-disabled', 'aria-dropeffect', 'aria-flowto', 'aria-grabbed',
	'aria-haspopup', 'aria-hidden', 'aria-invalid', 'aria-label',
	'aria-labelledby', 'aria-live', 'aria-owns', 'aria-relevant'
];

lookupTables.role = {
	'alert': {
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		context: null
	},
	'alertdialog': {
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		context: null
	},
	'application': {
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		context: null
	},
	'article': {
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		context: null,
		implicit: ['article']
	},
	'banner': {
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		context: null
	},
	'button': {
		attributes: {
			allowed: ['aria-expanded', 'aria-pressed']
		},
		owned: null,
		context: null,
		implicit: ['button', 'input[type="button"]', 'input[type="image"]']
	},
	'checkbox': {
		attributes:  {
			allowed: ['aria-autocomplete', 'aria-required', 'aria-activedescendant'],
			required: ['aria-checked']
		},
		owned: null,
		context: null,
		implicit: ['input[type="checkbox"]']
	},
	'columnheader': {
		attributes: {
			allowed: ['aria-expanded', 'aria-sort', 'aria-readonly', 'aria-selected', 'aria-required']
		},
		owned: null,
		context: ['row']
	},
	'combobox': {
		attributes:  {
			required: ['aria-expanded'],
			allowed: ['aria-autocomplete', 'aria-required', 'aria-activedescendant']
		},
		owned: {
			all: ['listbox', 'textbox']
		},
		context: null
	},
	'complementary': {
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		context: null,
		implicit: ['aside']
	},
	'contentinfo': {
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		context: null
	},
	'definition': {
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		context: null
	},
	'dialog': {
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		context: null,
		implicit: ['dialog']
	},
	'directory': {
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		context: null
	},
	'document': {
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		context: null,
		implicit: ['body']
	},
	'form': {
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		context: null
	},
	'grid': {
		attributes: {
			allowed: ['aria-level', 'aria-multiselectable', 'aria-readonly', 'aria-activedescendant', 'aria-expanded']
		},
		owned: {
			one: ['rowgroup', 'row']
		},
		context: null
	},
	'gridcell': {
		attributes: {
			allowed: ['aria-selected', 'aria-readonly', 'aria-expanded', 'aria-required']
		},
		owned: null,
		context: ['row']
	},
	'group': {
		attributes: {
			allowed: ['aria-activedescendant', 'aria-expanded']
		},
		owned: null,
		context: null,
		implicit: ['details']
	},
	'heading': {
		attributes: {
			allowed: ['aria-level', 'aria-expanded']
		},
		owned: null,
		context: null,
		implicit: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
	},
	'img': {
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		context: null,
		implicit: ['img']
	},
	'link': {
		attributes: null,
		owned: null,
		context: null,
		implicit: ['a[href]']
	},
	'list': {
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: {
			all: ['listitem']
		},
		context: null,
		implicit: ['ol', 'ul']
	},
	'listbox': {
		attributes: {
			allowed: ['aria-activedescendant', 'aria-multiselectable', 'aria-required', 'aria-expanded']
		},
		owned: {
			all: ['option']
		},
		context: null,
		implicit: ['select']
	},
	'listitem': {
		attributes: {
			allowed: ['aria-level', 'aria-posinset', 'aria-setsize', 'aria-expanded']
		},
		owned: null,
		context: ['list'],
		implicit: ['li']
	},
	'log': {
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		context: null
	},
	'main': {
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		context: null
	},
	'marquee': {
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		context: null
	},
	'math': {
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		context: null
	},
	'menu': {
		attributes: {
			allowed: ['aria-activedescendant', 'aria-expanded']
		},
		owned: {
			one: ['menuitem', 'menuitemradio', 'menuitemcheckbox']
		},
		context: null
	},
	'menubar': {
		attributes: {
			allowed: ['aria-activedescendant', 'aria-expanded']
		},
		owned: null,
		context: null
	},
	'menuitem': {
		attributes: null,
		owned: null,
		context: ['menu', 'menubar']
	},
	'menuitemcheckbox': {
		attributes: {
			required: ['aria-checked']
		},
		owned: null,
		context: ['menu', 'menubar']
	},
	'menuitemradio': {
		attributes:  {
			allowed: ['aria-selected', 'aria-posinset', 'aria-setsize'],
			required: ['aria-checked']
		},
		owned: null,
		context: ['menu', 'menubar']
	},
	'navigation': {
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		context: null
	},
	'note': {
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		context: null
	},
	'option': {
		attributes: {
			allowed: ['aria-selected', 'aria-posinset', 'aria-setsize', 'aria-expanded', 'aria-checked']
		},
		owned: null,
		context: ['listbox']
	},
	'presentation': {
		attributes: null,
		owned: null,
		context: null
	},
	'progressbar': {
		attributes: {
			allowed: ['aria-valuetext', 'aria-valuenow', 'aria-valuemax', 'aria-valuemin']
		},
		owned: null,
		context: null
	},
	'radio': {
		attributes:  {
			allowed: ['aria-selected', 'aria-posinset', 'aria-setsize'],
			required: ['aria-checked']
		},
		owned: null,
		context: null,
		implicit: ['input[type="radio"]']
	},
	'radiogroup': {
		attributes: {
			allowed: ['aria-activedescendant', 'aria-required', 'aria-expanded']
		},
		owned: {
			all: ['radio']
		},
		context: null
	},
	'region': {
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		context: null,
		implicit: ['section']
	},
	'row': {
		attributes: {
			allowed: ['aria-level', 'aria-selected', 'aria-activedescendant', 'aria-expanded']
		},
		owned: {
			one: ['columnheader', 'rowheader', 'gridcell']
		},
		context:  ['rowgroup', 'grid', 'treegrid']
	},
	'rowgroup': {
		attributes: {
			allowed: ['aria-activedescendant', 'aria-expanded']
		},
		owned: {
			all: ['row']
		},
		context:  ['grid']
	},
	'rowheader': {
		attributes: {
			allowed: ['aria-sort', 'aria-required', 'aria-readonly', 'aria-expanded', 'aria-selected']
		},
		owned: null,
		context: ['row']
	},
	'scrollbar': {
		attributes: {
			required: ['aria-controls', 'aria-orientation', 'aria-valuenow', 'aria-valuemax', 'aria-valuemin']
		},
		owned: null,
		context: null
	},
	'search': {
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		context: null
	},
	'separator': {
		attributes: {
			allowed: ['aria-expanded', 'aria-orientation']
		},
		owned: null,
		context: null
	},
	'slider': {
		attributes: {
			allowed: ['aria-valuetext', 'aria-orientation'],
			required: ['aria-valuenow', 'aria-valuemax', 'aria-valuemin']
		},
		owned: null,
		context: null
	},
	'spinbutton': {
		attributes: {
			allowed: ['aria-valuetext', 'aria-required'],
			required: ['aria-valuenow', 'aria-valuemax', 'aria-valuemin']
		},
		owned: null,
		context: null
	},
	'status': {
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		context: null,
		implicit: ['output']
	},
	'tab': {
		attributes: {
			allowed: ['aria-selected', 'aria-expanded']
		},
		owned: null,
		context: ['tablist']
	},
	'tablist': {
		attributes: {
			allowed: ['aria-activedescendant', 'aria-expanded', 'aria-level']
		},
		owned: {
			all: ['tab']
		},
		context: null
	},
	'tabpanel': {
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		context: null
	},
	'textbox': {
		attributes: {
			allowed: ['aria-activedescendant', 'aria-autocomplete', 'aria-multiline', 'aria-readonly', 'aria-required']
		},
		owned: null,
		context: null,
		implicit: ['input[type="text"]', 'input:not([type])']
	},
	'timer': {
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		context: null
	},
	'toolbar': {
		attributes: {
			allowed: ['aria-activedescendant', 'aria-expanded']
		},
		owned: null,
		context: null,
		implicit: ['menu[type="toolbar"]']
	},
	'tooltip': {
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		context: null
	},
	'tree': {
		attributes: {
			allowed: ['aria-activedescendant', 'aria-multiselectable', 'aria-required', 'aria-expanded']
		},
		owned: {
			all: ['treeitem']
		},
		context: null
	},
	'treegrid': {
		attributes: {
			allowed: ['aria-activedescendant', 'aria-expanded', 'aria-level', 'aria-multiselectable',
				'aria-readonly', 'aria-required']
		},
		owned: {
			all: ['treeitem']
		},
		context: null
	},
	'treeitem': {
		attributes: {
			allowed: ['aria-checked', 'aria-selected', 'aria-expanded', 'aria-level', 'aria-posinset', 'aria-setsize']
		},
		owned: null,
		context: ['treegrid', 'tree']
	}
};

var color = {};
felib.color = color;
var dom = {};
felib.dom = dom;
var events = {};
felib.events = events;
var image = {};
felib.image = image;
var legacy = felib.legacy = {};
var text = {};
felib.text = text;
var utils = {};
felib.utils = utils;
/*global aria, utils, lookupTables */


aria.requiredAttr = function getAriaRequiredAttributes(role) {
	'use strict';
	var roles = lookupTables.role[role],
		attr = roles && roles.attributes && roles.attributes.required;
	return attr || [];
};

aria.allowedAttr = function getAriaAllowedAttributes(role) {
	'use strict';
	var roles = lookupTables.role[role],
		attr = (roles && roles.attributes && roles.attributes.allowed) || [];
	return attr.concat(lookupTables.globalAttributes);
};

aria.validateAttr = function testAriaAttributeValid(att) {
	'use strict';
	return !!lookupTables.attributeTypes[att];
};

aria.validateAttrValue = function testAriaNodeAttributeType(node, attr) {
	'use strict';
	var ids, index, length, matches,
		doc = node.ownerDocument,
		value = node.getAttribute(attr),
		attrInfo = lookupTables.attributeTypes[attr];

	if (!attrInfo) {
		return true;

	} else if (attrInfo.values) {
		if (attrInfo.values.indexOf(value) !== -1) {
			return true;
		}
		return false;
	}

	switch (attrInfo.type) {
	case 'http://www.w3.org/2001/XMLSchema#idref':
		return !!(value && doc.getElementById(value));

	case 'http://www.w3.org/2001/XMLSchema#idrefs':
		ids = utils.tokenList(value);
		for (index = 0, length = ids.length; index < length; index++) {
			if (ids[index] && !doc.getElementById(ids[index])) {
				return false;
			}
		}
		// not valid if there are no elements
		return !!ids.length;

	case 'http://www.w3.org/2001/XMLSchema#string':
		// anything goes
		return true;

	case 'http://www.w3.org/2001/XMLSchema#decimal':
		matches = value.match(/^[-+]?([0-9]*)\.?([0-9]*)$/);
		return !!(matches && (matches[1] || matches[2]));

	case 'http://www.w3.org/2001/XMLSchema#int':
		return (/^[-+]?[0-9]+$/).test(value);
	}
};

/*global aria, lookupTables */

aria.isValidRole = function isValidAriaRole(role) {
	'use strict';
	if (lookupTables.role[role]) {
		return true;
	}

	return false;
};

aria.requiredOwned = function getAriaRequiredChildren(role) {
	'use strict';
	var owned = null,
		roles = lookupTables.role[role];

	if (roles) {
		owned = utils.clone(roles.owned);
	}
	return owned;
};


aria.requiredContext = function getAriaRequiredParents(role) {
	'use strict';
	var context = null,
		roles = lookupTables.role[role];

	if (roles) {
		context = utils.clone(roles.context);
	}
	return context;
};

aria.implicitNodes = function (role) {
	'use strict';

	var implicit = null,
		roles = lookupTables.role[role];

	if (roles && roles.implicit) {
		implicit = utils.clone(roles.implicit);
	}
	return implicit;
};
/*global color */

var colorWordLookupTable = {
	aliceblue: '#f0f8ff',
	antiquewhite: '#faebd7',
	aqua: '#00ffff',
	aquamarine: '#7fffd4',
	azure: '#f0ffff',
	beige: '#f5f5dc',
	bisque: '#ffe4c4',
	black: '#000000',
	blanchedalmond: '#ffebcd',
	blue: '#0000ff',
	blueviolet: '#8a2be2',
	brown: '#a52a2a',
	burlywood: '#deb887',
	cadetblue: '#5f9ea0',
	chartreuse: '#7fff00',
	chocolate: '#d2691e',
	coral: '#ff7f50',
	cornflowerblue: '#6495ed',
	cornsilk: '#fff8dc',
	crimson: '#dc143c',
	cyan: '#00ffff',
	darkblue: '#00008b',
	darkcyan: '#008b8b',
	darkgoldenrod: '#b8860b',
	darkgray: '#a9a9a9',
	darkgrey: '#a9a9a9',
	darkgreen: '#006400',
	darkkhaki: '#bdb76b',
	darkmagenta: '#8b008b',
	darkolivegreen: '#556b2f',
	darkorange: '#ff8c00',
	darkorchid: '#9932cc',
	darkred: '#8b0000',
	darksalmon: '#e9967a',
	darkseagreen: '#8fbc8f',
	darkslateblue: '#483d8b',
	darkslategray: '#2f4f4f',
	darkslategrey: '#2f4f4f',
	darkturquoise: '#00ced1',
	darkviolet: '#9400d3',
	deeppink: '#ff1493',
	deepskyblue: '#00bfff',
	dimgray: '#696969',
	dimgrey: '#696969',
	dodgerblue: '#1e90ff',
	firebrick: '#b22222',
	floralwhite: '#fffaf0',
	forestgreen: '#228b22',
	fuchsia: '#ff00ff',
	gainsboro: '#dcdcdc',
	ghostwhite: '#f8f8ff',
	gold: '#ffd700',
	goldenrod: '#daa520',
	gray: '#808080',
	grey: '#808080',
	green: '#008000',
	greenyellow: '#adff2f',
	honeydew: '#f0fff0',
	hotpink: '#ff69b4',
	indianred : '#cd5c5c',
	indigo : '#4b0082',
	ivory: '#fffff0',
	khaki: '#f0e68c',
	lavender: '#e6e6fa',
	lavenderblush: '#fff0f5',
	lawngreen: '#7cfc00',
	lemonchiffon: '#fffacd',
	lightblue: '#add8e6',
	lightcoral: '#f08080',
	lightcyan: '#e0ffff',
	lightgoldenrodyellow: '#fafad2',
	lightgray: '#d3d3d3',
	lightgrey: '#d3d3d3',
	lightgreen: '#90ee90',
	lightpink: '#ffb6c1',
	lightsalmon: '#ffa07a',
	lightseagreen: '#20b2aa',
	lightskyblue: '#87cefa',
	lightslategray: '#778899',
	lightslategrey: '#778899',
	lightsteelblue: '#b0c4de',
	lightyellow: '#ffffe0',
	lime: '#00ff00',
	limegreen: '#32cd32',
	linen: '#faf0e6',
	magenta: '#ff00ff',
	maroon: '#800000',
	mediumaquamarine: '#66cdaa',
	mediumblue: '#0000cd',
	mediumorchid: '#ba55d3',
	mediumpurple: '#9370d8',
	mediumseagreen: '#3cb371',
	mediumslateblue: '#7b68ee',
	mediumspringgreen: '#00fa9a',
	mediumturquoise: '#48d1cc',
	mediumvioletred: '#c71585',
	midnightblue: '#191970',
	mintcream: '#f5fffa',
	mistyrose: '#ffe4e1',
	moccasin: '#ffe4b5',
	navajowhite: '#ffdead',
	navy: '#000080',
	oldlace: '#fdf5e6',
	olive: '#808000',
	olivedrab: '#6b8e23',
	orange: '#ffa500',
	orangered: '#ff4500',
	orchid: '#da70d6',
	palegoldenrod: '#eee8aa',
	palegreen: '#98fb98',
	paleturquoise: '#afeeee',
	palevioletred: '#d87093',
	papayawhip: '#ffefd5',
	peachpuff: '#ffdab9',
	peru: '#cd853f',
	pink: '#ffc0cb',
	plum: '#dda0dd',
	powderblue: '#b0e0e6',
	purple: '#800080',
	red: '#ff0000',
	rosybrown: '#bc8f8f',
	royalblue: '#4169e1',
	saddlebrown: '#8b4513',
	salmon: '#fa8072',
	sandybrown: '#f4a460',
	seagreen: '#2e8b57',
	seashell: '#fff5ee',
	sienna: '#a0522d',
	silver: '#c0c0c0',
	skyblue: '#87ceeb',
	slateblue: '#6a5acd',
	slategray: '#708090',
	slategrey: '#708090',
	snow: '#fffafa',
	springgreen: '#00ff7f',
	steelblue: '#4682b4',
	tan: '#d2b48c',
	teal: '#008080',
	thistle: '#d8bfd8',
	tomato: '#ff6347',
	turquoise: '#40e0d0',
	violet: '#ee82ee',
	wheat: '#f5deb3',
	white: '#ffffff',
	whitesmoke: '#f5f5f5',
	yellow: '#ffff00',
	yellowgreen: '#9acd32'
};

color.wordToHex = function (name) {
	'use strict';
	// @todo what else would be passed to this function?!
	name = typeof name === 'string' ? name.toLowerCase() : name;

	return colorWordLookupTable[name] || name;

};

/*global dom, utils */
/**
 * recusively walk up the DOM, checking for a node which matches a selector
 *
 * **WARNING:** this should be used sparingly, as it's not even close to being performant
 *
 * @param {HTMLElement|String} element The starting HTMLElement
 * @param {String} selector The selector for the HTMLElement
 * @return {HTMLElement|null} Either the matching HTMLElement or `null` if there was no match
 */
dom.findUp = function (element, target) {
	'use strict';
	/*jslint browser:true*/

	var parent,
		doc = element.ownerDocument,
		matches = doc.querySelectorAll(target),
		length = matches.length;

	if (!length) {
		return null;
	}

	matches = utils.toArray(matches);

	parent = element.parentNode;
	// recrusively walk up the DOM, checking each parent node
	while (parent && matches.indexOf(parent) === -1) {
		parent = parent.parentNode;
	}

	return parent;
};
/*global dom */

dom.getDocument = function (node) {
	'use strict';

	if (node) {

		var candidate = node.ownerDocument;
		if (candidate) {
			return candidate;
		}

		if (node.nodeType && node.nodeType === 9) {
			return node;
		}

	}

	return null;
};
/*global dom */

dom.getElementByReference = function (node, attr) {
	'use strict';

	var candidate,
		fragment = node.getAttribute(attr),
		doc = node.ownerDocument;

	if (fragment && fragment.charAt(0) === '#') {
		fragment = fragment.substring(1);

		candidate = doc.getElementById(fragment);
		if (candidate) {
			return candidate;
		}

		candidate = doc.getElementsByName(fragment);
		if (candidate.length) {
			return candidate[0];
		}

	}

	return null;
};
/*global dom */
/**
 * Get the coordinates of the element passed into the function relative to the document
 *
 * #### Returns
 *
 * Returns a `Object` with the following properties, which
 * each hold a value representing the pixels for each of the
 * respective coordinates:
 *
 * - `top`
 * - `right`
 * - `bottom`
 * - `left`
 * - `width`
 * - `height`
 *
 * @param {HTMLElement} el The HTMLElement
 */
dom.getElementCoordinates = function (element, frame) {
	'use strict';
	frame = frame || false;

	var frameCoords,
		doc = dom.getDocument(element),
		scrollOffset = dom.getScrollOffset(doc),
		xOffset = scrollOffset.left,
		yOffset = scrollOffset.top,
		coords = element.getBoundingClientRect();

	if (frame && doc.defaultView.frameElement) {
		try {
			frameCoords = dom.getElementCoordinates(doc.defaultView.frameElement, true);
		} catch (e) {
			frameCoords = {};
		}
		xOffset += frameCoords.left || 0;
		yOffset += frameCoords.top || 0;
	}

	return {
		top: coords.top + yOffset,
		right: coords.right + xOffset,
		bottom: coords.bottom + yOffset,
		left: coords.left + xOffset,

		width: coords.right - coords.left,
		height: coords.bottom - coords.top
	};
};
/*global dom */
/**
 * Get the scroll offset of the document passed in
 *
 * @param {Document} element The element to evaluate, defaults to document
 * @return {Object} Contains the attributes `x` and `y` which contain the scroll offsets
 */
dom.getScrollOffset = function (element) {
	'use strict';

	if (!element.nodeType && element.document) {
		element = element.document;
	}

	// 9 === Node.DOCUMENT_NODE
	if (element.nodeType === 9) {
		var docElement = element.documentElement,
			body = element.body;

		return {
			left: (docElement && docElement.scrollLeft || body && body.scrollLeft || 0),
			top: (docElement && docElement.scrollTop || body && body.scrollTop || 0)
		};
	}

	return {
		left: element.scrollLeft,
		top: element.scrollTop
	};
};
/*global dom */
/**
 * Gets the width and height of the viewport; used to calculate the right and bottom boundaries of the viewable area.
 *
 * @api private
 * @param  {Object}  win The `window` object that should be measured
 * @return {Object}  Object with the `width` and `height` of the viewport
 */
dom.getViewportSize = function (win) {
	'use strict';

	var body,
		doc = win.document,
		docElement = doc.documentElement;

	if (win.innerWidth) {
		return {
			width: win.innerWidth,
			height: win.innerHeight
		};
	}

	if (docElement) {
		return {
			width: docElement.clientWidth,
			height: docElement.clientHeight
		};

	}

	body = doc.body;

	return {
		width: body.clientWidth,
		height: body.clientHeight
	};
};
/*global dom, utils */

dom.idrefs = function (node, attr) {
	'use strict';

	var index, length,
		doc = node.ownerDocument,
		result = [],
		idrefs = node.getAttribute(attr);

	if (idrefs) {
		idrefs = utils.tokenList(idrefs);
		for (index = 0, length = idrefs.length; index < length; index++) {
			result.push(doc.getElementById(idrefs[index]));
		}
	}

	return result;
};
/*global dom */
dom.isNode = function (candidate) {
	'use strict';
	var doc = dom.getDocument(candidate),
		win = doc && doc.defaultView;

	return win && candidate instanceof win.Node;
};
/*global dom */

dom.isOffscreen = function (element) {
	'use strict';

	var leftBoundary,
		doc = element.ownerDocument,
		win = doc.defaultView,
		docElement = doc.documentElement,
		dir = win.getComputedStyle(doc.body || docElement)
			.getPropertyValue('direction'),
		coords = dom.getElementCoordinates(element);

	// bottom edge beyond
	if (coords.bottom < 0) {
		return true;
	}

	if (dir === 'ltr') {
		if (coords.right < 0) {
			return true;
		}
	} else {

		leftBoundary = Math.max(docElement.scrollWidth, dom.getViewportSize(win).width);
		if (coords.left > leftBoundary) {
			return true;
		}
	}

	return false;

};
/*global dom */
/*jshint maxcomplexity: 10 */

/**
 * Determines if an element is hidden with the clip rect technique
 * @param  {String}  clip Computed property value of clip
 * @return {Boolean}
 */
function isClipped(clip) {
	'use strict';

	var matches = clip.match(/rect\s*\(([0-9]+)px,?\s*([0-9]+)px,?\s*([0-9]+)px,?\s*([0-9]+)px\s*\)/);
	if (matches && matches.length === 5) {
		return matches[3] - matches[1] <= 0 && matches[2] - matches[4] <= 0;
	}

	return false;

}

/**
 * Determine whether an element is visible
 *
 * @param {HTMLElement} el The HTMLElement
 * @param {Boolean} screenReader When provided, will evaluate visibility from the perspective of a screen reader
 * @return {Boolean} The element's visibilty status
 */
dom.isVisible = function (el, screenReader, recursed) {
	'use strict';
	var style,
		nodeName = el.nodeName,
		parent = el.parentNode;

	// 9 === Node.DOCUMENT
	if (el.nodeType === 9) {
		return true;
	}

	style = el.ownerDocument.defaultView.getComputedStyle(el, null);


	if (style.getPropertyValue('display') === 'none' ||

		nodeName === 'STYLE' || nodeName === 'SCRIPT' ||

		(!screenReader && isClipped(style.getPropertyValue('clip'))) ||

		(!recursed &&
			// visibility is only accurate on the first element
			(style.getPropertyValue('visibility') === 'hidden' ||
			// position does not matter if it was already calculated
			!screenReader && dom.isOffscreen(el))) ||

		(screenReader && el.getAttribute('aria-hidden') === 'true')) {

		return false;
	}

	if (parent) {
		return dom.isVisible(parent, screenReader, true);
	}

	return false;

};
/*global events */

events.observe = function (win) {
	'use strict';


	function addEventListener(type, fn, useCapture) {
		//jshint validthis: true

		this._listeners.push({
			type: type,
			fn: fn,
			useCapture: useCapture
		});

		return this._addEventListener(type, fn, useCapture);
	}

	var index, proto,
		protos = [ win.Node.prototype, win.Window.prototype ],
		length = protos.length;

	for (index = 0; index < length; index++) {
		proto = protos[index];

		proto._listeners = [];
		proto._addEventListener = proto.addEventListener;
		proto.addEventListener = addEventListener;

	}

};

events.unobserve = function (win) {
	'use strict';


	var index, proto,
		protos = [ win.Node.prototype, win.Window.prototype ],
		length = protos.length;

	for (index = 0; index < length; index++) {
		proto = protos[index];

		proto.addEventListener = proto._addEventListener;
		delete proto._addEventListener;
		delete proto._listeners;

	}
};
/*jshint onevar: false, bitwise: false, maxstatements: 40, maxcomplexity: 8, curly: false,
	expr: true, camelcase: false, eqeqeq: false */
/*global XMLHttpRequest */
(function (global) {
	'use strict';

	// Generic functions
	var bitsToNum = function (ba) {
		return ba.reduce(function (s, n) {
			return s * 2 + n;
		}, 0);
	};

	var byteToBitArr = function (bite) {
		var a = [];
		for (var i = 7; i >= 0; i--) {
			a.push(!!(bite & (1 << i)));
		}
		return a;
	};

	// Stream
	/**
	 * @constructor
	 */
	// Make compiler happy.
	var Stream = function (data) {
		this.data = data;
		this.len = this.data.length;
		this.pos = 0;

		this.readByte = function () {
			if (this.pos >= this.data.length) {
				throw new Error('Attempted to read past end of stream.');
			}
			return data.charCodeAt(this.pos++) & 0xFF;
		};

		this.readBytes = function (n) {
			var bytes = [];
			for (var i = 0; i < n; i++) {
				bytes.push(this.readByte());
			}
			return bytes;
		};

		this.read = function (n) {
			var s = '';
			for (var i = 0; i < n; i++) {
				s += String.fromCharCode(this.readByte());
			}
			return s;
		};

		this.readUnsigned = function () { // Little-endian.
			var a = this.readBytes(2);
			return (a[1] << 8) + a[0];
		};
	};

	// The actual parsing; returns an object with properties.
	var dqParseGIF = function (st, handler) {
		handler || (handler = {});

		// LZW (GIF-specific)
		var parseCT = function (entries) { // Each entry is 3 bytes, for RGB.
			var ct = [];
			for (var i = 0; i < entries; i++) {
				ct.push(st.readBytes(3));
			}
			return ct;
		};

		var readSubBlocks = function () {
			var size, data;
			data = '';
			do {
				size = st.readByte();
				data += st.read(size);
			} while (size !== 0);
			return data;
		};

		var parseHeader = function () {
			var hdr = {};
			hdr.sig = st.read(3);
			hdr.ver = st.read(3);
			if (hdr.sig !== 'GIF') throw new Error('Not a GIF file.'); // XXX: This should probably be handled more nicely.
			hdr.width = st.readUnsigned();
			hdr.height = st.readUnsigned();

			var bits = byteToBitArr(st.readByte());
			hdr.gctFlag = bits.shift();
			hdr.colorRes = bitsToNum(bits.splice(0, 3));
			hdr.sorted = bits.shift();
			hdr.gctSize = bitsToNum(bits.splice(0, 3));

			hdr.bgColor = st.readByte();
			hdr.pixelAspectRatio = st.readByte(); // if not 0, aspectRatio = (pixelAspectRatio + 15) / 64
			if (hdr.gctFlag) {
				hdr.gct = parseCT(1 << (hdr.gctSize + 1));
			}

			handler.hdr && handler.hdr(hdr);
		};

		var parseExt = function (block) {
			var parseGCExt = function (block) {
				st.readByte();
				var bits = byteToBitArr(st.readByte());
				block.reserved = bits.splice(0, 3); // Reserved; should be 000.
				block.disposalMethod = bitsToNum(bits.splice(0, 3));
				block.userInput = bits.shift();
				block.transparencyGiven = bits.shift();

				block.delayTime = st.readUnsigned();

				block.transparencyIndex = st.readByte();

				block.terminator = st.readByte();

				handler.gce && handler.gce(block);
			};

			var parseComExt = function (block) {
				block.comment = readSubBlocks();
				handler.com && handler.com(block);
			};

			var parsePTExt = function (block) {
				// No one *ever* uses this. If you use it, deal with parsing it yourself.
				st.readByte();
				block.ptHeader = st.readBytes(12);
				block.ptData = readSubBlocks();
				handler.pte && handler.pte(block);
			};

			var parseAppExt = function (block) {
				var parseNetscapeExt = function (block) {
					st.readByte();
					block.unknown = st.readByte(); // ??? Always 1? What is this?
					block.iterations = st.readUnsigned();
					block.terminator = st.readByte();
					handler.app && handler.app.NETSCAPE && handler.app.NETSCAPE(block);
				};

				var parseUnknownAppExt = function (block) {
					block.appData = readSubBlocks();
					// FIXME: This won't work if a handler wants to match on any identifier.
					handler.app && handler.app[block.identifier] && handler.app[block.identifier](block);
				};
				st.readByte();

				block.identifier = st.read(8);
				block.authCode = st.read(3);
				switch (block.identifier) {
				case 'NETSCAPE':
					parseNetscapeExt(block);
					break;
				default:
					parseUnknownAppExt(block);
					break;
				}
			};

			var parseUnknownExt = function (block) {
				block.data = readSubBlocks();
				handler.unknown && handler.unknown(block);
			};

			block.label = st.readByte();
			switch (block.label) {
			case 0xF9:
				block.extType = 'gce';
				parseGCExt(block);
				break;
			case 0xFE:
				block.extType = 'com';
				parseComExt(block);
				break;
			case 0x01:
				block.extType = 'pte';
				parsePTExt(block);
				break;
			case 0xFF:
				block.extType = 'app';
				parseAppExt(block);
				break;
			default:
				block.extType = 'unknown';
				parseUnknownExt(block);
				break;
			}
		};

		var parseImg = function (img) {


			img.leftPos = st.readUnsigned();
			img.topPos = st.readUnsigned();
			img.width = st.readUnsigned();
			img.height = st.readUnsigned();

			var bits = byteToBitArr(st.readByte());
			img.lctFlag = bits.shift();
			img.interlaced = bits.shift();
			img.sorted = bits.shift();
			img.reserved = bits.splice(0, 2);
			img.lctSize = bitsToNum(bits.splice(0, 3));

			if (img.lctFlag) {
				img.lct = parseCT(1 << (img.lctSize + 1));
			}

			img.lzwMinCodeSize = st.readByte();

			readSubBlocks();

			handler.img && handler.img(img);
		};

		var parseBlock = function () {
			var block = {};
			block.sentinel = st.readByte();

			switch (String.fromCharCode(block.sentinel)) { // For ease of matching
			case '!':
				block.type = 'ext';
				parseExt(block);
				break;
			case ',':
				block.type = 'img';
				parseImg(block);
				break;
			case ';':
				block.type = 'eof';
				handler.eof && handler.eof(block);
				break;
			default:
				throw new Error('Unknown block: 0x' + block.sentinel.toString(16)); // TODO: Pad this with a 0.
			}

			if (block.type !== 'eof') parseBlock();
		};

		var parse = function () {
			parseHeader();
			parseBlock();
		};

		parse();
	};

	var load_binary_resource = function (url) {
		var req = new XMLHttpRequest();
		req.open('GET', url, false);
		// The following line says we want to receive data as Binary and not as Unicode
		req.overrideMimeType('text/plain; charset=x-user-defined');
		req.send(null);
		if (req.status != 200) return '';
		return req.responseText;
	};

	var DqGif = function (options) {
		if (!this instanceof DqGif) {
			return new DqGif(options);
		}

		var gif = options.gif;

		var stream;
		var hdr;

		var loading = false;

		var transparency = null;
		var delay = null;
		var disposalMethod = null;
		var lastDisposalMethod = null;
		var frame = null;

		var self = this;
		this.frames = [];

		var clear = function () {
			transparency = null;
			delay = null;
			lastDisposalMethod = disposalMethod;
			disposalMethod = null;
			frame = null;
		};

		var doGCE = function (gce) {
			pushFrame();
			clear();
			transparency = gce.transparencyGiven ? gce.transparencyIndex : null;
			delay = gce.delayTime;
			disposalMethod = gce.disposalMethod;
			// We don't have much to do with the rest of GCE.
		};

		var pushFrame = function () {
			if (!frame) return;
			self.frames.push({
				data: frame.getImageData(0, 0, hdr.width, hdr.height),
				delay: delay
			});
		};

		var firstImg = false;
		var firstCData = false;

		var doHdr = function (_hdr) {
			hdr = _hdr;
		};

		var doImg = function (img) {
			if (!frame) frame = tmpCanvas.getContext('2d');

			var cData = frame.getImageData(img.leftPos, img.topPos, img.width, img.height);

			if (!firstImg) firstImg = img;
			if (!firstCData) firstCData = cData;

			frame.putImageData(cData, img.leftPos, img.topPos);

		};


		var doNothing = function () {};
		/**
		 * @param{boolean=} draw Whether to draw progress bar or not; this is not idempotent because of translucency.
		 * Note that this means that the text will be unsynchronized with the progress bar on non-frames;
		 * but those are typically so small (GCE etc.) that it doesn't really matter. TODO: Do this properly.
		 */
		var withProgress = function (fn) {
			return function (block) {
				fn(block);
			};
		};


		var handler = {
			hdr: withProgress(doHdr),
			gce: withProgress(doGCE),
			com: withProgress(doNothing),
			// I guess that's all for now.
			app: {
				// TODO: Is there much point in actually supporting iterations?
				NETSCAPE: withProgress(doNothing)
			},
			img: withProgress(doImg, true),
			eof: function () {
				//toolbar.style.display = '';
				pushFrame();
				loading = false;
				if (load_callback) {
					load_callback();
				}
			}
		};

		var init = function () {

			tmpCanvas = gif.ownerDocument.createElement('canvas');

		};
		var clean = function () {
			tmpCanvas = null;

		};

		var tmpCanvas;
		var initialized = false;
		var load_callback = false;

		this.clean = function () {
			clean();
		};

		this.getFlickerRate = function () {
			var totDur = 0;
			var fps;
			if (!initialized) init();
			stream = new Stream(load_binary_resource(gif.src));
			dqParseGIF(stream, handler);

			console.log(gif.src, this.frames.length);

			if (this.frames && this.frames.length <= 1) return null;

			for (var i = 0; i < this.frames.length; i++) {
				console.log(i, this.frames[i].delay);
				totDur += this.frames[i].delay;
			}
			try {
				var totDurSec = totDur / 100;
				if (totDurSec === 0) {
					fps = 0;
				} else {
					fps = (this.frames.length / totDurSec);
				}
			} catch (err) {}

			return fps;
		};


	};

	global.DqGif = DqGif;
	global.getFlickerRate = function (gif) {
		console.log(gif, gif.src);
		return (new DqGif({gif: gif})).getFlickerRate();
	};
}(felib.image));
/*global aria, utils */
// TODO test and make these work correctly
aria.isIdentifiedByAriaProperty = function (nd, prop) {
	'use strict';
	var lblAtr = nd.getAttribute(prop);
	if (lblAtr !== null && lblAtr.trim() !== '') {
		var ids = utils.tokenList(lblAtr);
		if (ids === null || ids.length === 0) return false;
		for (var j=0; j < ids.length; j++) {
			var el = nd.ownerDocument.getElementById(ids[j]);
			if (el !== null && legacy.getVisibleText(el) !== "") return true;
		}
	}
	return false;
};

aria.isIdentifiedByAriaLabels = function (nd) {
	'use strict';
	if (aria.isIdentifiedByAriaProperty(nd, 'aria-labelledby')) return true;

	/* @todo describedby is for "help text", not labels; they are not interchangable.
	For example, VoiceOver will read an input w/ aria-describedby as 'edit text blank... [describedby text]' */

	if (aria.isIdentifiedByAriaProperty(nd, 'aria-describedby')) return true;
	var lblAtr = nd.getAttribute('aria-label');
	if (lblAtr !== null && lblAtr.trim() !== '') return true;
	return false;
};

aria.getTextForAriaProperty = function (nd, prop) {
	'use strict';
	var txt = "";
	var elms = dom.idrefs(nd, prop);
	for (var j=0; j < elms.length; j++) {
		if (elms[j]) {
			txt = txt + legacy.getVisibleText(elms[j]);
		}
	}

	return txt.trim();
};
/*global legacy */

legacy.findFirstTextNode = function (node, notAllowed) {
	'use strict';

	var str, myChild;

	if (!node) {
		return null;
	}

	notAllowed = notAllowed || [];

	while (node) {

		str = node.nodeName.toLowerCase();
		while (node && str && notAllowed.indexOf(str) !== -1) {
			node = node.nextSibling;
		}

		if (!node) {
			return null;
		}

		if (str === '#text' && node.wholeText.trim().length > 0) {
			break;
		}

		if (str !== '#text' && str !== '#comment') {
			myChild = legacy.findFirstTextNode(node.firstChild, notAllowed);
			if (myChild) {
				return myChild;
			}
		}
		node = node.nextSibling;

	}

	if (!node || node.nodeName !== '#text') {
		return null;
	}

	return node;
};
/*global legacy */

legacy.formattingImage = function (nd, sz) {
	'use strict';

	if ((nd.height && nd.height <= sz) || (nd.width && nd.width <= sz)) {
		return true;
	}
	return false;
};
/*global legacy, utils */

legacy.getAbsoluteURL = function (doc, url) {
	'use strict';

	return utils.anchor(doc, url).href;
};
/*global legacy */

legacy.getChildAlt = function (elem) {
	'use strict';

	var node, txt, i,
		str = '',
		nl = elem.childNodes;

	for (i = 0; i < nl.length; i++) {
		node = nl[i];
		if (node.nodeName.toLowerCase() === 'img') {
			txt = node.getAttribute('alt');
			if (txt && txt.length > 0) {
				str = str + txt;
			}
		}
	}
	if (str.length > 0) {
		str = str.trim();
		return str;
	}

	return '';
};
/*global legacy */

legacy.getNodeText = function (node) {
	'use strict';

	var children, i,
		str = '';
	if (!node) {
		return str;
	}
	if (node.nodeName.toLowerCase() === '#text') {
		str += node.nodeValue;
	}
	children = node.childNodes;
	for (i = 0; i < children.length; i++) {
		str += legacy.getNodeText(children[i]);
	}
	return str;
};
/*global legacy */

legacy.getRenderedText = function (s) {
	'use strict';

	if (!s) {
		return s;
	}
	var str = s.replace(/[\n|\t|\r|\f]/g, ' ');
	str = str.replace(/&nbsp;/g, ' ');
	return str;
};
/*global legacy */
legacy.getStyleProperty = function (element, property) {
	'use strict';

	var style = element.ownerDocument.defaultView.getComputedStyle(element, null), retVal;

	try {
		retVal = style.getPropertyCSSValue(property);
	} catch ( e) {
		retVal = null;
	}
	return retVal;
};
/*global legacy */

legacy.getValue = function (val) {
	'use strict';
	try {
		switch (val.primitiveType) {
		case val.CSS_NUMBER:
		case val.CSS_PERCENTAGE:
		case val.CSS_EMS:
		case val.CSS_EXS:
		case val.CSS_PX:
		case val.CSS_CM:
		case val.CSS_MM:
		case val.CSS_IN:
		case val.CSS_PT:
		case val.CSS_PC:
		case val.CSS_DEG:
		case val.CSS_RAD:
		case val.CSS_GRAD:
		case val.CSS_MS:
		case val.CSS_S:
		case val.CSS_HZ:
		case val.CSS_KHZ:
		case val.CSS_DIMENSION:
			return val.getFloatValue(val.primitiveType);
		case val.CSS_STRING:
		case val.CSS_URI:
		case val.CSS_IDENT:
		case val.CSS_ATTR:
			return val.getStringValue();
		case val.CSS_RGBCOLOR:
			return ('rgb(' + val.getRGBColorValue().red.getFloatValue(val.getRGBColorValue().red.primitiveType) + ',' +
							val.getRGBColorValue().green.getFloatValue(val.getRGBColorValue().green.primitiveType) + ',' +
							val.getRGBColorValue().blue.getFloatValue(val.getRGBColorValue().blue.primitiveType) + ')');
		case val.CSS_COUNTER: //TODO
		case val.CSS_RECT: // TODO
		case val.CSS_UNKNOWN:
			return val.cssText;
		default:
			return val.cssText;
		}
	} catch (err) {
		return undefined;
	}
};
/*global legacy */

legacy.getVisibleText = function (elem) {
	'use strict';

	var elNm = elem.nodeName.toUpperCase(), nl, node, txt, i, vtxt = '';

	if (elNm !== 'STYLE' && elNm !== 'SCRIPT' && elNm !== 'LEGEND') {
		nl = elem.childNodes;
		for (i = 0; i < nl.length; i++) {
			node = nl[i];
			if (node.nodeName === '#text') {
				txt = node.nodeValue;
				if (txt) {
					txt = txt.replace(/\r\n/gi, '\n')
									.replace(/&nbsp;/gi, ' ')
									.replace(/\u00A0/gi, ' ')
									.replace(/[\s]+/gi, ' ');
					if (txt.length > 0) {
						vtxt = vtxt + txt;
					}
				}
			} else {
				vtxt = vtxt + ' ' + legacy.getVisibleText(node);
			}
		}
		return vtxt.replace(/[\s]+/gi, ' ').trim();
	}
	return '';
};
/*global legacy, dom */

legacy.hasAltText = function (node) {
	'use strict';

	// If this is an anchor tag and has a title element, then this is valid
	if (node.nodeName.toLowerCase() === 'a' && typeof node.title !== 'undefined' && node.title.trim().length > 0) {
		return true;
	}
	// Look for valid immediate child with valid alternative text
	// Valid things are a child that is placed off screen or has class
	// equal to "hidden"
	var nn, text,
		child = node.firstChild;
	while (child) {

		nn = child.nodeName.toLowerCase();
		if (nn !== '#text') {
			if (dom.isVisible(child, true)) {
				text = legacy.findFirstTextNode(child);

				if (text !== null && typeof text.wholeText !== 'undefined' && text.wholeText.trim().length > 0) {
					return true;
				}
			}
			if (nn === 'img' && typeof(child.alt) !== 'undefined' && child.alt.trim().length > 0) {
				return true;
			}
			if (nn === 'a' && typeof(child.title) !== 'undefined' && child.title.trim().length > 0) {
				return true;
			}
			if (nn === 'a' || nn === 'div' || nn === 'span') {
				if (legacy.hasAltText(child)) {
					return true;
				}
			}
		}
		child = child.nextSibling;
	}
	return false;
};
/*global legacy */

legacy.hasImageChildWithAltText = function (node) {
	'use strict';
	// Look for valid immediate child with valid alternative text
	// Valid things are a child that is placed off screen or has class
	// equal to "hidden"
	var alt, nn,
		child = node.firstChild;
	while (child) {
		//debugOut( "hasAltText: looking at: "+child.nodeName);
		nn = child.nodeName.toLowerCase();
		if (nn !== '#text' && dom.isVisible(child, true)) {

			alt = child.getAttribute('alt');

			if (nn === 'img' && alt !== null && alt.trim().length > 0) {
				return true;
			}
			if (nn === 'a' || nn === 'div' || nn === 'span') {
				if (legacy.hasAltText(child)) {
					return true;
				}
			}
		}
		child = child.nextSibling;
	}
	return false;
};
/*global legacy */

legacy.isAsciiArt = function (txt) {
	'use strict';

	var i,
		len = txt.length,
		occ = 0,
		prev = null;

	for (i = 0; i < len; i++) {
		if (txt[i] === prev) {
			occ++;
			if (occ >= 5) {
				return true;
			}
		} else {
			prev = txt[i];
			occ = 0;
		}
	}
	return false;
};
/*global legacy */

legacy.isInvalidExtension = function (txt, extns) {
	'use strict';

	var i, index;

	txt = txt.toLowerCase();
	for (i = 0; i < extns.length; i++) {
		index = txt.indexOf(extns[i]);
		if (index !== -1 && index === (txt.length - extns[i].length)) {
			return true;
		}
	}
	return false;
};
/*global legacy */

legacy.isPlaceHolder = function (txt, placeholder) {
	'use strict';

	var idx, pHolder, i;

	if (placeholder === null || placeholder === '') {
		return false;
	}

	pHolder = placeholder.toLowerCase().split(';');
	txt = txt.toLowerCase();

	for (i = 0; i < pHolder.length; i++) {
		idx = txt.indexOf(pHolder[i]);
		if (idx !== -1 &&
				((txt.length === (idx + pHolder[i].length) && legacy.isSpaceOrPunctuation(txt[idx - 1])) ||
				legacy.isSpaceOrPunctuation(txt[idx + pHolder[i].length]))) {
			return true;
		}
	}
	return false;
};
/*global legacy */
var spacesandPunctuation = /[^a-zA-Z0-9]/;
legacy.isSpaceOrPunctuation = function (character) {
	'use strict';

	if (!character) {
		return true;
	}
	return spacesandPunctuation.test(character);
};
/*global legacy */

legacy.noAltOnSiblingImgs = function (node) {
	'use strict';

	var nd,
		alt = null;

	nd = node.previousSibling;
	while (nd !== null) {
		if (nd.nodeName.toLowerCase() === 'img') {
			alt = nd.getAttribute('alt');
			if (alt !== null && alt.trim() !== '') {
				return false;
			}
		}
		nd = nd.previousSibling;
	}

	nd = node.nextSibling;
	while (nd !== null) {
		if (nd.nodeName.toLowerCase() === 'img') {
			alt = nd.getAttribute('alt');
			if (alt !== null && alt.trim() !== '') {
				return false;
			}
		}
		nd = nd.nextSibling;
	}
	return true;
};

/*global legacy */
legacy.startsWith = function (value, str) {
	'use strict';

	return value.indexOf(str) === 0;
};

/*global text, dom */
/*jshint maxcomplexity: 10, maxstatements: 16 */

/**
 * Finds the closest text node to `node` either forwards or backwards in the DOM.
 * @param  {Element} node The node to start at
 * @param  {String}  dir  Either 'previous' or 'next'
 * @param  {Boolean} sib  Used internally. Disables intial previous or nextSibling traversal, should not be set.
 * @return {Mixed}        The closest text node in the given direction, `null` if none are found
 */
text.closest = function (node, dir, sib) {
	'use strict';

	dir = dir === 'previous' ? dir : 'next';

	var candidate = node;

	if (!candidate) {
		return null;
	}

	if (!sib) {
		if (dir === 'next' && candidate.nodeType === 1) {
			candidate = candidate.firstChild;
		}
		candidate = candidate && candidate[dir + 'Sibling'];
	}

	while (candidate) {
		if (candidate.nodeType === 3) {
			if (text.sanitize(candidate.nodeValue) && dom.isVisible(candidate.parentNode)) {
				return candidate;
			}
		} else if (candidate.nodeType === 1 && dom.isVisible(candidate)) {
			return text.closest(candidate[dir === 'next' ? 'firstChild' : 'lastChild'], dir, true);

		}
		sib = false;
		candidate = candidate[dir + 'Sibling'];
	}

	return text.closest(node.parentNode, dir);
};
/*global text, dom */

/**
 * Gets the coordinates of a text node
 * @param  {[type]} node [description]
 * @return {[type]}      [description]
 */
text.getCoordinates = function (node) {
	'use strict';

	var doc = node.ownerDocument,
		range = doc.createRange(),
		scrollOffset = dom.getScrollOffset(doc),
		xOffset = scrollOffset.left,
		yOffset = scrollOffset.top,
		result;

	range.selectNodeContents(node);
	result = range.getBoundingClientRect();

	return {
		top: result.top + yOffset,
		right: result.right + xOffset,
		bottom: result.bottom + yOffset,
		left: result.left + xOffset,

		width: result.right - result.left,
		height: result.bottom - result.top
	};
};
/*global dom, text */



text.hasTextOnSameLine = function (node) {
	'use strict';

	if (!dom.isVisible(node)) {
		return false;
	}
	var visibleText = text.visible(node),
		prev = text.closest(node, 'previous'),
		next = text.closest(node, 'next'),
		nodeCoords = dom.getElementCoordinates(node),
		coords;

	nodeCoords.top += parseInt(node.ownerDocument.defaultView.getComputedStyle(node, null)
		.getPropertyValue('padding-top'), 10);

	if (prev && visibleText.indexOf(prev.nodeValue) !== 0) {
		coords = text.getCoordinates(prev);
		if (Math.abs(coords.top - nodeCoords.top) <= 1) {
			return true;
		}
	}
	if (next && visibleText.indexOf(next.nodeValue) !== 0) {
		coords = text.getCoordinates(next);
		if (Math.abs(coords.top - nodeCoords.top) <= 1) {
			return true;
		}
	}

	return false;

};
/*global text */
text.sanitize = function (str) {
	'use strict';
	return str
		.replace(/\r\n/g, '\n')
		.replace(/\u00A0/g, ' ')
		.replace(/[\s]{2,}/g, ' ')
		.trim();
};

/*global text, dom */

text.visible = function (element, screenReader) {
	'use strict';

	var index, child, nodeValue,
		childNodes = element.childNodes,
		length = childNodes.length,
		result = '';

	for (index = 0; index < length; index++) {
		child = childNodes[index];

		if (child.nodeType === 3) {
			nodeValue = child.nodeValue;
			if (nodeValue && dom.isVisible(element, screenReader)) {
				result += child.nodeValue;
			}
		} else {
			result += text.visible(child, screenReader);
		}
	}

	return text.sanitize(result);
};
/*global utils */


function parse(fragment) {
	'use strict';

	var index, length, part, key,
		pieces = fragment.substr(1).split('&'),
		result = {};

	for (index = 0, length = pieces.length; index < length; index++) {
		part = pieces[index].split('=');
		key = decodeURIComponent(part.shift());
		if (key) {
			result[key] = decodeURIComponent(part.join('='));
		}
	}

	return result;

}
utils.anchor = function (document, url) {
	'use strict';

	var index, prop,
		result = {},
		props = ['href', 'hash', 'search', 'pathname', 'port', 'hostname', 'host', 'protocol'],
		length = props.length,
		a = document.createElement('a');

	a.href = url;

	for (index = 0; index < length; index++) {
		prop = props[index];
		result[prop] = a[prop].toString();
	}

	result._anchor = a;

	result.getHash = function () {
		return parse(this.hash);
	};
	result.getQuery = function () {
		return parse(this.search);
	};

	return result;

};
/*global utils, dom */

/**
 * Clones an object.  Does not operate on DOM nodes; if you need to clone a node, use `Node#cloneNode()`.
 *
 * Examples:
 *
 * ```js
 * var clone = require('lib/clone');
 * // Use clone
 * a = clone(b);
 * ```
 *
* @name clone
 * @param {Mixed} obj  The thing to clone.
 * @return {Mixed} A copy of what was passed in
 */
utils.clone = function (obj) {
	'use strict';

	var index, length,
		out = obj;

	if (obj !== null && typeof obj === 'object' && !dom.isNode(obj)) {
		if (Array.isArray(obj)) {
			out = [];
			for (index = 0, length = obj.length; index < length; index++) {
				out[index] = utils.clone(obj[index]);
			}

		} else {
			out = {};

			// jshint forin: false
			for (index in obj) {
				out[index] = utils.clone(obj[index]);
			}

		}

	}

	// primitive types are passed by value
	return out;
};

/*global utils */

/**
 * Escapes a property value of a CSS selector
 * @see https://github.com/mathiasbynens/CSS.escape/
 * @param  {String} string The piece of the selector to escape
 * @return {String}        The escaped selector
 */
// http://dev.w3.org/csswg/cssom/#serialize-an-identifier
utils.escapeSelector = function (value) {
	'use strict';
	/*jshint bitwise: true, eqeqeq: false, maxcomplexity: 14, maxstatements: 23, onevar: false, -W041: false */
	var string = String(value);
	var length = string.length;
	var index = -1;
	var codeUnit;
	var result = '';
	var firstCodeUnit = string.charCodeAt(0);
	while (++index < length) {
		codeUnit = string.charCodeAt(index);
		// Note: there’s no need to special-case astral symbols, surrogate
		// pairs, or lone surrogates.

		// If the character is NULL (U+0000), then throw an
		// `InvalidCharacterError` exception and terminate these steps.
		if (codeUnit == 0x0000) {
			throw new Error('INVALID_CHARACTER_ERR');
		}

		if (
			// If the character is in the range [\1-\1F] (U+0001 to U+001F) or
			// [\7F-\9F] (U+007F to U+009F), […]
			(codeUnit >= 0x0001 && codeUnit <= 0x001F) ||
			(codeUnit >= 0x007F && codeUnit <= 0x009F) ||
			// If the character is the first character and is in the range [0-9]
			// (U+0030 to U+0039), […]
			(index == 0 && codeUnit >= 0x0030 && codeUnit <= 0x0039) ||
			// If the character is the second character and is in the range [0-9]
			// (U+0030 to U+0039) and the first character is a `-` (U+002D), […]
			(index == 1 && codeUnit >= 0x0030 && codeUnit <= 0x0039 && firstCodeUnit == 0x002D)
		) {
			// http://dev.w3.org/csswg/cssom/#escape-a-character-as-code-point
			result += '\\' + codeUnit.toString(16) + ' ';
			continue;
		}

		// If the character is the second character and is `-` (U+002D) and the
		// first character is `-` as well, […]
		if (index == 1 && codeUnit == 0x002D && firstCodeUnit == 0x002D) {
			// http://dev.w3.org/csswg/cssom/#escape-a-character
			result += '\\' + string.charAt(index);
			continue;
		}

		// If the character is not handled by one of the above rules and is
		// greater than or equal to U+0080, is `-` (U+002D) or `_` (U+005F), or
		// is in one of the ranges [0-9] (U+0030 to U+0039), [A-Z] (U+0041 to
		// U+005A), or [a-z] (U+0061 to U+007A), […]
		if (
			codeUnit >= 0x0080 ||
			codeUnit == 0x002D ||
			codeUnit == 0x005F ||
			codeUnit >= 0x0030 && codeUnit <= 0x0039 ||
			codeUnit >= 0x0041 && codeUnit <= 0x005A ||
			codeUnit >= 0x0061 && codeUnit <= 0x007A
		) {
			// the character itself
			result += string.charAt(index);
			continue;
		}

		// Otherwise, the escaped character.
		// http://dev.w3.org/csswg/cssom/#escape-a-character
		result += '\\' + string.charAt(index);

	}
	return result;
};
/*global utils, dom */
utils.matchesSelector = (function () {
	'use strict';

	var method;

	function getMethod(win) {

		var index, candidate,
			elProto = win.Element.prototype,
			candidates = ['matches', 'matchesSelector', 'mozMatchesSelector', 'webkitMatchesSelector', 'msMatchesSelector'],
			length = candidates.length;

		for (index = 0; index < length; index++) {
			candidate = candidates[index];
			if (elProto[candidate]) {
				return candidate;
			}
		}
	}


	return function (node, selector) {

		if (!method || !node[method]) {
			method = getMethod(dom.getDocument(node).defaultView);
		}

		return node[method](selector);
	};
}());
/*global utils */
var slice = Array.prototype.slice;

utils.toArray = function (thing) {
	'use strict';
	return slice.call(thing);
};
/*global utils */


utils.tokenList = function (str) {
	'use strict';

	return str.trim().replace(/\s{2,}/g, ' ').split(' ');
};
/*global utils */

/**
 * Evaluates an XPath expression and returns an Array of matching nodes
 *
 * @param  {HTMLDocument} document   The `HTMLDocument` against to run the XPath expression
 * @param  {String}       xpath      XPath expression to evaluate
 * @param  {Node}         [context]  Optional context node
 * @return {Array}        Nodes that match the expression
 */
utils.evaluateXPath = function (document, xpath, context) {
	'use strict';

	var node,
		result = document.evaluate(xpath, context || document, null, 5, null),
		nodes = [];

	//jshint boss: true
	while (node = result.iterateNext()) {
		nodes.push(node);
	}

	return nodes;

};
//global felib, module, global

if (typeof module === 'object' && module.exports) {
	module.exports = felib;
} else {
	global.felib = felib;
}

}(this));



felib.getAll = function (node) {
	return Array.prototype.slice.call(document.getElementsByTagName('*'));
};

felib.getLabelText = function (node) {
	var ref, candidate;

	// aria-label
	candidate = node.getAttribute('aria-label');
	if (candidate) {
		return candidate;
	}

	if (node.getAttribute('aria-labelledby')) {
		// aria-labelledby
		ref = felib.dom.idrefs(node, 'aria-labelledby');
		candidate = ref.map(function (thing) {
			return thing ? felib.text.visible(thing, true) : '';
		}).join('');

		if (candidate) {
			return candidate;
		}
	}

	// explicit label
	if (node.id) {
		ref = document.querySelector('label[for="' + felib.utils.escapeSelector(node.id) + '"]');
		candidate = ref && felib.text.visible(ref, true);
		if (candidate) {
			return candidate;
		}
	}

	ref = felib.dom.findUp(node, 'label');
	candidate = ref && felib.text.visible(ref, true);
	if (candidate) {
		return candidate;
	}

	return null;
};
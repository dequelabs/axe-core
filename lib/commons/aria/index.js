/**
 * Namespace for aria-related utilities.
 * @namespace commons.aria
 * @memberof axe
 */

var aria = (commons.aria = {}),
	lookupTable = (aria.lookupTable = {});

lookupTable.attributes = {
	'aria-activedescendant': {
		type: 'idref'
	},
	'aria-atomic': {
		type: 'boolean',
		values: ['true', 'false']
	},
	'aria-autocomplete': {
		type: 'nmtoken',
		values: ['inline', 'list', 'both', 'none']
	},
	'aria-busy': {
		type: 'boolean',
		values: ['true', 'false']
	},
	'aria-checked': {
		type: 'nmtoken',
		values: ['true', 'false', 'mixed', 'undefined']
	},
	'aria-colcount': {
		type: 'int'
	},
	'aria-colindex': {
		type: 'int'
	},
	'aria-colspan': {
		type: 'int'
	},
	'aria-controls': {
		type: 'idrefs'
	},
	'aria-current': {
		type: 'nmtoken',
		values: ['page', 'step', 'location', 'date', 'time', 'true', 'false']
	},
	'aria-describedby': {
		type: 'idrefs'
	},
	'aria-disabled': {
		type: 'boolean',
		values: ['true', 'false']
	},
	'aria-dropeffect': {
		type: 'nmtokens',
		values: ['copy', 'move', 'reference', 'execute', 'popup', 'none']
	},
	'aria-errormessage': {
		type: 'idref'
	},
	'aria-expanded': {
		type: 'nmtoken',
		values: ['true', 'false', 'undefined']
	},
	'aria-flowto': {
		type: 'idrefs'
	},
	'aria-grabbed': {
		type: 'nmtoken',
		values: ['true', 'false', 'undefined']
	},
	'aria-haspopup': {
		type: 'nmtoken',
		values: ['true', 'false', 'menu', 'listbox', 'tree', 'grid', 'dialog']
	},
	'aria-hidden': {
		type: 'boolean',
		values: ['true', 'false']
	},
	'aria-invalid': {
		type: 'nmtoken',
		values: ['true', 'false', 'spelling', 'grammar']
	},
	'aria-keyshortcuts': {
		type: 'string'
	},
	'aria-label': {
		type: 'string'
	},
	'aria-labelledby': {
		type: 'idrefs'
	},
	'aria-level': {
		type: 'int'
	},
	'aria-live': {
		type: 'nmtoken',
		values: ['off', 'polite', 'assertive']
	},
	'aria-modal': {
		type: 'boolean',
		values: ['true', 'false']
	},
	'aria-multiline': {
		type: 'boolean',
		values: ['true', 'false']
	},
	'aria-multiselectable': {
		type: 'boolean',
		values: ['true', 'false']
	},
	'aria-orientation': {
		type: 'nmtoken',
		values: ['horizontal', 'vertical']
	},
	'aria-owns': {
		type: 'idrefs'
	},
	'aria-placeholder': {
		type: 'string'
	},
	'aria-posinset': {
		type: 'int'
	},
	'aria-pressed': {
		type: 'nmtoken',
		values: ['true', 'false', 'mixed', 'undefined']
	},
	'aria-readonly': {
		type: 'boolean',
		values: ['true', 'false']
	},
	'aria-relevant': {
		type: 'nmtokens',
		values: ['additions', 'removals', 'text', 'all']
	},
	'aria-required': {
		type: 'boolean',
		values: ['true', 'false']
	},
	'aria-rowcount': {
		type: 'int'
	},
	'aria-rowindex': {
		type: 'int'
	},
	'aria-rowspan': {
		type: 'int'
	},
	'aria-selected': {
		type: 'nmtoken',
		values: ['true', 'false', 'undefined']
	},
	'aria-setsize': {
		type: 'int'
	},
	'aria-sort': {
		type: 'nmtoken',
		values: ['ascending', 'descending', 'other', 'none']
	},
	'aria-valuemax': {
		type: 'decimal'
	},
	'aria-valuemin': {
		type: 'decimal'
	},
	'aria-valuenow': {
		type: 'decimal'
	},
	'aria-valuetext': {
		type: 'string'
	}
};

lookupTable.globalAttributes = [
	'aria-atomic',
	'aria-busy',
	'aria-controls',
	'aria-current',
	'aria-describedby',
	'aria-disabled',
	'aria-dropeffect',
	'aria-flowto',
	'aria-grabbed',
	'aria-haspopup',
	'aria-hidden',
	'aria-invalid',
	'aria-keyshortcuts',
	'aria-label',
	'aria-labelledby',
	'aria-live',
	'aria-owns',
	'aria-relevant'
];

const elementConditions = {
	CANNOT_HAVE_LIST_ATTRIBUTE: node => {
		const nodeAttrs = Array.from(node.attributes).map(a =>
			a.name.toUpperCase()
		);
		if (nodeAttrs.includes('LIST')) {
			return false;
		}
		return true;
	},
	CANNOT_HAVE_HREF_ATTRIBUTE: node => {
		const nodeAttrs = Array.from(node.attributes).map(a =>
			a.name.toUpperCase()
		);
		if (nodeAttrs.includes('HREF')) {
			return false;
		}
		return true;
	},
	MUST_HAVE_HREF_ATTRIBUTE: node => {
		if (!node.href) {
			return false;
		}
		return true;
	},
	MUST_HAVE_SIZE_ATTRIBUTE_WITH_VALUE_GREATER_THAN_1: node => {
		const attr = 'SIZE';
		const nodeAttrs = Array.from(node.attributes).map(a =>
			a.name.toUpperCase()
		);
		if (!nodeAttrs.includes(attr)) {
			return false;
		}
		return Number(node.getAttribute(attr)) > 1;
	},
	MUST_HAVE_ALT_ATTRIBUTE: node => {
		const attr = 'ALT';
		const nodeAttrs = Array.from(node.attributes).map(a =>
			a.name.toUpperCase()
		);
		if (!nodeAttrs.includes(attr)) {
			return false;
		}
		return true;
	},
	MUST_HAVE_ALT_ATTRIBUTE_WITH_VALUE: node => {
		const attr = 'ALT';
		const nodeAttrs = Array.from(node.attributes).map(a =>
			a.name.toUpperCase()
		);
		if (!nodeAttrs.includes(attr)) {
			return false;
		}
		const attrValue = node.getAttribute(attr);
		// ensure attrValue is defined and have a length (empty string is not allowed)
		return attrValue && attrValue.length > 0;
	}
};

lookupTable.role = {
	// valid roles below
	alert: {
		type: 'widget',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		unsupported: false,
		allowedElements: ['SECTION']
	},
	alertdialog: {
		type: 'widget',
		attributes: {
			allowed: ['aria-expanded', 'aria-modal', 'aria-errormessage']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		unsupported: false,
		allowedElements: ['DIALOG', 'SECTION']
	},
	application: {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		unsupported: false,
		allowedElements: [
			'ARTICLE',
			'AUDIO',
			'EMBED',
			'IFRAME',
			'OBJECT',
			'SECTION',
			'SVG',
			'VIDEO'
		]
	},
	article: {
		type: 'structure',
		attributes: {
			allowed: [
				'aria-expanded',
				'aria-posinset',
				'aria-setsize',
				'aria-errormessage'
			]
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: ['article'],
		unsupported: false
	},
	banner: {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: ['header'],
		unsupported: false,
		allowedElements: ['SECTION']
	},
	button: {
		type: 'widget',
		attributes: {
			allowed: ['aria-expanded', 'aria-pressed', 'aria-errormessage']
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: null,
		implicit: [
			'button',
			'input[type="button"]',
			'input[type="image"]',
			'input[type="reset"]',
			'input[type="submit"]',
			'summary'
		],
		unsupported: false,
		allowedElements: [
			{
				tagName: 'A',
				condition: elementConditions.MUST_HAVE_HREF_ATTRIBUTE
			}
		]
	},
	cell: {
		type: 'structure',
		attributes: {
			allowed: [
				'aria-colindex',
				'aria-colspan',
				'aria-rowindex',
				'aria-rowspan',
				'aria-errormessage'
			]
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: ['row'],
		implicit: ['td', 'th'],
		unsupported: false
	},
	checkbox: {
		type: 'widget',
		attributes: {
			allowed: [
				'aria-checked',
				'aria-required',
				'aria-readonly',
				'aria-errormessage'
			]
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: null,
		implicit: ['input[type="checkbox"]'],
		unsupported: false,
		allowedElements: ['BUTTON']
	},
	columnheader: {
		type: 'structure',
		attributes: {
			allowed: [
				'aria-colindex',
				'aria-colspan',
				'aria-expanded',
				'aria-rowindex',
				'aria-rowspan',
				'aria-required',
				'aria-readonly',
				'aria-selected',
				'aria-sort',
				'aria-errormessage'
			]
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: ['row'],
		implicit: ['th'],
		unsupported: false
	},
	combobox: {
		type: 'composite',
		attributes: {
			allowed: [
				'aria-autocomplete',
				'aria-required',
				'aria-activedescendant',
				'aria-orientation',
				'aria-errormessage'
			],
			required: ['aria-expanded']
		},
		owned: {
			all: ['listbox', 'textbox']
		},
		nameFrom: ['author'],
		context: null,
		unsupported: false,
		allowedElements: [
			{
				tagName: 'INPUT',
				attributes: {
					TYPE: 'TEXT'
				}
			}
		]
	},
	command: {
		nameFrom: ['author'],
		type: 'abstract',
		unsupported: false
	},
	complementary: {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: ['aside'],
		unsupported: false,
		allowedElements: ['SECTION']
	},
	composite: {
		nameFrom: ['author'],
		type: 'abstract',
		unsupported: false
	},
	contentinfo: {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: ['footer'],
		unsupported: false,
		allowedElements: ['SECTION']
	},
	definition: {
		type: 'structure',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: ['dd', 'dfn'],
		unsupported: false
	},
	dialog: {
		type: 'widget',
		attributes: {
			allowed: ['aria-expanded', 'aria-modal', 'aria-errormessage']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: ['dialog'],
		unsupported: false,
		allowedElements: ['SECTION']
	},
	directory: {
		type: 'structure',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: null,
		unsupported: false,
		allowedElements: ['OL', 'UL']
	},
	document: {
		type: 'structure',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: ['body'],
		unsupported: false,
		allowedElements: ['ARTICLE', 'EMBED', 'IFRAME', 'SECTION', 'SVG', 'OBJECT']
	},
	'doc-abstract': {
		type: 'section',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		unsupported: false,
		allowedElements: ['SECTION']
	},
	'doc-acknowledgments': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		unsupported: false,
		allowedElements: ['SECTION']
	},
	'doc-afterword': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		unsupported: false,
		allowedElements: ['SECTION']
	},
	'doc-appendix': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		unsupported: false,
		allowedElements: ['SECTION']
	},
	'doc-backlink': {
		type: 'link',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: null,
		unsupported: false,
		allowedElements: [
			{
				tagName: 'A',
				condition: elementConditions.MUST_HAVE_HREF_ATTRIBUTE
			}
		]
	},
	'doc-biblioentry': {
		type: 'listitem',
		attributes: {
			allowed: [
				'aria-expanded',
				'aria-level',
				'aria-posinset',
				'aria-setsize',
				'aria-errormessage'
			]
		},
		owned: null,
		nameFrom: ['author'],
		context: ['doc-bibliography'],
		unsupported: false,
		allowedElements: ['LI']
	},
	'doc-bibliography': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		unsupported: false,
		allowedElements: ['SECTION']
	},
	'doc-biblioref': {
		type: 'link',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: null,
		unsupported: false,
		allowedElements: [
			{
				tagName: 'A',
				condition: elementConditions.MUST_HAVE_HREF_ATTRIBUTE
			}
		]
	},
	'doc-chapter': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: null,
		namefrom: ['author'],
		context: null,
		unsupported: false,
		allowedElements: ['SECTION']
	},
	'doc-colophon': {
		type: 'section',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: null,
		namefrom: ['author'],
		context: null,
		unsupported: false,
		allowedElements: ['SECTION']
	},
	'doc-conclusion': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: null,
		namefrom: ['author'],
		context: null,
		unsupported: false,
		allowedElements: ['SECTION']
	},
	'doc-cover': {
		type: 'img',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: null,
		namefrom: ['author'],
		context: null,
		unsupported: false
	},
	'doc-credit': {
		type: 'section',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: null,
		namefrom: ['author'],
		context: null,
		unsupported: false,
		allowedElements: ['SECTION']
	},
	'doc-credits': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: null,
		namefrom: ['author'],
		context: null,
		unsupported: false,
		allowedElements: ['SECTION']
	},
	'doc-dedication': {
		type: 'section',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: null,
		namefrom: ['author'],
		context: null,
		unsupported: false,
		allowedElements: ['SECTION']
	},
	'doc-endnote': {
		type: 'listitem',
		attributes: {
			allowed: [
				'aria-expanded',
				'aria-level',
				'aria-posinset',
				'aria-setsize',
				'aria-errormessage'
			]
		},
		owned: null,
		namefrom: ['author'],
		context: ['doc-endnotes'],
		unsupported: false,
		allowedElements: ['LI']
	},
	'doc-endnotes': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: ['doc-endnote'],
		namefrom: ['author'],
		context: null,
		unsupported: false,
		allowedElements: ['SECTION']
	},
	'doc-epigraph': {
		type: 'section',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: null,
		namefrom: ['author'],
		context: null,
		unsupported: false
	},
	'doc-epilogue': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: null,
		namefrom: ['author'],
		context: null,
		unsupported: false,
		allowedElements: ['SECTION']
	},
	'doc-errata': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: null,
		namefrom: ['author'],
		context: null,
		unsupported: false,
		allowedElements: ['SECTION']
	},
	'doc-example': {
		type: 'section',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: null,
		namefrom: ['author'],
		context: null,
		unsupported: false,
		allowedElements: ['ASIDE', 'SECTION']
	},
	'doc-footnote': {
		type: 'section',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: null,
		namefrom: ['author'],
		context: null,
		unsupported: false,
		allowedElements: ['ASIDE', 'FOOTER', 'HEADER']
	},
	'doc-foreword': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: null,
		namefrom: ['author'],
		context: null,
		unsupported: false,
		allowedElements: ['SECTION']
	},
	'doc-glossary': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: ['term', 'definition'],
		namefrom: ['author'],
		context: null,
		unsupported: false,
		allowedElements: ['DL']
	},
	'doc-glossref': {
		type: 'link',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: null,
		namefrom: ['author', 'contents'],
		context: null,
		unsupported: false,
		allowedElements: [
			{
				tagName: 'A',
				condition: elementConditions.MUST_HAVE_HREF_ATTRIBUTE
			}
		]
	},
	'doc-index': {
		type: 'navigation',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: null,
		namefrom: ['author'],
		context: null,
		unsupported: false,
		allowedElements: ['NAV', 'SECTION']
	},
	'doc-introduction': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: null,
		namefrom: ['author'],
		context: null,
		unsupported: false,
		allowedElements: ['SECTION']
	},
	'doc-noteref': {
		type: 'link',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		namefrom: ['author', 'contents'],
		context: null,
		unsupported: false,
		allowedElements: [
			{
				tagName: 'A',
				condition: elementConditions.MUST_HAVE_HREF_ATTRIBUTE
			}
		]
	},
	'doc-notice': {
		type: 'note',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		namefrom: ['author'],
		context: null,
		unsupported: false,
		allowedElements: ['SECTION']
	},
	'doc-pagebreak': {
		type: 'separator',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		namefrom: ['author'],
		context: null,
		unsupported: false,
		allowedElements: ['HR']
	},
	'doc-pagelist': {
		type: 'navigation',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		namefrom: ['author'],
		context: null,
		unsupported: false,
		allowedElements: ['NAV', 'SECTION']
	},
	'doc-part': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		namefrom: ['author'],
		context: null,
		unsupported: false,
		allowedElements: ['SECTION']
	},
	'doc-preface': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		namefrom: ['author'],
		context: null,
		unsupported: false,
		allowedElements: ['SECTION']
	},
	'doc-prologue': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: null,
		namefrom: ['author'],
		context: null,
		unsupported: false,
		allowedElements: ['SECTION']
	},
	'doc-pullquote': {
		type: 'none',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		namefrom: ['author'],
		context: null,
		unsupported: false,
		allowedElements: ['ASIDE', 'SECTION']
	},
	'doc-qna': {
		type: 'section',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		namefrom: ['author'],
		context: null,
		unsupported: false,
		allowedElements: ['SECTION']
	},
	'doc-subtitle': {
		type: 'sectionhead',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		namefrom: ['author'],
		context: null,
		unsupported: false,
		allowedElements: ['H1', 'H2', 'H3', 'H4', 'H5', 'H6']
	},
	'doc-tip': {
		type: 'note',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		namefrom: ['author'],
		context: null,
		unsupported: false,
		allowedElements: ['ASIDE']
	},
	'doc-toc': {
		type: 'navigation',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: null,
		namefrom: ['author'],
		context: null,
		unsupported: false,
		allowedElements: ['NAV', 'SECTION']
	},
	feed: {
		type: 'structure',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: {
			one: ['article']
		},
		nameFrom: ['author'],
		context: null,
		unsupported: false,
		allowedElements: ['ARTICLE', 'ASIDE', 'SECTION']
	},
	figure: {
		type: 'structure',
		unsupported: true
	},
	form: {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: ['form'],
		unsupported: false
	},
	grid: {
		type: 'composite',
		attributes: {
			allowed: [
				'aria-activedescendant',
				'aria-expanded',
				'aria-colcount',
				'aria-level',
				'aria-multiselectable',
				'aria-readonly',
				'aria-rowcount',
				'aria-errormessage'
			]
		},
		owned: {
			one: ['rowgroup', 'row']
		},
		nameFrom: ['author'],
		context: null,
		implicit: ['table'],
		unsupported: false
	},
	gridcell: {
		type: 'widget',
		attributes: {
			allowed: [
				'aria-colindex',
				'aria-colspan',
				'aria-expanded',
				'aria-rowindex',
				'aria-rowspan',
				'aria-selected',
				'aria-readonly',
				'aria-required',
				'aria-errormessage'
			]
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: ['row'],
		implicit: ['td', 'th'],
		unsupported: false
	},
	group: {
		type: 'structure',
		attributes: {
			allowed: ['aria-activedescendant', 'aria-expanded', 'aria-errormessage']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: ['details', 'optgroup'],
		unsupported: false,
		allowedElements: [
			'DL',
			'FIGCAPTION',
			'FIELDSET',
			'FIGURE',
			'FOOTER',
			'HEADER',
			'OL',
			'UL'
		]
	},
	heading: {
		type: 'structure',
		attributes: {
			required: ['aria-level'],
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: null,
		implicit: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
		unsupported: false
	},
	img: {
		type: 'structure',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: ['img'],
		unsupported: false,
		allowedElements: ['EMBED', 'IFRAME', 'OBJECT', 'SVG']
	},
	input: {
		nameFrom: ['author'],
		type: 'abstract',
		unsupported: false
	},
	landmark: {
		nameFrom: ['author'],
		type: 'abstract',
		unsupported: false
	},
	link: {
		type: 'widget',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: null,
		implicit: ['a[href]'],
		unsupported: false,
		allowedElements: [
			'BUTTON',
			{
				tagName: 'INPUT',
				attributes: {
					TYPE: 'IMAGE'
				}
			},
			{
				tagName: 'INPUT',
				attributes: {
					TYPE: 'IMAGE'
				}
			}
		]
	},
	list: {
		type: 'structure',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: {
			all: ['listitem']
		},
		nameFrom: ['author'],
		context: null,
		implicit: ['ol', 'ul', 'dl'],
		unsupported: false
	},
	listbox: {
		type: 'composite',
		attributes: {
			allowed: [
				'aria-activedescendant',
				'aria-multiselectable',
				'aria-required',
				'aria-expanded',
				'aria-orientation',
				'aria-errormessage'
			]
		},
		owned: {
			all: ['option']
		},
		nameFrom: ['author'],
		context: null,
		implicit: ['select'],
		unsupported: false,
		allowedElements: ['OL', 'UL']
	},
	listitem: {
		type: 'structure',
		attributes: {
			allowed: [
				'aria-level',
				'aria-posinset',
				'aria-setsize',
				'aria-expanded',
				'aria-errormessage'
			]
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: ['list'],
		implicit: ['li', 'dt'],
		unsupported: false
	},
	log: {
		type: 'widget',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		unsupported: false,
		allowedElements: ['SECTION']
	},
	main: {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: ['main'],
		unsupported: false,
		allowedElements: ['ARTICLE', 'SECTION']
	},
	marquee: {
		type: 'widget',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		unsupported: false,
		allowedElements: ['SECTION']
	},
	math: {
		type: 'structure',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: ['math'],
		unsupported: false
	},
	menu: {
		type: 'composite',
		attributes: {
			allowed: [
				'aria-activedescendant',
				'aria-expanded',
				'aria-orientation',
				'aria-errormessage'
			]
		},
		owned: {
			one: ['menuitem', 'menuitemradio', 'menuitemcheckbox']
		},
		nameFrom: ['author'],
		context: null,
		implicit: ['menu[type="context"]'],
		unsupported: false,
		allowedElements: ['OL', 'UL']
	},
	menubar: {
		type: 'composite',
		attributes: {
			allowed: [
				'aria-activedescendant',
				'aria-expanded',
				'aria-orientation',
				'aria-errormessage'
			]
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		unsupported: false,
		allowedElements: ['OL', 'UL']
	},
	menuitem: {
		type: 'widget',
		attributes: {
			allowed: [
				'aria-posinset',
				'aria-setsize',
				'aria-expanded',
				'aria-errormessage'
			]
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: ['menu', 'menubar'],
		implicit: ['menuitem[type="command"]'],
		unsupported: false,
		allowedElements: [
			'BUTTON',
			'LI',
			{
				tagName: 'INPUT',
				attributes: {
					TYPE: 'IMAGE'
				}
			},
			{
				tagName: 'INPUT',
				attributes: {
					TYPE: 'BUTTON'
				}
			},
			{
				tagName: 'A',
				condition: elementConditions.MUST_HAVE_HREF_ATTRIBUTE
			}
		]
	},
	menuitemcheckbox: {
		type: 'widget',
		attributes: {
			allowed: [
				'aria-checked',
				'aria-posinset',
				'aria-setsize',
				'aria-errormessage'
			]
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: ['menu', 'menubar'],
		implicit: ['menuitem[type="checkbox"]'],
		unsupported: false,
		allowedElements: [
			'BUTTON',
			'LI',
			{
				tagName: 'INPUT',
				attributes: {
					TYPE: 'CHECKBOX'
				}
			},
			{
				tagName: 'INPUT',
				attributes: {
					TYPE: 'IMAGE'
				}
			},
			{
				tagName: 'INPUT',
				attributes: {
					TYPE: 'BUTTON'
				}
			},
			{
				tagName: 'A',
				condition: elementConditions.MUST_HAVE_HREF_ATTRIBUTE
			}
		]
	},
	menuitemradio: {
		type: 'widget',
		attributes: {
			allowed: [
				'aria-checked',
				'aria-selected',
				'aria-posinset',
				'aria-setsize',
				'aria-errormessage'
			]
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: ['menu', 'menubar'],
		implicit: ['menuitem[type="radio"]'],
		unsupported: false,
		allowedElements: [
			'BUTTON',
			'LI',
			{
				tagName: 'INPUT',
				attributes: {
					TYPE: 'IMAGE'
				}
			},
			{
				tagName: 'INPUT',
				attributes: {
					TYPE: 'BUTTON'
				}
			},
			{
				tagName: 'A',
				condition: elementConditions.MUST_HAVE_HREF_ATTRIBUTE
			}
		]
	},
	navigation: {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: ['nav'],
		unsupported: false,
		allowedElements: ['SECTION']
	},
	none: {
		type: 'structure',
		attributes: null,
		owned: null,
		nameFrom: ['author'],
		context: null,
		unsupported: false,
		allowedElements: [
			'ARTICLE',
			'ASIDE',
			'DL',
			'EMBED',
			'FIGCAPTION',
			'FIELDSET',
			'FIGURE',
			'FOOTER',
			'FORM',
			'H1',
			'H2',
			'H3',
			'H4',
			'H5',
			'H6',
			'HEADER',
			'LI',
			'SECTION',
			'OL',
			{
				tagName: 'IMG',
				condition: elementConditions.MUST_HAVE_ALT_ATTRIBUTE
			}
		]
	},
	note: {
		type: 'structure',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		unsupported: false,
		allowedElements: ['ASIDE']
	},
	option: {
		type: 'widget',
		attributes: {
			allowed: [
				'aria-selected',
				'aria-posinset',
				'aria-setsize',
				'aria-checked',
				'aria-errormessage'
			]
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: ['listbox'],
		implicit: ['option'],
		unsupported: false,
		allowedElements: [
			'BUTTON',
			'LI',
			{
				tagName: 'INPUT',
				attributes: {
					TYPE: 'CHECKBOX'
				}
			},
			{
				tagName: 'INPUT',
				attributes: {
					TYPE: 'BUTTON'
				}
			},
			{
				tagName: 'A',
				condition: elementConditions.MUST_HAVE_HREF_ATTRIBUTE
			}
		]
	},
	presentation: {
		type: 'structure',
		attributes: null,
		owned: null,
		nameFrom: ['author'],
		context: null,
		unsupported: false,
		allowedElements: [
			'ARTICLE',
			'ASIDE',
			'DL',
			'EMBED',
			'FIGCAPTION',
			'FIELDSET',
			'FIGURE',
			'FOOTER',
			'FORM',
			'H1',
			'H2',
			'H3',
			'H4',
			'H5',
			'H6',
			'HEADER',
			'HR',
			'LI',
			'OL',
			'SECTION',
			'UL',
			{
				tagName: 'IMG',
				condition: elementConditions.MUST_HAVE_ALT_ATTRIBUTE
			}
		]
	},
	progressbar: {
		type: 'widget',
		attributes: {
			allowed: [
				'aria-valuetext',
				'aria-valuenow',
				'aria-valuemax',
				'aria-valuemin',
				'aria-expanded',
				'aria-errormessage'
			]
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: ['progress'],
		unsupported: false
	},
	radio: {
		type: 'widget',
		attributes: {
			allowed: [
				'aria-selected',
				'aria-posinset',
				'aria-setsize',
				'aria-required',
				'aria-errormessage'
			],
			required: ['aria-checked']
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: null,
		implicit: ['input[type="radio"]'],
		unsupported: false,
		allowedElements: [
			'BUTTON',
			'LI',
			{
				tagName: 'INPUT',
				attributes: {
					TYPE: 'IMAGE'
				}
			},
			{
				tagName: 'INPUT',
				attributes: {
					TYPE: 'BUTTON'
				}
			}
		]
	},
	radiogroup: {
		type: 'composite',
		attributes: {
			allowed: [
				'aria-activedescendant',
				'aria-required',
				'aria-expanded',
				'aria-readonly',
				'aria-errormessage'
			]
		},
		owned: {
			all: ['radio']
		},
		nameFrom: ['author'],
		context: null,
		unsupported: false,
		allowedElements: ['OL', 'UL']
	},
	range: {
		nameFrom: ['author'],
		type: 'abstract',
		// @marcysutton, @wilco
		// - there is no unsupported here (noticed when resolving conflicts) from PR - https://github.com/dequelabs/axe-core/pull/1064
		// - https://github.com/dequelabs/axe-core/pull/1064/files#diff-ec67bb6113bfd9a900ee27ecef942f74R1229
		// - adding unsupported flag (false)
		unsupported: false
	},
	region: {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: [
			'section[aria-label]',
			'section[aria-labelledby]',
			'section[title]'
		],
		unsupported: false,
		allowedElements: ['ARTICLE', 'ASIDE']
	},
	roletype: {
		type: 'abstract',
		unsupported: false
	},
	row: {
		type: 'structure',
		attributes: {
			allowed: [
				'aria-activedescendant',
				'aria-colindex',
				'aria-expanded',
				'aria-level',
				'aria-selected',
				'aria-rowindex',
				'aria-errormessage'
			]
		},
		owned: {
			one: ['cell', 'columnheader', 'rowheader', 'gridcell']
		},
		nameFrom: ['author', 'contents'],
		context: ['rowgroup', 'grid', 'treegrid', 'table'],
		implicit: ['tr'],
		unsupported: false
	},
	rowgroup: {
		type: 'structure',
		attributes: {
			allowed: ['aria-activedescendant', 'aria-expanded', 'aria-errormessage']
		},
		owned: {
			all: ['row']
		},
		nameFrom: ['author', 'contents'],
		context: ['grid', 'table'],
		implicit: ['tbody', 'thead', 'tfoot'],
		unsupported: false
	},
	rowheader: {
		type: 'structure',
		attributes: {
			allowed: [
				'aria-colindex',
				'aria-colspan',
				'aria-expanded',
				'aria-rowindex',
				'aria-rowspan',
				'aria-required',
				'aria-readonly',
				'aria-selected',
				'aria-sort',
				'aria-errormessage'
			]
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: ['row'],
		implicit: ['th'],
		unsupported: false
	},
	scrollbar: {
		type: 'widget',
		attributes: {
			required: [
				'aria-controls',
				'aria-valuenow',
				'aria-valuemax',
				'aria-valuemin'
			],
			allowed: ['aria-valuetext', 'aria-orientation', 'aria-errormessage']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		unsupported: false
	},
	search: {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		unsupported: false,
		allowedElements: ['ASIDE', 'FORM', 'SECTION']
	},
	searchbox: {
		type: 'widget',
		attributes: {
			allowed: [
				'aria-activedescendant',
				'aria-autocomplete',
				'aria-multiline',
				'aria-readonly',
				'aria-required',
				'aria-placeholder',
				'aria-errormessage'
			]
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: ['input[type="search"]'],
		unsupported: false,
		allowedElements: [
			{
				tagName: 'INPUT',
				attributes: {
					TYPE: 'TEXT'
				}
			}
		]
	},
	section: {
		nameFrom: ['author', 'contents'],
		type: 'abstract',
		unsupported: false
	},
	sectionhead: {
		nameFrom: ['author', 'contents'],
		type: 'abstract',
		unsupported: false
	},
	select: {
		nameFrom: ['author'],
		type: 'abstract',
		unsupported: false
	},
	separator: {
		type: 'structure',
		attributes: {
			allowed: [
				'aria-expanded',
				'aria-orientation',
				'aria-valuenow',
				'aria-valuemax',
				'aria-valuemin',
				'aria-valuetext',
				'aria-errormessage'
			]
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: ['hr'],
		unsupported: false,
		allowedElements: ['LI']
	},
	slider: {
		type: 'widget',
		attributes: {
			allowed: [
				'aria-valuetext',
				'aria-orientation',
				'aria-readonly',
				'aria-errormessage'
			],
			required: ['aria-valuenow', 'aria-valuemax', 'aria-valuemin']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: ['input[type="range"]'],
		unsupported: false
	},
	spinbutton: {
		type: 'widget',
		attributes: {
			allowed: [
				'aria-valuetext',
				'aria-required',
				'aria-readonly',
				'aria-errormessage'
			],
			required: ['aria-valuenow', 'aria-valuemax', 'aria-valuemin']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: ['input[type="number"]'],
		unsupported: false,
		allowedElements: [
			{
				tagName: 'INPUT',
				attributes: {
					TYPE: 'TEXT'
				}
			}
		]
	},
	status: {
		type: 'widget',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: ['output'],
		unsupported: false,
		allowedElements: ['SECTION']
	},
	structure: {
		type: 'abstract',
		unsupported: false
	},
	switch: {
		type: 'widget',
		attributes: {
			allowed: ['aria-errormessage'],
			required: ['aria-checked']
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: null,
		unsupported: false,
		allowedElements: [
			'BUTTON',
			{
				tagName: 'INPUT',
				attributes: {
					TYPE: 'CHECKBOX'
				}
			},
			{
				tagName: 'INPUT',
				attributes: {
					TYPE: 'IMAGE'
				}
			},
			{
				tagName: 'INPUT',
				attributes: {
					TYPE: 'BUTTON'
				}
			},
			{
				tagName: 'A',
				condition: elementConditions.MUST_HAVE_HREF_ATTRIBUTE
			}
		]
	},
	tab: {
		type: 'widget',
		attributes: {
			allowed: [
				'aria-selected',
				'aria-expanded',
				'aria-setsize',
				'aria-posinset',
				'aria-errormessage'
			]
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: ['tablist'],
		unsupported: false,
		allowedElements: [
			'BUTTON',
			'H1',
			'H2',
			'H3',
			'H4',
			'H5',
			'H6',
			'LI',
			{
				tagName: 'INPUT',
				attributes: {
					TYPE: 'BUTTON'
				}
			},
			{
				tagName: 'A',
				condition: elementConditions.MUST_HAVE_HREF_ATTRIBUTE
			}
		]
	},
	table: {
		type: 'structure',
		attributes: {
			allowed: ['aria-colcount', 'aria-rowcount', 'aria-errormessage']
		},
		owned: {
			one: ['rowgroup', 'row']
		},
		nameFrom: ['author'],
		context: null,
		implicit: ['table'],
		unsupported: false
	},
	tablist: {
		type: 'composite',
		attributes: {
			allowed: [
				'aria-activedescendant',
				'aria-expanded',
				'aria-level',
				'aria-multiselectable',
				'aria-orientation',
				'aria-errormessage'
			]
		},
		owned: {
			all: ['tab']
		},
		nameFrom: ['author'],
		context: null,
		unsupported: false,
		allowedElements: ['OL', 'UL']
	},
	tabpanel: {
		type: 'widget',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		unsupported: false,
		allowedElements: ['SECTION']
	},
	term: {
		type: 'structure',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: null,
		implicit: ['dt'],
		unsupported: false
	},
	textbox: {
		type: 'widget',
		attributes: {
			allowed: [
				'aria-activedescendant',
				'aria-autocomplete',
				'aria-multiline',
				'aria-readonly',
				'aria-required',
				'aria-placeholder',
				'aria-errormessage'
			]
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: [
			'input[type="text"]',
			'input[type="email"]',
			'input[type="password"]',
			'input[type="tel"]',
			'input[type="url"]',
			'input:not([type])',
			'textarea'
		],
		unsupported: false
	},
	timer: {
		type: 'widget',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		unsupported: false
	},
	toolbar: {
		type: 'structure',
		attributes: {
			allowed: [
				'aria-activedescendant',
				'aria-expanded',
				'aria-orientation',
				'aria-errormessage'
			]
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: ['menu[type="toolbar"]'],
		unsupported: false,
		allowedElements: ['OL', 'UL']
	},
	tooltip: {
		type: 'widget',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: null,
		unsupported: false
	},
	tree: {
		type: 'composite',
		attributes: {
			allowed: [
				'aria-activedescendant',
				'aria-multiselectable',
				'aria-required',
				'aria-expanded',
				'aria-orientation',
				'aria-errormessage'
			]
		},
		owned: {
			all: ['treeitem']
		},
		nameFrom: ['author'],
		context: null,
		unsupported: false,
		allowedElements: ['OL', 'UL']
	},
	treegrid: {
		type: 'composite',
		attributes: {
			allowed: [
				'aria-activedescendant',
				'aria-colcount',
				'aria-expanded',
				'aria-level',
				'aria-multiselectable',
				'aria-readonly',
				'aria-required',
				'aria-rowcount',
				'aria-orientation',
				'aria-errormessage'
			]
		},
		owned: {
			one: ['rowgroup', 'row']
		},
		nameFrom: ['author'],
		context: null,
		unsupported: false
	},
	treeitem: {
		type: 'widget',
		attributes: {
			allowed: [
				'aria-checked',
				'aria-selected',
				'aria-expanded',
				'aria-level',
				'aria-posinset',
				'aria-setsize',
				'aria-errormessage'
			]
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: ['group', 'tree'],
		unsupported: false,
		allowedElements: [
			'LI',
			{
				tagName: 'A',
				condition: elementConditions.MUST_HAVE_HREF_ATTRIBUTE
			}
		]
	},
	widget: {
		type: 'abstract',
		unsupported: false
	},
	window: {
		nameFrom: ['author'],
		type: 'abstract',
		unsupported: false
	}
};

// Source: https://www.w3.org/TR/html-aria/
lookupTable.elementsAllowedNoRole = [
	{
		tagName: 'AREA',
		condition: elementConditions.MUST_HAVE_HREF_ATTRIBUTE
	},
	'BASE',
	'BODY',
	'CAPTION',
	'COL',
	'COLGROUP',
	'DATALIST',
	'DD',
	'DETAILS',
	'DT',
	'HEAD',
	'HTML',
	{
		tagName: 'INPUT',
		attributes: {
			TYPE: 'COLOR'
		}
	},
	{
		tagName: 'INPUT',
		attributes: {
			TYPE: 'DATE'
		}
	},
	{
		tagName: 'INPUT',
		attributes: {
			TYPE: 'DATETIME'
		}
	},
	{
		tagName: 'INPUT',
		condition: elementConditions.CANNOT_HAVE_LIST_ATTRIBUTE,
		attributes: {
			TYPE: 'EMAIL'
		}
	},
	{
		tagName: 'INPUT',
		attributes: {
			TYPE: 'FILE'
		}
	},
	{
		tagName: 'INPUT',
		attributes: {
			TYPE: 'HIDDEN'
		}
	},
	{
		tagName: 'INPUT',
		attributes: {
			TYPE: 'MONTH'
		}
	},
	{
		tagName: 'INPUT',
		attributes: {
			TYPE: 'NUMBER'
		}
	},
	{
		tagName: 'INPUT',
		attributes: {
			TYPE: 'PASSWORD'
		}
	},
	{
		tagName: 'INPUT',
		attributes: {
			TYPE: 'RANGE'
		}
	},
	{
		tagName: 'INPUT',
		attributes: {
			TYPE: 'RESET'
		}
	},
	{
		tagName: 'INPUT',
		condition: elementConditions.CANNOT_HAVE_LIST_ATTRIBUTE,
		attributes: {
			TYPE: 'SEARCH'
		}
	},
	{
		tagName: 'INPUT',
		attributes: {
			TYPE: 'SUBMIT'
		}
	},
	{
		tagName: 'INPUT',
		condition: elementConditions.CANNOT_HAVE_LIST_ATTRIBUTE,
		attributes: {
			TYPE: 'TEL'
		}
	},
	{
		tagName: 'INPUT',
		attributes: {
			TYPE: 'TIME'
		}
	},
	{
		tagName: 'INPUT',
		condition: elementConditions.CANNOT_HAVE_LIST_ATTRIBUTE,
		attributes: {
			TYPE: 'URL'
		}
	},
	{
		tagName: 'INPUT',
		attributes: {
			TYPE: 'WEEK'
		}
	},
	'KEYGEN',
	'LABEL',
	'LEGEND',
	{
		tagName: 'LINK',
		attributes: {
			TYPE: 'HREF'
		}
	},
	'MAIN',
	'MAP',
	'MATH',
	{
		tagName: 'MENU',
		attributes: {
			TYPE: 'CONTEXT'
		}
	},
	{
		tagName: 'MENUITEM',
		attributes: {
			TYPE: 'COMMAND'
		}
	},
	{
		tagName: 'MENUITEM',
		attributes: {
			TYPE: 'CHECKBOX'
		}
	},
	{
		tagName: 'MENUITEM',
		attributes: {
			TYPE: 'RADIO'
		}
	},
	'META',
	'METER',
	'NOSCRIPT',
	'OPTGROUP',
	'PARAM',
	'PICTURE',
	'PROGRESS',
	'SCRIPT',
	{
		tagName: 'SELECT',
		condition:
			elementConditions.MUST_HAVE_SIZE_ATTRIBUTE_WITH_VALUE_GREATER_THAN_1,
		attributes: {
			TYPE: 'MULTIPLE'
		}
	},
	'SOURCE',
	'STYLE',
	'TEMPLATE',
	'TEXTAREA',
	'TITLE',
	'TRACK',
	// svg elements (below)
	'CLIPPATH',
	'CURSOR',
	'DEFS',
	'DESC',
	'FEBLEND',
	'FECOLORMATRIX',
	'FECOMPONENTTRANSFER',
	'FECOMPOSITE',
	'FECONVOLVEMATRIX',
	'FEDIFFUSELIGHTING',
	'FEDISPLACEMENTMAP',
	'FEDISTANTLIGHT',
	'FEDROPSHADOW',
	'FEFLOOD',
	'FEFUNCA',
	'FEFUNCB',
	'FEFUNCG',
	'FEFUNCR',
	'FEGAUSSIANBLUR',
	'FEIMAGE',
	'FEMERGE',
	'FEMERGENODE',
	'FEMORPHOLOGY',
	'FEOFFSET',
	'FEPOINTLIGHT',
	'FESPECULARLIGHTING',
	'FESPOTLIGHT',
	'FETILE',
	'FETURBULENCE',
	'FILTER',
	'HATCH',
	'HATCHPATH',
	'LINEARGRADIENT',
	'MARKER',
	'MASK',
	'MESHGRADIENT',
	'MESHPATCH',
	'MESHROW',
	'METADATA',
	'MPATH',
	'PATTERN',
	'RADIALGRADIENT',
	'SOLIDCOLOR',
	'STOP',
	'SWITCH',
	'VIEW'
];

// Source: https://www.w3.org/TR/html-aria/
lookupTable.elementsAllowedAnyRole = [
	{
		tagName: 'A',
		condition: elementConditions.CANNOT_HAVE_HREF_ATTRIBUTE
	},
	'ABBR',
	'ADDRESS',
	'CANVAS',
	'DIV',
	'P',
	'PRE',
	'BLOCKQUOTE',
	'INS',
	'DEL',
	'OUTPUT',
	'SPAN',
	'TABLE',
	'TBODY',
	'THEAD',
	'TFOOT',
	'TD',
	'EM',
	'STRONG',
	'SMALL',
	'S',
	'CITE',
	'Q',
	'DFN',
	'ABBR',
	'TIME',
	'CODE',
	'VAR',
	'SAMP',
	'KBD',
	'SUB',
	'SUP',
	'I',
	'B',
	'U',
	'MARK',
	'RUBY',
	'RT',
	'RP',
	'BDI',
	'BDO',
	'BR',
	'WBR',
	'TH',
	'TR'
];

lookupTable.evaluateRoleForElement = {
	A: ({ node, out }) => {
		if (node.namespaceURI === 'http://www.w3.org/2000/svg') {
			return true;
		}
		if (node.href.length) {
			return out;
		}
		return true;
	},
	AREA: ({ node }) => !node.href,
	BUTTON: ({ node, role, out }) => {
		if (node.getAttribute('type') === 'menu') {
			return role === 'menuitem';
		}
		return out;
	},
	IMG: ({ node, out }) => {
		if (node.alt) {
			return !out;
		}
		return out;
	},
	INPUT: ({ node, role, out }) => {
		switch (node.type) {
			case 'button':
			case 'image':
				return out;
			case 'checkbox':
				if (role === 'button' && node.hasAttribute('aria-pressed')) {
					return true;
				}
				return out;
			case 'radio':
				return role === 'menuitemradio';
			case 'text':
				return (
					role === 'combobox' || role === 'searchbox' || role === 'spinbutton'
				);
			default:
				return false;
		}
	},
	LI: ({ node, out }) => {
		const hasImplicitListitemRole = axe.utils.matchesSelector(
			node,
			'ol li, ul li'
		);
		if (hasImplicitListitemRole) {
			return out;
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
		const withinOptionList = axe.utils.matchesSelector(
			node,
			'select > option, datalist > option, optgroup > option'
		);
		return !withinOptionList;
	},
	SELECT: ({ node, role }) =>
		!node.multiple && node.size <= 1 && role === 'menu',
	SVG: ({ node, out }) => {
		// if in svg context it all roles may be used
		if (
			node.parentNode &&
			node.parentNode.namespaceURI === 'http://www.w3.org/2000/svg'
		) {
			return true;
		}
		return out;
	}
};

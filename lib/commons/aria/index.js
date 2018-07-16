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
		type: 'idrefs',
		values: ['']
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

const role = {
	// valid roles below
	alert: {
		type: 'widget',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		allowedElements: ['SECTION']
	},
	alertdialog: {
		type: 'widget',
		attributes: {
			allowed: ['aria-expanded', 'aria-modal']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		allowedElements: ['DIALOG', 'SECTION']
	},
	application: {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
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
			allowed: ['aria-expanded', 'aria-posinset', 'aria-setsize']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: ['article']
	},
	banner: {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: ['header'],
		allowedElements: ['SECTION']
	},
	button: {
		type: 'widget',
		attributes: {
			allowed: ['aria-expanded', 'aria-pressed']
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
		allowedElements: [
			{
				tagName: 'A',
				attributes: [
					{
						name: 'HREF'
					}
				]
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
				'aria-rowspan'
			]
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: ['row'],
		implicit: ['td', 'th']
	},
	checkbox: {
		type: 'widget',
		attributes: {
			allowed: ['aria-checked', 'aria-required', 'aria-readonly']
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: null,
		implicit: ['input[type="checkbox"]'],
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
				'aria-sort'
			]
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: ['row'],
		implicit: ['th']
	},
	combobox: {
		type: 'composite',
		attributes: {
			allowed: [
				'aria-expanded',
				'aria-autocomplete',
				'aria-required',
				'aria-activedescendant',
				'aria-orientation'
			]
		},
		owned: {
			all: ['listbox', 'textbox']
		},
		nameFrom: ['author'],
		context: null
	},
	command: {
		nameFrom: ['author'],
		type: 'abstract'
	},
	complementary: {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: ['aside'],
		allowedElements: ['SECTION']
	},
	composite: {
		nameFrom: ['author'],
		type: 'abstract'
	},
	contentinfo: {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: ['footer'],
		allowedElements: ['SECTION']
	},
	definition: {
		type: 'structure',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: ['dd', 'dfn']
	},
	dialog: {
		type: 'widget',
		attributes: {
			allowed: ['aria-expanded', 'aria-modal']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: ['dialog'],
		allowedElements: ['SECTION']
	},
	directory: {
		type: 'structure',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: null,
		allowedElements: ['OL', 'UL']
	},
	document: {
		type: 'structure',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: ['body'],
		allowedElements: ['ARTICLE', 'EMBED', 'IFRAME', 'SECTION', 'SVG', 'OBJECT']
	},
	'doc-abstract': {
		type: 'section',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		allowedElements: ['SECTION']
	},
	'doc-acknowledgments': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		allowedElements: ['SECTION']
	},
	'doc-afterword': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		allowedElements: ['SECTION']
	},
	'doc-appendix': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		allowedElements: ['SECTION']
	},
	'doc-backlink': {
		type: 'link',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: null,
		allowedElements: [
			{
				tagName: 'A',
				attributes: [
					{
						name: 'HREF'
					}
				]
			}
		]
	},
	'doc-biblioentry': {
		type: 'listitem',
		attributes: {
			allowed: ['aria-expanded', 'aria-level', 'aria-posinset', 'aria-setsize']
		},
		owned: null,
		nameFrom: ['author'],
		context: ['doc-bibliography'],
		allowedElements: ['LI']
	},
	'doc-bibliography': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		allowedElements: ['SECTION']
	},
	'doc-biblioref': {
		type: 'link',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: null,
		allowedElements: [
			{
				tagName: 'A',
				attributes: [
					{
						name: 'HREF'
					}
				]
			}
		]
	},
	'doc-chapter': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		namefrom: ['author'],
		context: null,
		allowedElements: ['SECTION']
	},
	'doc-colophon': {
		type: 'section',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		namefrom: ['author'],
		context: null,
		allowedElements: ['SECTION']
	},
	'doc-conclusion': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		namefrom: ['author'],
		context: null,
		allowedElements: ['SECTION']
	},
	'doc-cover': {
		type: 'img',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		namefrom: ['author'],
		context: null
	},
	'doc-credit': {
		type: 'section',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		namefrom: ['author'],
		context: null,
		allowedElements: ['SECTION']
	},
	'doc-credits': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		namefrom: ['author'],
		context: null,
		allowedElements: ['SECTION']
	},
	'doc-dedication': {
		type: 'section',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		namefrom: ['author'],
		context: null,
		allowedElements: ['SECTION']
	},
	'doc-endnote': {
		type: 'listitem',
		attributes: {
			allowed: ['aria-expanded', 'aria-level', 'aria-posinset', 'aria-setsize']
		},
		owned: null,
		namefrom: ['author'],
		context: ['doc-endnotes'],
		allowedElements: ['LI']
	},
	'doc-endnotes': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: ['doc-endnote'],
		namefrom: ['author'],
		context: null,
		allowedElements: ['SECTION']
	},
	'doc-epigraph': {
		type: 'section',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		namefrom: ['author'],
		context: null
	},
	'doc-epilogue': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		namefrom: ['author'],
		context: null,
		allowedElements: ['SECTION']
	},
	'doc-errata': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		namefrom: ['author'],
		context: null,
		allowedElements: ['SECTION']
	},
	'doc-example': {
		type: 'section',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		namefrom: ['author'],
		context: null,
		allowedElements: ['ASIDE', 'SECTION']
	},
	'doc-footnote': {
		type: 'section',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		namefrom: ['author'],
		context: null,
		allowedElements: ['ASIDE', 'FOOTER', 'HEADER']
	},
	'doc-foreword': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		namefrom: ['author'],
		context: null,
		allowedElements: ['SECTION']
	},
	'doc-glossary': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: ['term', 'definition'],
		namefrom: ['author'],
		context: null,
		allowedElements: ['DL']
	},
	'doc-glossref': {
		type: 'link',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		namefrom: ['author', 'contents'],
		context: null,
		allowedElements: [
			{
				tagName: 'A',
				attributes: [
					{
						name: 'HREF'
					}
				]
			}
		]
	},
	'doc-index': {
		type: 'navigation',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		namefrom: ['author'],
		context: null,
		allowedElements: ['NAV', 'SECTION']
	},
	'doc-introduction': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		namefrom: ['author'],
		context: null,
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
		allowedElements: [
			{
				tagName: 'A',
				attributes: [
					{
						name: 'HREF'
					}
				]
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
		allowedElements: ['SECTION']
	},
	'doc-prologue': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		namefrom: ['author'],
		context: null,
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
		allowedElements: ['ASIDE']
	},
	'doc-toc': {
		type: 'navigation',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		namefrom: ['author'],
		context: null,
		allowedElements: ['NAV', 'SECTION']
	},
	feed: {
		type: 'structure',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: {
			one: ['article']
		},
		nameFrom: ['author'],
		context: null,
		allowedElements: ['ARTICLE', 'ASIDE', 'SECTION']
	},
	form: {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: ['form']
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
				'aria-rowcount'
			]
		},
		owned: {
			one: ['rowgroup', 'row']
		},
		nameFrom: ['author'],
		context: null,
		implicit: ['table']
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
				'aria-required'
			]
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: ['row'],
		implicit: ['td', 'th']
	},
	group: {
		type: 'structure',
		attributes: {
			allowed: ['aria-activedescendant', 'aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: ['details', 'optgroup'],
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
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: null,
		implicit: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
	},
	img: {
		type: 'structure',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: ['img'],
		allowedElements: ['EMBED', 'IFRAME', 'OBJECT', 'SVG']
	},
	input: {
		nameFrom: ['author'],
		type: 'abstract'
	},
	landmark: {
		nameFrom: ['author'],
		type: 'abstract'
	},
	link: {
		type: 'widget',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: null,
		implicit: ['a[href]'],
		allowedElements: [
			'BUTTON',
			{
				tagName: 'INPUT',
				attributes: [
					{
						name: 'TYPE',
						value: 'IMAGE'
					}
				]
			},
			{
				tagName: 'INPUT',
				attributes: [
					{
						name: 'TYPE',
						value: 'BUTTON'
					}
				]
			}
		]
	},
	list: {
		type: 'structure',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: {
			all: ['listitem']
		},
		nameFrom: ['author'],
		context: null,
		implicit: ['ol', 'ul', 'dl']
	},
	listbox: {
		type: 'composite',
		attributes: {
			allowed: [
				'aria-activedescendant',
				'aria-multiselectable',
				'aria-required',
				'aria-expanded',
				'aria-orientation'
			]
		},
		owned: {
			all: ['option']
		},
		nameFrom: ['author'],
		context: null,
		implicit: ['select'],
		allowedElements: ['OL', 'UL']
	},
	listitem: {
		type: 'structure',
		attributes: {
			allowed: ['aria-level', 'aria-posinset', 'aria-setsize', 'aria-expanded']
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: ['list'],
		implicit: ['li', 'dt']
	},
	log: {
		type: 'widget',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		allowedElements: ['SECTION']
	},
	main: {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: ['main'],
		allowedElements: ['ARTICLE', 'SECTION']
	},
	marquee: {
		type: 'widget',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		allowedElements: ['SECTION']
	},
	math: {
		type: 'structure',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: ['math']
	},
	menu: {
		type: 'composite',
		attributes: {
			allowed: ['aria-activedescendant', 'aria-expanded', 'aria-orientation']
		},
		owned: {
			one: ['menuitem', 'menuitemradio', 'menuitemcheckbox']
		},
		nameFrom: ['author'],
		context: null,
		implicit: ['menu[type="context"]'],
		allowedElements: ['OL', 'UL']
	},
	menubar: {
		type: 'composite',
		attributes: {
			allowed: ['aria-activedescendant', 'aria-expanded', 'aria-orientation']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		allowedElements: ['OL', 'UL']
	},
	menuitem: {
		type: 'widget',
		attributes: {
			allowed: ['aria-posinset', 'aria-setsize', 'aria-expanded']
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: ['menu', 'menubar'],
		implicit: ['menuitem[type="command"]'],
		allowedElements: [
			'BUTTON',
			'LI',
			{
				tagName: 'INPUT',
				attributes: [
					{
						name: 'TYPE',
						value: 'IMAGE'
					}
				]
			},
			{
				tagName: 'INPUT',
				attributes: [
					{
						name: 'TYPE',
						value: 'BUTTON'
					}
				]
			},
			{
				tagName: 'A',
				attributes: [
					{
						name: 'HREF'
					}
				]
			}
		]
	},
	menuitemcheckbox: {
		type: 'widget',
		attributes: {
			allowed: ['aria-checked', 'aria-posinset', 'aria-setsize']
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: ['menu', 'menubar'],
		implicit: ['menuitem[type="checkbox"]'],
		allowedElements: [
			'BUTTON',
			'LI',
			{
				tagName: 'INPUT',
				attributes: [
					{
						name: 'TYPE',
						value: 'CHECKBOX'
					}
				]
			},
			{
				tagName: 'INPUT',
				attributes: [
					{
						name: 'TYPE',
						value: 'IMAGE'
					}
				]
			},
			{
				tagName: 'INPUT',
				attributes: [
					{
						name: 'TYPE',
						value: 'BUTTON'
					}
				]
			},
			{
				tagName: 'A',
				attributes: [
					{
						name: 'HREF'
					}
				]
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
				'aria-setsize'
			]
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: ['menu', 'menubar'],
		implicit: ['menuitem[type="radio"]'],
		allowedElements: [
			'BUTTON',
			'LI',
			{
				tagName: 'INPUT',
				attributes: [
					{
						name: 'TYPE',
						value: 'IMAGE'
					}
				]
			},
			{
				tagName: 'INPUT',
				attributes: [
					{
						name: 'TYPE',
						value: 'BUTTON'
					}
				]
			},
			{
				tagName: 'A',
				attributes: [
					{
						name: 'HREF'
					}
				]
			}
		]
	},
	navigation: {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: ['nav'],
		allowedElements: ['SECTION']
	},
	none: {
		type: 'structure',
		attributes: null,
		owned: null,
		nameFrom: ['author'],
		context: null,
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
				attributes: [
					{
						name: 'ALT',
						value: ''
					}
				]
			}
		]
	},
	note: {
		type: 'structure',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		allowedElements: ['ASIDE']
	},
	option: {
		type: 'widget',
		attributes: {
			allowed: [
				'aria-selected',
				'aria-posinset',
				'aria-setsize',
				'aria-checked'
			]
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: ['listbox'],
		implicit: ['option'],
		allowedElements: [
			'BUTTON',
			'LI',
			{
				tagName: 'INPUT',
				attributes: [
					{
						name: 'TYPE',
						value: 'CHECKBOX'
					}
				]
			},
			{
				tagName: 'INPUT',
				attributes: [
					{
						name: 'TYPE',
						value: 'BUTTON'
					}
				]
			},
			{
				tagName: 'A',
				attributes: [
					{
						name: 'HREF'
					}
				]
			}
		]
	},
	presentation: {
		type: 'structure',
		attributes: null,
		owned: null,
		nameFrom: ['author'],
		context: null,
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
				attributes: [
					{
						name: 'ALT',
						value: ''
					}
				]
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
				'aria-expanded'
			]
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: ['progress']
	},
	radio: {
		type: 'widget',
		attributes: {
			allowed: [
				'aria-checked',
				'aria-selected',
				'aria-posinset',
				'aria-setsize',
				'aria-required'
			]
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: null,
		implicit: ['input[type="radio"]'],
		allowedElements: [
			'BUTTON',
			'LI',
			{
				tagName: 'INPUT',
				attributes: [
					{
						name: 'TYPE',
						value: 'IMAGE'
					}
				]
			},
			{
				tagName: 'INPUT',
				attributes: [
					{
						name: 'TYPE',
						value: 'BUTTON'
					}
				]
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
				'aria-readonly'
			]
		},
		owned: {
			all: ['radio']
		},
		nameFrom: ['author'],
		context: null,
		allowedElements: ['OL', 'UL']
	},
	range: {
		nameFrom: ['author'],
		type: 'abstract'
	},
	region: {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: [
			'section[aria-label]',
			'section[aria-labelledby]',
			'section[title]'
		],
		allowedElements: ['ARTICLE', 'ASIDE']
	},
	roletype: {
		type: 'abstract'
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
				'aria-rowindex'
			]
		},
		owned: {
			one: ['cell', 'columnheader', 'rowheader', 'gridcell']
		},
		nameFrom: ['author', 'contents'],
		context: ['rowgroup', 'grid', 'treegrid', 'table'],
		implicit: ['tr']
	},
	rowgroup: {
		type: 'structure',
		attributes: {
			allowed: ['aria-activedescendant', 'aria-expanded']
		},
		owned: {
			all: ['row']
		},
		nameFrom: ['author', 'contents'],
		context: ['grid', 'table'],
		implicit: ['tbody', 'thead', 'tfoot']
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
				'aria-sort'
			]
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: ['row'],
		implicit: ['th']
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
			allowed: ['aria-valuetext', 'aria-orientation']
		},
		owned: null,
		nameFrom: ['author'],
		context: null
	},
	search: {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
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
				'aria-placeholder'
			]
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: ['input[type="search"]']
	},
	section: {
		nameFrom: ['author', 'contents'],
		type: 'abstract'
	},
	sectionhead: {
		nameFrom: ['author', 'contents'],
		type: 'abstract'
	},
	select: {
		nameFrom: ['author'],
		type: 'abstract'
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
				'aria-valuetext'
			]
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: ['hr'],
		allowedElements: ['LI']
	},
	slider: {
		type: 'widget',
		attributes: {
			allowed: ['aria-valuetext', 'aria-orientation', 'aria-readonly'],
			required: ['aria-valuenow', 'aria-valuemax', 'aria-valuemin']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: ['input[type="range"]']
	},
	spinbutton: {
		type: 'widget',
		attributes: {
			allowed: ['aria-valuetext', 'aria-required', 'aria-readonly'],
			required: ['aria-valuenow', 'aria-valuemax', 'aria-valuemin']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: ['input[type="number"]']
	},
	status: {
		type: 'widget',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: ['output'],
		allowedElements: ['SECTION']
	},
	structure: {
		type: 'abstract'
	},
	switch: {
		type: 'widget',
		attributes: {
			required: ['aria-checked']
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: null,
		allowedElements: [
			'BUTTON',
			{
				tagName: 'INPUT',
				attributes: [
					{
						name: 'TYPE',
						value: 'CHECKBOX'
					}
				]
			},
			{
				tagName: 'INPUT',
				attributes: [
					{
						name: 'TYPE',
						value: 'IMAGE'
					}
				]
			},
			{
				tagName: 'INPUT',
				attributes: [
					{
						name: 'TYPE',
						value: 'BUTTON'
					}
				]
			},
			{
				tagName: 'A',
				attributes: [
					{
						name: 'HREF'
					}
				]
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
				'aria-posinset'
			]
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: ['tablist'],
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
				attributes: [
					{
						name: 'TYPE',
						value: 'BUTTON'
					}
				]
			},
			{
				tagName: 'A',
				attributes: [
					{
						name: 'HREF'
					}
				]
			}
		]
	},
	table: {
		type: 'structure',
		attributes: {
			allowed: ['aria-colcount', 'aria-rowcount']
		},
		owned: {
			one: ['rowgroup', 'row']
		},
		nameFrom: ['author'],
		context: null,
		implicit: ['table']
	},
	tablist: {
		type: 'composite',
		attributes: {
			allowed: [
				'aria-activedescendant',
				'aria-expanded',
				'aria-level',
				'aria-multiselectable',
				'aria-orientation'
			]
		},
		owned: {
			all: ['tab']
		},
		nameFrom: ['author'],
		context: null,
		allowedElements: ['OL', 'UL']
	},
	tabpanel: {
		type: 'widget',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		allowedElements: ['SECTION']
	},
	term: {
		type: 'structure',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: null,
		implicit: ['dt']
	},
	text: {
		type: 'structure',
		owned: null,
		nameFrom: ['author', 'contents'],
		context: null
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
				'aria-placeholder'
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
		]
	},
	timer: {
		type: 'widget',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null
	},
	toolbar: {
		type: 'structure',
		attributes: {
			allowed: ['aria-activedescendant', 'aria-expanded', 'aria-orientation']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: ['menu[type="toolbar"]'],
		allowedElements: ['OL', 'UL']
	},
	tooltip: {
		type: 'widget',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: null
	},
	tree: {
		type: 'composite',
		attributes: {
			allowed: [
				'aria-activedescendant',
				'aria-multiselectable',
				'aria-required',
				'aria-expanded',
				'aria-orientation'
			]
		},
		owned: {
			all: ['treeitem']
		},
		nameFrom: ['author'],
		context: null,
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
				'aria-orientation'
			]
		},
		owned: {
			one: ['rowgroup', 'row']
		},
		nameFrom: ['author'],
		context: null
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
				'aria-setsize'
			]
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: ['group', 'tree'],
		allowedElements: [
			'LI',
			{
				tagName: 'A',
				attributes: [
					{
						name: 'HREF'
					}
				]
			}
		]
	},
	widget: {
		type: 'abstract'
	},
	window: {
		nameFrom: ['author'],
		type: 'abstract'
	}
};
// extend lookupTable.role with a non-enumerable custom property to hold element/ tag names that can have any role
Object.defineProperty(role, 'NO_ROLE', {
	value: {
		allowedElements: [
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
			'KEYGEN',
			'LABEL',
			'LEGEND',
			'MAIN',
			'MAP',
			'MATH',
			'MENUITEM',
			'META',
			'METER',
			'NOSCRIPT',
			'OPTGROUP',
			'PARAM',
			'PICTURE',
			'PROGRESS',
			'SCRIPT',
			'SOURCE',
			'STYLE',
			'SUMMARY',
			'TEMPLATE',
			'TEXTAREA',
			'TITLE',
			'TRACK',
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
		]
	},
	enumerable: false
});

Object.defineProperty(role, 'ANY_ROLE', {
	value: {
		allowedElements: ['DIV']
	},
	enumerable: false
});

lookupTable.role = role;

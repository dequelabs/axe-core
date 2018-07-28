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

lookupTable.role = {
	alert: {
		type: 'widget',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null
	},
	alertdialog: {
		type: 'widget',
		attributes: {
			allowed: ['aria-expanded', 'aria-modal']
		},
		owned: null,
		nameFrom: ['author'],
		context: null
	},
	application: {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null
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
		implicit: ['header']
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
		implicit: ['input[type="checkbox"]']
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
		implicit: ['aside']
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
		implicit: ['footer']
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
		implicit: ['dialog']
	},
	directory: {
		type: 'structure',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: null
	},
	document: {
		type: 'structure',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: ['body']
	},
	'doc-abstract': {
		type: 'section',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null
	},
	'doc-acknowledgments': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null
	},
	'doc-afterword': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null
	},
	'doc-appendix': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null
	},
	'doc-backlink': {
		type: 'link',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: null
	},
	'doc-biblioentry': {
		type: 'listitem',
		attributes: {
			allowed: ['aria-expanded', 'aria-level', 'aria-posinset', 'aria-setsize']
		},
		owned: null,
		nameFrom: ['author'],
		context: ['doc-bibliography']
	},
	'doc-bibliography': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null
	},
	'doc-biblioref': {
		type: 'link',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: null
	},
	'doc-chapter': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		namefrom: ['author'],
		context: null
	},
	'doc-colophon': {
		type: 'section',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		namefrom: ['author'],
		context: null
	},
	'doc-conclusion': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		namefrom: ['author'],
		context: null
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
		context: null
	},
	'doc-credits': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		namefrom: ['author'],
		context: null
	},
	'doc-dedication': {
		type: 'section',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		namefrom: ['author'],
		context: null
	},
	'doc-endnote': {
		type: 'listitem',
		attributes: {
			allowed: ['aria-expanded', 'aria-level', 'aria-posinset', 'aria-setsize']
		},
		owned: null,
		namefrom: ['author'],
		context: ['doc-endnotes']
	},
	'doc-endnotes': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: ['doc-endnote'],
		namefrom: ['author'],
		context: null
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
		context: null
	},
	'doc-errata': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		namefrom: ['author'],
		context: null
	},
	'doc-example': {
		type: 'section',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		namefrom: ['author'],
		context: null
	},
	'doc-footnote': {
		type: 'section',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		namefrom: ['author'],
		context: null
	},
	'doc-foreword': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		namefrom: ['author'],
		context: null
	},
	'doc-glossary': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: ['term', 'definition'],
		namefrom: ['author'],
		context: null
	},
	'doc-glossref': {
		type: 'link',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		namefrom: ['author', 'contents'],
		context: null
	},
	'doc-index': {
		type: 'navigation',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		namefrom: ['author'],
		context: null
	},
	'doc-introduction': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		namefrom: ['author'],
		context: null
	},
	'doc-noteref': {
		type: 'link',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		namefrom: ['author', 'contents'],
		context: null
	},
	'doc-notice': {
		type: 'note',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		namefrom: ['author'],
		context: null
	},
	'doc-pagebreak': {
		type: 'separator',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		namefrom: ['author'],
		context: null
	},
	'doc-pagelist': {
		type: 'navigation',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		namefrom: ['author'],
		context: null
	},
	'doc-part': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		namefrom: ['author'],
		context: null
	},
	'doc-preface': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		namefrom: ['author'],
		context: null
	},
	'doc-prologue': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		namefrom: ['author'],
		context: null
	},
	'doc-pullquote': {
		type: 'none',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		namefrom: ['author'],
		context: null
	},
	'doc-qna': {
		type: 'section',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		namefrom: ['author'],
		context: null
	},
	'doc-subtitle': {
		type: 'sectionhead',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		namefrom: ['author'],
		context: null
	},
	'doc-tip': {
		type: 'note',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		namefrom: ['author'],
		context: null
	},
	'doc-toc': {
		type: 'navigation',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		namefrom: ['author'],
		context: null
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
		context: null
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
		implicit: ['details', 'optgroup']
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
		implicit: ['img']
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
		implicit: ['a[href]']
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
		implicit: ['select']
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
		context: null
	},
	main: {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: ['main']
	},
	marquee: {
		type: 'widget',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null
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
		implicit: ['menu[type="context"]']
	},
	menubar: {
		type: 'composite',
		attributes: {
			allowed: ['aria-activedescendant', 'aria-expanded', 'aria-orientation']
		},
		owned: null,
		nameFrom: ['author'],
		context: null
	},
	menuitem: {
		type: 'widget',
		attributes: {
			allowed: ['aria-posinset', 'aria-setsize', 'aria-expanded']
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: ['menu', 'menubar'],
		implicit: ['menuitem[type="command"]']
	},
	menuitemcheckbox: {
		type: 'widget',
		attributes: {
			allowed: ['aria-checked', 'aria-posinset', 'aria-setsize']
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: ['menu', 'menubar'],
		implicit: ['menuitem[type="checkbox"]']
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
		implicit: ['menuitem[type="radio"]']
	},
	navigation: {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: ['nav']
	},
	none: {
		type: 'structure',
		attributes: null,
		owned: null,
		nameFrom: ['author'],
		context: null
	},
	note: {
		type: 'structure',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null
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
		implicit: ['option']
	},
	presentation: {
		type: 'structure',
		attributes: null,
		owned: null,
		nameFrom: ['author'],
		context: null
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
		implicit: ['input[type="radio"]']
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
		context: null
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
		]
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
		context: null
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
		implicit: ['hr']
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
		implicit: ['output']
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
		context: null
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
		context: ['tablist']
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
		context: null
	},
	tabpanel: {
		type: 'widget',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null
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
		implicit: ['menu[type="toolbar"]']
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
		context: null
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
		context: ['group', 'tree']
	},
	widget: {
		type: 'abstract'
	},
	window: {
		nameFrom: ['author'],
		type: 'abstract'
	}
};

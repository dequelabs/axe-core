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

lookupTable.role = {
	alert: {
		type: 'widget',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		unsupported: false
	},
	alertdialog: {
		type: 'widget',
		attributes: {
			allowed: ['aria-expanded', 'aria-modal', 'aria-errormessage']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		unsupported: false
	},
	application: {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		unsupported: false
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
		unsupported: false
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
		unsupported: false
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
		unsupported: false
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
				'aria-expanded',
				'aria-autocomplete',
				'aria-required',
				'aria-activedescendant',
				'aria-orientation',
				'aria-errormessage'
			]
		},
		owned: {
			all: ['listbox', 'textbox']
		},
		nameFrom: ['author'],
		context: null,
		unsupported: false
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
		unsupported: false
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
		unsupported: false
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
		unsupported: false
	},
	directory: {
		type: 'structure',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: null,
		unsupported: false
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
		unsupported: false
	},
	'doc-abstract': {
		type: 'section',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		unsupported: false
	},
	'doc-acknowledgments': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		unsupported: false
	},
	'doc-afterword': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		unsupported: false
	},
	'doc-appendix': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		unsupported: false
	},
	'doc-backlink': {
		type: 'link',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: null,
		unsupported: false
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
		unsupported: false
	},
	'doc-bibliography': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		unsupported: false
	},
	'doc-biblioref': {
		type: 'link',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: null,
		unsupported: false
	},
	'doc-chapter': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: null,
		namefrom: ['author'],
		context: null,
		unsupported: false
	},
	'doc-colophon': {
		type: 'section',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: null,
		namefrom: ['author'],
		context: null,
		unsupported: false
	},
	'doc-conclusion': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: null,
		namefrom: ['author'],
		context: null,
		unsupported: false
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
		unsupported: false
	},
	'doc-credits': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: null,
		namefrom: ['author'],
		context: null,
		unsupported: false
	},
	'doc-dedication': {
		type: 'section',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: null,
		namefrom: ['author'],
		context: null,
		unsupported: false
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
		unsupported: false
	},
	'doc-endnotes': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: ['doc-endnote'],
		namefrom: ['author'],
		context: null,
		unsupported: false
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
		unsupported: false
	},
	'doc-errata': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: null,
		namefrom: ['author'],
		context: null,
		unsupported: false
	},
	'doc-example': {
		type: 'section',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: null,
		namefrom: ['author'],
		context: null,
		unsupported: false
	},
	'doc-footnote': {
		type: 'section',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: null,
		namefrom: ['author'],
		context: null,
		unsupported: false
	},
	'doc-foreword': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: null,
		namefrom: ['author'],
		context: null,
		unsupported: false
	},
	'doc-glossary': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: ['term', 'definition'],
		namefrom: ['author'],
		context: null,
		unsupported: false
	},
	'doc-glossref': {
		type: 'link',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: null,
		namefrom: ['author', 'contents'],
		context: null,
		unsupported: false
	},
	'doc-index': {
		type: 'navigation',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: null,
		namefrom: ['author'],
		context: null,
		unsupported: false
	},
	'doc-introduction': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: null,
		namefrom: ['author'],
		context: null,
		unsupported: false
	},
	'doc-noteref': {
		type: 'link',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		namefrom: ['author', 'contents'],
		context: null,
		unsupported: false
	},
	'doc-notice': {
		type: 'note',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		namefrom: ['author'],
		context: null,
		unsupported: false
	},
	'doc-pagebreak': {
		type: 'separator',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		namefrom: ['author'],
		context: null,
		unsupported: false
	},
	'doc-pagelist': {
		type: 'navigation',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		namefrom: ['author'],
		context: null,
		unsupported: false
	},
	'doc-part': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		namefrom: ['author'],
		context: null,
		unsupported: false
	},
	'doc-preface': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		namefrom: ['author'],
		context: null,
		unsupported: false
	},
	'doc-prologue': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: null,
		namefrom: ['author'],
		context: null,
		unsupported: false
	},
	'doc-pullquote': {
		type: 'none',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		namefrom: ['author'],
		context: null,
		unsupported: false
	},
	'doc-qna': {
		type: 'section',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		namefrom: ['author'],
		context: null,
		unsupported: false
	},
	'doc-subtitle': {
		type: 'sectionhead',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		namefrom: ['author'],
		context: null,
		unsupported: false
	},
	'doc-tip': {
		type: 'note',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		namefrom: ['author'],
		context: null,
		unsupported: false
	},
	'doc-toc': {
		type: 'navigation',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: null,
		namefrom: ['author'],
		context: null,
		unsupported: false
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
		unsupported: false
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
		unsupported: false
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
		unsupported: false
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
		unsupported: false
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
		unsupported: false
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
		unsupported: false
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
		unsupported: false
	},
	marquee: {
		type: 'widget',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		unsupported: false
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
		unsupported: false
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
		unsupported: false
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
		unsupported: false
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
		unsupported: false
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
		unsupported: false
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
		unsupported: false
	},
	none: {
		type: 'structure',
		attributes: null,
		owned: null,
		nameFrom: ['author'],
		context: null,
		unsupported: false
	},
	note: {
		type: 'structure',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		unsupported: false
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
		unsupported: false
	},
	presentation: {
		type: 'structure',
		attributes: null,
		owned: null,
		nameFrom: ['author'],
		context: null,
		unsupported: false
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
				'aria-checked',
				'aria-selected',
				'aria-posinset',
				'aria-setsize',
				'aria-required',
				'aria-errormessage'
			]
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: null,
		implicit: ['input[type="radio"]'],
		unsupported: false
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
		unsupported: false
	},
	range: {
		nameFrom: ['author'],
		type: 'abstract'
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
		unsupported: false
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
		unsupported: false
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
		unsupported: false
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
		unsupported: false
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
		unsupported: false
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
		unsupported: false
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
		unsupported: false
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
		unsupported: false
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
		unsupported: false
	},
	tabpanel: {
		type: 'widget',
		attributes: {
			allowed: ['aria-expanded', 'aria-errormessage']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		unsupported: false
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
	text: {
		type: 'structure',
		owned: null,
		nameFrom: ['author', 'contents'],
		context: null,
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
		unsupported: false
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
		unsupported: false
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
		unsupported: false
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

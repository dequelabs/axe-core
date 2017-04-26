var aria = commons.aria = {},
	lookupTables = aria._lut = {};

lookupTables.attributes = {
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
		type: 'boolean',
		values: ['true', 'false']
	},
	'aria-hidden': {
		type: 'boolean',
		values: ['true', 'false']
	},
	'aria-invalid': {
		type: 'nmtoken',
		values: ['true', 'false', 'spelling', 'grammar']
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
	'aria-multiline': {
		type: 'boolean',
		values: ['true', 'false']
	},
	'aria-multiselectable': {
		type: 'boolean',
		values: ['true', 'false']
	},
	'aria-orientation' : {
		type : 'nmtoken',
		values : ['horizontal', 'vertical']
	},
	'aria-owns': {
		type: 'idrefs'
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

lookupTables.globalAttributes = [
	'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby',
	'aria-disabled', 'aria-dropeffect', 'aria-flowto', 'aria-grabbed',
	'aria-haspopup', 'aria-hidden', 'aria-invalid', 'aria-label',
	'aria-labelledby', 'aria-live', 'aria-owns', 'aria-relevant'
];

lookupTables.role = {
	'alert': {
		type: 'widget',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null
	},
	'alertdialog': {
		type: 'widget',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null
	},
	'application': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null
	},
	'article': {
		type: 'structure',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: ['article']
	},
	'banner': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: ['header']
	},
	'button': {
		type: 'widget',
		attributes: {
			allowed: ['aria-expanded', 'aria-pressed']
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: null,
		implicit: ['button', 'input[type="button"]', 'input[type="image"]', 'input[type="reset"]', 'input[type="submit"]', 'summary']
	},
	'cell': {
		type: 'structure',
		attributes: {
			allowed: ['aria-colindex', 'aria-colspan', 'aria-rowindex', 'aria-rowspan']
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: ['row'],
		implicit: ['td', 'th']
	},
	'checkbox': {
		type: 'widget',
		attributes:  {
			required: ['aria-checked']
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: null,
		implicit: ['input[type="checkbox"]']
	},
	'columnheader': {
		type: 'structure',
		attributes: {
			allowed: ['aria-expanded', 'aria-sort', 'aria-readonly', 'aria-selected', 'aria-required']
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: ['row'],
		implicit: ['th']
	},
	'combobox': {
		type: 'composite',
		attributes:  {
			required: ['aria-expanded'],
			allowed: ['aria-autocomplete', 'aria-required', 'aria-activedescendant']
		},
		owned: {
			all: ['listbox', 'textbox']
		},
		nameFrom: ['author'],
		context: null
	},
	'command': {
		nameFrom: ['author'],
		type: 'abstract'
	},
	'complementary': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: ['aside']
	},
	'composite': {
		nameFrom: ['author'],
		type: 'abstract'
	},
	'contentinfo': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: ['footer']
	},
	'definition': {
		type: 'structure',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: ['dd']
	},
	'dialog': {
		type: 'widget',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: ['dialog']
	},
	'directory': {
		type: 'structure',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: null
	},
	'document': {
		type: 'structure',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: ['body']
	},
	'form': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: ['form']
	},
	'grid': {
		type: 'composite',
		attributes: {
			allowed: ['aria-level', 'aria-multiselectable', 'aria-readonly', 'aria-activedescendant', 'aria-expanded']
		},
		owned: {
			one: ['rowgroup', 'row']
		},
		nameFrom: ['author'],
		context: null,
		implicit: ['table']
	},
	'gridcell': {
		type: 'widget',
		attributes: {
			allowed: ['aria-selected', 'aria-readonly', 'aria-expanded', 'aria-required']
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: ['row'],
		implicit: ['td', 'th']
	},
	'group': {
		type: 'structure',
		attributes: {
			allowed: ['aria-activedescendant', 'aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: ['details', 'optgroup']
	},
	'heading': {
		type: 'structure',
		attributes: {
			allowed: ['aria-level', 'aria-expanded']
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: null,
		implicit: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
	},
	'img': {
		type: 'structure',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: ['img']
	},
	'input': {
		nameFrom: ['author'],
		type: 'abstract'
	},
	'landmark': {
		nameFrom: ['author'],
		type: 'abstract'
	},
	'link': {
		type: 'widget',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: null,
		implicit: ['a[href]']
	},
	'list': {
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
	'listbox': {
		type: 'composite',
		attributes: {
			allowed: ['aria-activedescendant', 'aria-multiselectable', 'aria-required', 'aria-expanded']
		},
		owned: {
			all: ['option']
		},
		nameFrom: ['author'],
		context: null,
		implicit: ['select']
	},
	'listitem': {
		type: 'structure',
		attributes: {
			allowed: ['aria-level', 'aria-posinset', 'aria-setsize', 'aria-expanded']
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: ['list'],
		implicit: ['li', 'dt']
	},
	'log': {
		type: 'widget',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null
	},
	'main': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: ['main']
	},
	'marquee': {
		type: 'widget',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null
	},
	'math': {
		type: 'structure',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: ['math']
	},
	'menu': {
		type: 'composite',
		attributes: {
			allowed: ['aria-activedescendant', 'aria-expanded']
		},
		owned: {
			one: ['menuitem', 'menuitemradio', 'menuitemcheckbox']
		},
		nameFrom: ['author'],
		context: null,
		implicit: ['menu[type="context"]']
	},
	'menubar': {
		type: 'composite',
		attributes: {
			allowed: ['aria-activedescendant', 'aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null
	},
	'menuitem': {
		type: 'widget',
		attributes: null,
		owned: null,
		nameFrom: ['author', 'contents'],
		context: ['menu', 'menubar'],
		implicit: ['menuitem[type="command"]']
	},
	'menuitemcheckbox': {
		type: 'widget',
		attributes: {
			required: ['aria-checked']
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: ['menu', 'menubar'],
		implicit: ['menuitem[type="checkbox"]']
	},
	'menuitemradio': {
		type: 'widget',
		attributes:  {
			allowed: ['aria-selected', 'aria-posinset', 'aria-setsize'],
			required: ['aria-checked']
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: ['menu', 'menubar'],
		implicit: ['menuitem[type="radio"]']
	},
	'navigation': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: ['nav']
	},
	'none': {
		type: 'structure',
		attributes: null,
		owned: null,
		nameFrom: ['author'],
		context: null
	},
	'note': {
		type: 'structure',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null
	},
	'option': {
		type: 'widget',
		attributes: {
			allowed: ['aria-selected', 'aria-posinset', 'aria-setsize', 'aria-checked']
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: ['listbox'],
		implicit: ['option']
	},
	'presentation': {
		type: 'structure',
		attributes: null,
		owned: null,
		nameFrom: ['author'],
		context: null
	},
	'progressbar': {
		type: 'widget',
		attributes: {
			allowed: ['aria-valuetext', 'aria-valuenow', 'aria-valuemax', 'aria-valuemin']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: ['progress']
	},
	'radio': {
		type: 'widget',
		attributes:  {
			allowed: ['aria-selected', 'aria-posinset', 'aria-setsize'],
			required: ['aria-checked']
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: null,
		implicit: ['input[type="radio"]']
	},
	'radiogroup': {
		type: 'composite',
		attributes: {
			allowed: ['aria-activedescendant', 'aria-required', 'aria-expanded']
		},
		owned: {
			all: ['radio']
		},
		nameFrom: ['author'],
		context: null
	},
	'range': {
		nameFrom: ['author'],
		type: 'abstract'
	},
	'region': {
		type: 'structure',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: ['section']
	},
	'roletype': {
		type: 'abstract'
	},
	'row': {
		type: 'structure',
		attributes: {
			allowed: ['aria-level', 'aria-selected', 'aria-activedescendant', 'aria-expanded']
		},
		owned: {
			one: ['cell', 'columnheader', 'rowheader', 'gridcell']
		},
		nameFrom: ['author', 'contents'],
		context:  ['rowgroup', 'grid', 'treegrid', 'table'],
		implicit: ['tr']
	},
	'rowgroup': {
		type: 'structure',
		attributes: {
			allowed: ['aria-activedescendant', 'aria-expanded']
		},
		owned: {
			all: ['row']
		},
		nameFrom: ['author', 'contents'],
		context:  ['grid', 'table'],
		implicit: ['tbody', 'thead', 'tfoot']
	},
	'rowheader': {
		type: 'structure',
		attributes: {
			allowed: ['aria-sort', 'aria-required', 'aria-readonly', 'aria-expanded', 'aria-selected']
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: ['row'],
		implicit: ['th']
	},
	'scrollbar': {
		type: 'widget',
		attributes: {
			required: ['aria-controls', 'aria-orientation', 'aria-valuenow', 'aria-valuemax', 'aria-valuemin'],
			allowed: ['aria-valuetext']
		},
		owned: null,
		nameFrom: ['author'],
		context: null
	},
	'search': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null
	},
	'searchbox': {
		type: 'widget',
		attributes: {
			allowed: ['aria-activedescendant', 'aria-autocomplete', 'aria-multiline', 'aria-readonly', 'aria-required']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: ['input[type="search"]']
	},
	'section': {
		nameFrom: ['author', 'contents'],
		type: 'abstract'
	},
	'sectionhead': {
		nameFrom: ['author', 'contents'],
		type: 'abstract'
	},
	'select': {
		nameFrom: ['author'],
		type: 'abstract'
	},
	'separator': {
		type: 'structure',
		attributes: {
			allowed: ['aria-expanded', 'aria-orientation']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: ['hr']
	},
	'slider': {
		type: 'widget',
		attributes: {
			allowed: ['aria-valuetext', 'aria-orientation'],
			required: ['aria-valuenow', 'aria-valuemax', 'aria-valuemin']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: ['input[type="range"]']
	},
	'spinbutton': {
		type: 'widget',
		attributes: {
			allowed: ['aria-valuetext', 'aria-required'],
			required: ['aria-valuenow', 'aria-valuemax', 'aria-valuemin']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: ['input[type="number"]']
	},
	'status': {
		type: 'widget',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: ['output']
	},
	'structure': {
		type: 'abstract'
	},
	'switch': {
		type: 'widget',
		attributes:  {
			required: ['aria-checked']
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: null
	},
	'tab': {
		type: 'widget',
		attributes: {
			allowed: ['aria-selected', 'aria-expanded']
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: ['tablist']
	},
	'table': {
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
	'tablist': {
		type: 'composite',
		attributes: {
			allowed: ['aria-activedescendant', 'aria-expanded', 'aria-level', 'aria-multiselectable']
		},
		owned: {
			all: ['tab']
		},
		nameFrom: ['author'],
		context: null
	},
	'tabpanel': {
		type: 'widget',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null
	},
	'text': {
		type: 'structure',
		owned: null,
		nameFrom: ['author', 'contents'],
		context: null
	},
	'textbox': {
		type: 'widget',
		attributes: {
			allowed: ['aria-activedescendant', 'aria-autocomplete', 'aria-multiline', 'aria-readonly', 'aria-required']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: ['input[type="text"]', 'input[type="email"]',
			'input[type="password"]', 'input[type="tel"]',
			'input[type="url"]', 'input:not([type])', 'textarea']
	},
	'timer': {
		type: 'widget',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null
	},
	'toolbar': {
		type: 'structure',
		attributes: {
			allowed: ['aria-activedescendant', 'aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: ['menu[type="toolbar"]']
	},
	'tooltip': {
		type: 'widget',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: null
	},
	'tree': {
		type: 'composite',
		attributes: {
			allowed: ['aria-activedescendant', 'aria-multiselectable', 'aria-required', 'aria-expanded']
		},
		owned: {
			all: ['treeitem']
		},
		nameFrom: ['author'],
		context: null
	},
	'treegrid': {
		type: 'composite',
		attributes: {
			allowed: ['aria-activedescendant', 'aria-expanded', 'aria-level', 'aria-multiselectable',
				'aria-readonly', 'aria-required']
		},
		owned: {
			all: ['treeitem']
		},
		nameFrom: ['author'],
		context: null
	},
	'treeitem': {
		type: 'widget',
		attributes: {
			allowed: ['aria-checked', 'aria-selected', 'aria-expanded', 'aria-level', 'aria-posinset', 'aria-setsize']
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: ['treegrid', 'tree']
	},
	'widget': {
		type: 'abstract'
	},
	'window': {
		nameFrom: ['author'],
		type: 'abstract'
	}
};

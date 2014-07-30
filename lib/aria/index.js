var aria = kslib.aria = {},
	lookupTables = aria._lut = {};

lookupTables.attributes = {
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
		context: null
	},
	'button': {
		type: 'widget',
		attributes: {
			allowed: ['aria-expanded', 'aria-pressed']
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: null,
		implicit: ['button', 'input[type="button"]', 'input[type="image"]']
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
		context: ['row']
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
		context: null
	},
	'definition': {
		type: 'structure',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null
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
		context: null
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
		context: null
	},
	'gridcell': {
		type: 'widget',
		attributes: {
			allowed: ['aria-selected', 'aria-readonly', 'aria-expanded', 'aria-required']
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: ['row']
	},
	'group': {
		type: 'structure',
		attributes: {
			allowed: ['aria-activedescendant', 'aria-expanded']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: ['details']
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
		implicit: ['ol', 'ul']
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
		implicit: ['li']
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
		context: null
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
		context: null
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
		context: null
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
		context: ['menu', 'menubar']
	},
	'menuitemcheckbox': {
		type: 'widget',
		attributes: {
			required: ['aria-checked']
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: ['menu', 'menubar']
	},
	'menuitemradio': {
		type: 'widget',
		attributes:  {
			allowed: ['aria-selected', 'aria-posinset', 'aria-setsize'],
			required: ['aria-checked']
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: ['menu', 'menubar']
	},
	'navigation': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded']
		},
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
		context: ['listbox']
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
		context: null
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
			one: ['columnheader', 'rowheader', 'gridcell']
		},
		nameFrom: ['author', 'contents'],
		context:  ['rowgroup', 'grid', 'treegrid']
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
		context:  ['grid']
	},
	'rowheader': {
		type: 'structure',
		attributes: {
			allowed: ['aria-sort', 'aria-required', 'aria-readonly', 'aria-expanded', 'aria-selected']
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: ['row']
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
		context: null
	},
	'slider': {
		type: 'widget',
		attributes: {
			allowed: ['aria-valuetext', 'aria-orientation'],
			required: ['aria-valuenow', 'aria-valuemax', 'aria-valuemin']
		},
		owned: null,
		nameFrom: ['author'],
		context: null
	},
	'spinbutton': {
		type: 'widget',
		attributes: {
			allowed: ['aria-valuetext', 'aria-required'],
			required: ['aria-valuenow', 'aria-valuemax', 'aria-valuemin']
		},
		owned: null,
		nameFrom: ['author'],
		context: null
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
	'tab': {
		type: 'widget',
		attributes: {
			allowed: ['aria-selected', 'aria-expanded']
		},
		owned: null,
		nameFrom: ['author', 'contents'],
		context: ['tablist']
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
	'textbox': {
		type: 'widget',
		attributes: {
			allowed: ['aria-activedescendant', 'aria-autocomplete', 'aria-multiline', 'aria-readonly', 'aria-required']
		},
		owned: null,
		nameFrom: ['author'],
		context: null,
		implicit: ['input[type="text"]', 'input:not([type])']
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

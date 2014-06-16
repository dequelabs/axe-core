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
		context: null
	},
	'alertdialog': {
		type: 'widget',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		context: null
	},
	'application': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		context: null
	},
	'article': {
		type: 'structure',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		context: null,
		implicit: ['article']
	},
	'banner': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		context: null
	},
	'button': {
		type: 'widget',
		attributes: {
			allowed: ['aria-expanded', 'aria-pressed']
		},
		owned: null,
		context: null,
		implicit: ['button', 'input[type="button"]', 'input[type="image"]']
	},
	'checkbox': {
		type: 'widget',
		attributes:  {
			allowed: ['aria-autocomplete', 'aria-required', 'aria-activedescendant'],
			required: ['aria-checked']
		},
		owned: null,
		context: null,
		implicit: ['input[type="checkbox"]']
	},
	'columnheader': {
		type: 'structure',
		attributes: {
			allowed: ['aria-expanded', 'aria-sort', 'aria-readonly', 'aria-selected', 'aria-required']
		},
		owned: null,
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
		context: null
	},
	'command': {
		type: 'abstract'
	},
	'complementary': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		context: null,
		implicit: ['aside']
	},
	'composite': {
		type: 'abstract'
	},
	'contentinfo': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		context: null
	},
	'definition': {
		type: 'structure',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		context: null
	},
	'dialog': {
		type: 'widget',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		context: null,
		implicit: ['dialog']
	},
	'directory': {
		type: 'structure',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		context: null
	},
	'document': {
		type: 'structure',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		context: null,
		implicit: ['body']
	},
	'form': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
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
		context: null
	},
	'gridcell': {
		type: 'widget',
		attributes: {
			allowed: ['aria-selected', 'aria-readonly', 'aria-expanded', 'aria-required']
		},
		owned: null,
		context: ['row']
	},
	'group': {
		type: 'structure',
		attributes: {
			allowed: ['aria-activedescendant', 'aria-expanded']
		},
		owned: null,
		context: null,
		implicit: ['details']
	},
	'heading': {
		type: 'structure',
		attributes: {
			allowed: ['aria-level', 'aria-expanded']
		},
		owned: null,
		context: null,
		implicit: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
	},
	'img': {
		type: 'structure',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		context: null,
		implicit: ['img']
	},
	'input': {
		type: 'abstract'
	},
	'landmark': {
		type: 'abstract'
	},
	'link': {
		type: 'widget',
		attributes: null,
		owned: null,
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
		context: null,
		implicit: ['select']
	},
	'listitem': {
		type: 'structure',
		attributes: {
			allowed: ['aria-level', 'aria-posinset', 'aria-setsize', 'aria-expanded']
		},
		owned: null,
		context: ['list'],
		implicit: ['li']
	},
	'log': {
		type: 'widget',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		context: null
	},
	'main': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		context: null
	},
	'marquee': {
		type: 'widget',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		context: null
	},
	'math': {
		type: 'structure',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
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
		context: null
	},
	'menubar': {
		type: 'composite',
		attributes: {
			allowed: ['aria-activedescendant', 'aria-expanded']
		},
		owned: null,
		context: null
	},
	'menuitem': {
		type: 'widget',
		attributes: null,
		owned: null,
		context: ['menu', 'menubar']
	},
	'menuitemcheckbox': {
		type: 'widget',
		attributes: {
			required: ['aria-checked']
		},
		owned: null,
		context: ['menu', 'menubar']
	},
	'menuitemradio': {
		type: 'widget',
		attributes:  {
			allowed: ['aria-selected', 'aria-posinset', 'aria-setsize'],
			required: ['aria-checked']
		},
		owned: null,
		context: ['menu', 'menubar']
	},
	'navigation': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		context: null
	},
	'note': {
		type: 'structure',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		context: null
	},
	'option': {
		type: 'widget',
		attributes: {
			allowed: ['aria-selected', 'aria-posinset', 'aria-setsize', 'aria-expanded', 'aria-checked']
		},
		owned: null,
		context: ['listbox']
	},
	'presentation': {
		type: 'structure',
		attributes: null,
		owned: null,
		context: null
	},
	'progressbar': {
		type: 'widget',
		attributes: {
			allowed: ['aria-valuetext', 'aria-valuenow', 'aria-valuemax', 'aria-valuemin']
		},
		owned: null,
		context: null
	},
	'radio': {
		type: 'widget',
		attributes:  {
			allowed: ['aria-selected', 'aria-posinset', 'aria-setsize'],
			required: ['aria-checked']
		},
		owned: null,
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
		type: 'abstract'
	},
	'region': {
		type: 'structure',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
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
		context:  ['grid']
	},
	'rowheader': {
		type: 'structure',
		attributes: {
			allowed: ['aria-sort', 'aria-required', 'aria-readonly', 'aria-expanded', 'aria-selected']
		},
		owned: null,
		context: ['row']
	},
	'scrollbar': {
		type: 'widget',
		attributes: {
			required: ['aria-controls', 'aria-orientation', 'aria-valuenow', 'aria-valuemax', 'aria-valuemin']
		},
		owned: null,
		context: null
	},
	'search': {
		type: 'landmark',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		context: null
	},
	'section': {
		type: 'abstract'
	},
	'sectionhead': {
		type: 'abstract'
	},
	'select': {
		type: 'abstract'
	},
	'separator': {
		type: 'structure',
		attributes: {
			allowed: ['aria-expanded', 'aria-orientation']
		},
		owned: null,
		context: null
	},
	'slider': {
		type: 'widget',
		attributes: {
			allowed: ['aria-valuetext', 'aria-orientation'],
			required: ['aria-valuenow', 'aria-valuemax', 'aria-valuemin']
		},
		owned: null,
		context: null
	},
	'spinbutton': {
		type: 'widget',
		attributes: {
			allowed: ['aria-valuetext', 'aria-required'],
			required: ['aria-valuenow', 'aria-valuemax', 'aria-valuemin']
		},
		owned: null,
		context: null
	},
	'status': {
		type: 'widget',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
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
		context: ['tablist']
	},
	'tablist': {
		type: 'composite',
		attributes: {
			allowed: ['aria-activedescendant', 'aria-expanded', 'aria-level']
		},
		owned: {
			all: ['tab']
		},
		context: null
	},
	'tabpanel': {
		type: 'widget',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		context: null
	},
	'textbox': {
		type: 'widget',
		attributes: {
			allowed: ['aria-activedescendant', 'aria-autocomplete', 'aria-multiline', 'aria-readonly', 'aria-required']
		},
		owned: null,
		context: null,
		implicit: ['input[type="text"]', 'input:not([type])']
	},
	'timer': {
		type: 'widget',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
		context: null
	},
	'toolbar': {
		type: 'structure',
		attributes: {
			allowed: ['aria-activedescendant', 'aria-expanded']
		},
		owned: null,
		context: null,
		implicit: ['menu[type="toolbar"]']
	},
	'tooltip': {
		type: 'widget',
		attributes: {
			allowed: ['aria-expanded']
		},
		owned: null,
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
		context: null
	},
	'treeitem': {
		type: 'widget',
		attributes: {
			allowed: ['aria-checked', 'aria-selected', 'aria-expanded', 'aria-level', 'aria-posinset', 'aria-setsize']
		},
		owned: null,
		context: ['treegrid', 'tree']
	},
	'widget': {
		type: 'abstract'
	},
	'window': {
		type: 'abstract'
	},
};

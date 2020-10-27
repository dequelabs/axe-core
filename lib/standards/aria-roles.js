// Source: https://www.w3.org/TR/wai-aria-1.1/#roles

/* easiest way to see allowed roles is to filter out the global ones
   from the list of inherited states and properties. The dpub spec
   does not have the global list so you'll need to copy over from
   the wai-aria one:

  const globalAttrs = Array.from(
    document.querySelectorAll('#global_states li')
  ).map(li => li.textContent.replace(/\s*\(.*\)/, ''));

  const globalRoleAttrs = Array.from(
    document.querySelectorAll('.role-inherited li')
  ).filter(li => globalAttrs.includes(li.textContent.replace(/\s*\(.*\)/, '')))

  globalRoleAttrs.forEach(li => li.style.display = 'none');
*/
const ariaRoles = {
	alert: {
		type: 'widget',
		allowedAttrs: ['aria-expanded'],
		superclassRole: ['section']
	},
	alertdialog: {
		type: 'widget',
		allowedAttrs: ['aria-expanded', 'aria-modal'],
		superclassRole: ['alert', 'dialog']
	},
	application: {
		// Note: spec difference
		type: 'landmark',
		// Note: aria-expanded is not in the 1.1 spec but is
		// consistently supported in ATs and was added in 1.2
		allowedAttrs: ['aria-activedescendant', 'aria-expanded'],
		superclassRole: ['structure']
	},
	article: {
		type: 'structure',
		allowedAttrs: ['aria-posinset', 'aria-setsize', 'aria-expanded'],
		superclassRole: ['document']
	},
	banner: {
		type: 'landmark',
		allowedAttrs: ['aria-expanded'],
		superclassRole: ['landmark']
	},
	blockquote: {
		type: 'structure'
	},
	button: {
		type: 'widget',
		allowedAttrs: ['aria-expanded', 'aria-pressed'],
		superclassRole: ['command'],
		nameFromContent: true
	},
	caption: {
		type: 'structure',
		requiredContext: ['figure', 'table', 'grid', 'treegrid']
	},
	cell: {
		type: 'structure',
		requiredContext: ['row'],
		allowedAttrs: [
			'aria-colindex',
			'aria-colspan',
			'aria-rowindex',
			'aria-rowspan',
			'aria-expanded'
		],
		superclassRole: ['section'],
		nameFromContent: true
	},
	checkbox: {
		type: 'widget',
		// Note: since the checkbox role has an implicit
		// aria-checked value it is not required to be added by
		// the user
		//
		// Note: aria-required is not in the 1.1 spec but is
		// consistently supported in ATs and was added in 1.2
		allowedAttrs: ['aria-checked', 'aria-readonly', 'aria-required'],
		superclassRole: ['input'],
		nameFromContent: true
	},
	code: {
		type: 'structure'
	},
	columnheader: {
		type: 'structure',
		requiredContext: ['row'],
		allowedAttrs: [
			'aria-sort',
			'aria-colindex',
			'aria-colspan',
			'aria-expanded',
			'aria-readonly',
			'aria-required',
			'aria-rowindex',
			'aria-rowspan',
			'aria-selected'
		],
		superclassRole: ['cell', 'gridcell', 'sectionhead'],
		nameFromContent: true
	},
	combobox: {
		type: 'composite',
		requiredOwned: ['listbox', 'tree', 'grid', 'dialog', 'textbox'],
		requiredAttrs: ['aria-expanded'],
		// Note: because aria-controls is not well supported we will not
		// make it a required attribute even though it is required in the
		// spec
		allowedAttrs: [
			'aria-controls',
			'aria-autocomplete',
			'aria-readonly',
			'aria-required',
			'aria-activedescendant',
			'aria-orientation'
		],
		superclassRole: ['select']
	},
	command: {
		type: 'abstract',
		superclassRole: ['widget']
	},
	complementary: {
		type: 'landmark',
		allowedAttrs: ['aria-expanded'],
		superclassRole: ['landmark']
	},
	composite: {
		type: 'abstract',
		superclassRole: ['widget']
	},
	contentinfo: {
		type: 'landmark',
		allowedAttrs: ['aria-expanded'],
		superclassRole: ['landmark']
	},
	definition: {
		type: 'structure',
		allowedAttrs: ['aria-expanded'],
		superclassRole: ['section']
	},
	deletion: {
		type: 'structure'
	},
	dialog: {
		type: 'widget',
		allowedAttrs: ['aria-expanded', 'aria-modal'],
		superclassRole: ['window']
	},
	directory: {
		type: 'structure',
		allowedAttrs: ['aria-expanded'],
		// Note: spec difference
		superclassRole: ['list'],
		nameFromContent: true
	},
	document: {
		type: 'structure',
		allowedAttrs: ['aria-expanded'],
		superclassRole: ['structure']
	},
	emphasis: {
		type: 'structure'
	},
	feed: {
		type: 'structure',
		requiredOwned: ['article'],
		allowedAttrs: ['aria-expanded'],
		superclassRole: ['list']
	},
	figure: {
		type: 'structure',
		allowedAttrs: ['aria-expanded'],
		// Note: spec difference
		superclassRole: ['section'],
		nameFromContent: true
	},
	form: {
		type: 'landmark',
		allowedAttrs: ['aria-expanded'],
		superclassRole: ['landmark']
	},
	grid: {
		type: 'composite',
		requiredOwned: ['rowgroup', 'row'],
		allowedAttrs: [
			'aria-level',
			'aria-multiselectable',
			'aria-readonly',
			'aria-activedescendant',
			'aria-colcount',
			'aria-expanded',
			'aria-rowcount'
		],
		superclassRole: ['composite', 'table']
	},
	gridcell: {
		type: 'widget',
		requiredContext: ['row'],
		allowedAttrs: [
			'aria-readonly',
			'aria-required',
			'aria-selected',
			'aria-colindex',
			'aria-colspan',
			'aria-expanded',
			'aria-rowindex',
			'aria-rowspan'
		],
		superclassRole: ['cell', 'widget'],
		nameFromContent: true
	},
	group: {
		type: 'structure',
		allowedAttrs: ['aria-activedescendant', 'aria-expanded'],
		superclassRole: ['section']
	},
	heading: {
		type: 'structure',
		requiredAttrs: ['aria-level'],
		allowedAttrs: ['aria-expanded'],
		superclassRole: ['sectionhead'],
		nameFromContent: true
	},
	img: {
		type: 'structure',
		allowedAttrs: ['aria-expanded'],
		superclassRole: ['section']
	},
	input: {
		type: 'abstract',
		superclassRole: ['widget']
	},
	insertion: {
		type: 'structure'
	},
	landmark: {
		type: 'abstract',
		superclassRole: ['section']
	},
	link: {
		type: 'widget',
		allowedAttrs: ['aria-expanded'],
		superclassRole: ['command'],
		nameFromContent: true
	},
	list: {
		type: 'structure',
		requiredOwned: ['listitem'],
		allowedAttrs: ['aria-expanded'],
		superclassRole: ['section']
	},
	listbox: {
		type: 'composite',
		requiredOwned: ['option'],
		allowedAttrs: [
			'aria-multiselectable',
			'aria-readonly',
			'aria-required',
			'aria-activedescendant',
			'aria-expanded',
			'aria-orientation'
		],
		superclassRole: ['select']
	},
	listitem: {
		type: 'structure',
		requiredContext: ['list'],
		allowedAttrs: [
			'aria-level',
			'aria-posinset',
			'aria-setsize',
			'aria-expanded'
		],
		// Note: spec difference
		superclassRole: ['section'],
		nameFromContent: true
	},
	log: {
		type: 'widget',
		allowedAttrs: ['aria-expanded'],
		superclassRole: ['section']
	},
	main: {
		type: 'landmark',
		allowedAttrs: ['aria-expanded'],
		superclassRole: ['landmark']
	},
	marquee: {
		type: 'widget',
		allowedAttrs: ['aria-expanded'],
		superclassRole: ['section']
	},
	math: {
		type: 'structure',
		allowedAttrs: ['aria-expanded'],
		superclassRole: ['section']
	},
	menu: {
		type: 'composite',
		requiredOwned: ['menuitemradio', 'menuitem', 'menuitemcheckbox'],
		allowedAttrs: [
			'aria-activedescendant',
			'aria-expanded',
			'aria-orientation'
		],
		superclassRole: ['select']
	},
	menubar: {
		type: 'composite',
		requiredOwned: ['menuitemradio', 'menuitem', 'menuitemcheckbox'],
		allowedAttrs: [
			'aria-activedescendant',
			'aria-expanded',
			'aria-orientation'
		],
		superclassRole: ['menu']
	},
	menuitem: {
		type: 'widget',
		requiredContext: ['menu', 'menubar'],
		// Note: aria-expanded is not in the 1.1 spec but is
		// consistently supported in ATs and was added in 1.2
		allowedAttrs: ['aria-posinset', 'aria-setsize', 'aria-expanded'],
		superclassRole: ['command'],
		nameFromContent: true
	},
	menuitemcheckbox: {
		type: 'widget',
		requiredContext: ['menu', 'menubar'],
		allowedAttrs: [
			'aria-checked',
			'aria-posinset',
			'aria-readonly',
			'aria-setsize'
		],
		superclassRole: ['checkbox', 'menuitem'],
		nameFromContent: true
	},
	menuitemradio: {
		type: 'widget',
		requiredContext: ['menu', 'menubar', 'group'],
		allowedAttrs: [
			'aria-checked',
			'aria-posinset',
			'aria-readonly',
			'aria-setsize'
		],
		superclassRole: ['menuitemcheckbox', 'radio'],
		nameFromContent: true
	},
	meter: {
		type: 'structure',
		allowedAttrs: ['aria-valuetext'],
		requiredAttrs: ['aria-valuemax', 'aria-valuemin', 'aria-valuenow']
	},
	navigation: {
		type: 'landmark',
		allowedAttrs: ['aria-expanded'],
		superclassRole: ['landmark']
	},
	none: {
		type: 'structure'
	},
	note: {
		type: 'structure',
		allowedAttrs: ['aria-expanded'],
		superclassRole: ['section']
	},
	option: {
		type: 'widget',
		requiredContext: ['listbox'],
		// Note: since the option role has an implicit
		// aria-selected value it is not required to be added by
		// the user
		allowedAttrs: [
			'aria-selected',
			'aria-checked',
			'aria-posinset',
			'aria-setsize'
		],
		superclassRole: ['input'],
		nameFromContent: true
	},
	paragraph: {
		type: 'structure'
	},
	presentation: {
		type: 'structure',
		superclassRole: ['structure']
	},
	progressbar: {
		type: 'widget',
		allowedAttrs: [
			'aria-expanded',
			'aria-valuemax',
			'aria-valuemin',
			'aria-valuenow',
			'aria-valuetext'
		],
		superclassRole: ['range']
	},
	radio: {
		type: 'widget',
		// Note: since the radio role has an implicit
		// aria-check value it is not required to be added by
		// the user
		//
		// Note: aria-required is not in the 1.1 or 1.2 specs but is
		// consistently supported in ATs on the individual radio element
		allowedAttrs: [
			'aria-checked',
			'aria-posinset',
			'aria-setsize',
			'aria-required'
		],
		superclassRole: ['input'],
		nameFromContent: true
	},
	radiogroup: {
		type: 'composite',
		requiredOwned: ['radio'],
		allowedAttrs: [
			'aria-readonly',
			'aria-required',
			'aria-activedescendant',
			'aria-expanded',
			'aria-orientation'
		],
		superclassRole: ['select']
	},
	range: {
		type: 'abstract',
		superclassRole: ['widget']
	},
	region: {
		type: 'landmark',
		allowedAttrs: ['aria-expanded'],
		superclassRole: ['landmark']
	},
	roletype: {
		type: 'abstract',
		superclassRole: ['structure', 'widget', 'window']
	},
	row: {
		type: 'structure',
		requiredContext: ['grid', 'rowgroup', 'table', 'treegrid'],
		requiredOwned: ['cell', 'columnheader', 'gridcell', 'rowheader'],
		allowedAttrs: [
			'aria-colindex',
			'aria-level',
			'aria-rowindex',
			'aria-selected',
			'aria-activedescendant',
			'aria-expanded'
		],
		superclassRole: ['group', 'widget'],
		nameFromContent: true
	},
	rowgroup: {
		type: 'structure',
		requiredContext: ['grid', 'table', 'treegrid'],
		requiredOwned: ['row'],
		superclassRole: ['structure'],
		nameFromContent: true
	},
	rowheader: {
		type: 'structure',
		requiredContext: ['row'],
		allowedAttrs: [
			'aria-sort',
			'aria-colindex',
			'aria-colspan',
			'aria-expanded',
			'aria-readonly',
			'aria-required',
			'aria-rowindex',
			'aria-rowspan',
			'aria-selected'
		],
		superclassRole: ['cell', 'gridcell', 'sectionhead'],
		nameFromContent: true
	},
	scrollbar: {
		type: 'widget',
		requiredAttrs: ['aria-valuenow'],
		// Note: since the scrollbar role has implicit
		// aria-orientation, aria-valuemax, aria-valuemin values it
		// is not required to be added by the user
		//
		// Note: because aria-controls is not well supported we will not
		// make it a required attribute even though it is required in the
		// spec
		allowedAttrs: [
			'aria-controls',
			'aria-orientation',
			'aria-valuemax',
			'aria-valuemin',
			'aria-valuetext'
		],
		superclassRole: ['range']
	},
	search: {
		type: 'landmark',
		allowedAttrs: ['aria-expanded'],
		superclassRole: ['landmark']
	},
	searchbox: {
		type: 'widget',
		allowedAttrs: [
			'aria-activedescendant',
			'aria-autocomplete',
			'aria-multiline',
			'aria-placeholder',
			'aria-readonly',
			'aria-required'
		],
		superclassRole: ['textbox']
	},
	section: {
		type: 'abstract',
		// Note: spec difference
		superclassRole: ['structure'],
		nameFromContent: true
	},
	sectionhead: {
		type: 'abstract',
		// Note: spec difference
		superclassRole: ['structure'],
		nameFromContent: true
	},
	select: {
		type: 'abstract',
		superclassRole: ['composite', 'group']
	},
	separator: {
		type: 'structure',
		// Note: since the separator role has implicit
		// aria-orientation, aria-valuemax, aria-valuemin, and
		// aria-valuenow values it is not required to be added by
		// the user
		allowedAttrs: [
			'aria-valuemax',
			'aria-valuemin',
			'aria-valuenow',
			'aria-orientation',
			'aria-valuetext'
		],
		superclassRole: ['structure', 'widget']
	},
	slider: {
		type: 'widget',
		requiredAttrs: ['aria-valuenow'],
		// Note: since the slider role has implicit
		// aria-orientation, aria-valuemax, aria-valuemin values it
		// is not required to be added by the user
		allowedAttrs: [
			'aria-valuemax',
			'aria-valuemin',
			'aria-orientation',
			'aria-readonly',
			'aria-valuetext'
		],
		superclassRole: ['input', 'range']
	},
	spinbutton: {
		type: 'widget',
		requiredAttrs: ['aria-valuenow'],
		// Note: since the spinbutton role has implicit
		// aria-orientation, aria-valuemax, aria-valuemin values it
		// is not required to be added by the user
		allowedAttrs: [
			'aria-valuemax',
			'aria-valuemin',
			'aria-readonly',
			'aria-required',
			'aria-activedescendant',
			'aria-valuetext'
		],
		superclassRole: ['composite', 'input', 'range']
	},
	status: {
		type: 'widget',
		allowedAttrs: ['aria-expanded'],
		superclassRole: ['section']
	},
	strong: {
		type: 'structure'
	},
	structure: {
		type: 'abstract',
		superclassRole: ['roletype']
	},
	subscript: {
		type: 'structure'
	},
	superscript: {
		type: 'structure'
	},
	switch: {
		type: 'widget',
		requiredAttrs: ['aria-checked'],
		allowedAttrs: ['aria-readonly'],
		superclassRole: ['checkbox'],
		nameFromContent: true
	},
	tab: {
		type: 'widget',
		requiredContext: ['tablist'],
		allowedAttrs: [
			'aria-posinset',
			'aria-selected',
			'aria-setsize',
			'aria-expanded'
		],
		superclassRole: ['sectionhead', 'widget'],
		nameFromContent: true
	},
	table: {
		type: 'structure',
		requiredOwned: ['rowgroup', 'row'],
		allowedAttrs: ['aria-colcount', 'aria-rowcount', 'aria-expanded'],
		// NOTE: although the spec says this is not named from contents,
		// the accessible text acceptance tests (#139 and #140) require
		// table be named from content (we even had to special case
		// table in commons/aria/named-from-contents)
		superclassRole: ['section'],
		nameFromContent: true
	},
	tablist: {
		type: 'composite',
		requiredOwned: ['tab'],
		// NOTE: aria-expanded is from the 1.0 spec but is still
		// consistently supported in ATs
		allowedAttrs: [
			'aria-level',
			'aria-multiselectable',
			'aria-orientation',
			'aria-activedescendant',
			'aria-expanded'
		],
		superclassRole: ['composite']
	},
	tabpanel: {
		type: 'widget',
		allowedAttrs: ['aria-expanded'],
		superclassRole: ['section']
	},
	term: {
		type: 'structure',
		allowedAttrs: ['aria-expanded'],
		// Note: spec difference
		superclassRole: ['section'],
		nameFromContent: true
	},
	textbox: {
		type: 'widget',
		allowedAttrs: [
			'aria-activedescendant',
			'aria-autocomplete',
			'aria-multiline',
			'aria-placeholder',
			'aria-readonly',
			'aria-required'
		],
		superclassRole: ['input']
	},
	time: {
		type: 'structure'
	},
	timer: {
		type: 'widget',
		allowedAttrs: ['aria-expanded'],
		superclassRole: ['status']
	},
	toolbar: {
		type: 'structure',
		allowedAttrs: [
			'aria-orientation',
			'aria-activedescendant',
			'aria-expanded'
		],
		superclassRole: ['group']
	},
	tooltip: {
		type: 'structure',
		allowedAttrs: ['aria-expanded'],
		superclassRole: ['section'],
		nameFromContent: true
	},
	tree: {
		type: 'composite',
		requiredOwned: ['treeitem'],
		allowedAttrs: [
			'aria-multiselectable',
			'aria-required',
			'aria-activedescendant',
			'aria-expanded',
			'aria-orientation'
		],
		superclassRole: ['select']
	},
	treegrid: {
		type: 'composite',
		requiredOwned: ['rowgroup', 'row'],
		allowedAttrs: [
			'aria-activedescendant',
			'aria-colcount',
			'aria-expanded',
			'aria-level',
			'aria-multiselectable',
			'aria-orientation',
			'aria-readonly',
			'aria-required',
			'aria-rowcount'
		],
		superclassRole: ['grid', 'tree']
	},
	treeitem: {
		type: 'widget',
		requiredContext: ['group', 'tree'],
		allowedAttrs: [
			'aria-checked',
			'aria-expanded',
			'aria-level',
			'aria-posinset',
			'aria-selected',
			'aria-setsize'
		],
		superclassRole: ['listitem', 'option'],
		nameFromContent: true
	},
	widget: {
		type: 'abstract',
		superclassRole: ['roletype']
	},
	window: {
		type: 'abstract',
		superclassRole: ['roletype']
	}
};

export default ariaRoles;

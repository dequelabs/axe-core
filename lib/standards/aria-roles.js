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
		allowedAttrs: ['aria-expanded']
	},
	alertdialog: {
		type: 'widget',
		allowedAttrs: ['aria-expanded', 'aria-modal']
	},
	application: {
		// Note: spec difference
		type: 'landmark',
		// Note: aria-expanded is not in the 1.1 spec but is
		// consistently supported in ATs and was added in 1.2
		allowedAttrs: ['aria-activedescendant', 'aria-expanded']
	},
	article: {
		type: 'structure',
		allowedAttrs: ['aria-posinset', 'aria-setsize', 'aria-expanded']
	},
	banner: {
		type: 'landmark',
		allowedAttrs: ['aria-expanded']
	},
	button: {
		type: 'widget',
		allowedAttrs: ['aria-expanded', 'aria-pressed'],
		nameFromContent: true
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
		nameFromContent: true
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
		]
	},
	command: {
		type: 'abstract'
	},
	complementary: {
		type: 'landmark',
		allowedAttrs: ['aria-expanded']
	},
	composite: {
		type: 'abstract'
	},
	contentinfo: {
		type: 'landmark',
		allowedAttrs: ['aria-expanded']
	},
	definition: {
		type: 'structure',
		allowedAttrs: ['aria-expanded']
	},
	dialog: {
		type: 'widget',
		allowedAttrs: ['aria-expanded', 'aria-modal']
	},
	directory: {
		type: 'structure',
		allowedAttrs: ['aria-expanded'],
		// Note: spec difference
		nameFromContent: true
	},
	document: {
		type: 'structure',
		allowedAttrs: ['aria-expanded']
	},
	feed: {
		type: 'structure',
		requiredOwned: ['article'],
		allowedAttrs: ['aria-expanded']
	},
	figure: {
		type: 'structure',
		allowedAttrs: ['aria-expanded'],
		// Note: spec difference
		nameFromContent: true
	},
	form: {
		type: 'landmark',
		allowedAttrs: ['aria-expanded']
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
		]
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
		nameFromContent: true
	},
	group: {
		type: 'structure',
		allowedAttrs: ['aria-activedescendant', 'aria-expanded']
	},
	heading: {
		type: 'structure',
		requiredAttrs: ['aria-level'],
		allowedAttrs: ['aria-expanded'],
		nameFromContent: true
	},
	img: {
		type: 'structure',
		allowedAttrs: ['aria-expanded']
	},
	input: {
		type: 'abstract'
	},
	landmark: {
		type: 'abstract'
	},
	link: {
		type: 'widget',
		allowedAttrs: ['aria-expanded'],
		nameFromContent: true
	},
	list: {
		type: 'structure',
		requiredOwned: ['listitem'],
		allowedAttrs: ['aria-expanded']
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
		]
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
		nameFromContent: true
	},
	log: {
		type: 'widget',
		allowedAttrs: ['aria-expanded']
	},
	main: {
		type: 'landmark',
		allowedAttrs: ['aria-expanded']
	},
	marquee: {
		type: 'widget',
		allowedAttrs: ['aria-expanded']
	},
	math: {
		type: 'structure',
		allowedAttrs: ['aria-expanded']
	},
	menu: {
		type: 'composite',
		requiredOwned: ['menuitemradio', 'menuitem', 'menuitemcheckbox'],
		allowedAttrs: ['aria-activedescendant', 'aria-expanded', 'aria-orientation']
	},
	menubar: {
		type: 'composite',
		requiredOwned: ['menuitemradio', 'menuitem', 'menuitemcheckbox'],
		allowedAttrs: ['aria-activedescendant', 'aria-expanded', 'aria-orientation']
	},
	menuitem: {
		type: 'widget',
		requiredContext: ['menu', 'menubar'],
		// Note: aria-expanded is not in the 1.1 spec but is
		// consistently supported in ATs and was added in 1.2
		allowedAttrs: ['aria-posinset', 'aria-setsize', 'aria-expanded'],
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
		nameFromContent: true
	},
	menuitemradio: {
		type: 'widget',
		requiredContext: ['menu', 'menubar'],
		allowedAttrs: [
			'aria-checked',
			'aria-posinset',
			'aria-readonly',
			'aria-setsize'
		],
		nameFromContent: true
	},
	navigation: {
		type: 'landmark',
		allowedAttrs: ['aria-expanded']
	},
	none: {
		type: 'structure'
	},
	note: {
		type: 'structure',
		allowedAttrs: ['aria-expanded']
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
		nameFromContent: true
	},
	presentation: {
		type: 'structure'
	},
	progressbar: {
		type: 'widget',
		allowedAttrs: [
			'aria-expanded',
			'aria-valuemax',
			'aria-valuemin',
			'aria-valuenow',
			'aria-valuetext'
		]
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
		]
	},
	range: {
		type: 'abstract'
	},
	region: {
		type: 'landmark',
		allowedAttrs: ['aria-expanded']
	},
	roletype: {
		type: 'abstract'
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
		nameFromContent: true
	},
	rowgroup: {
		type: 'structure',
		requiredContext: ['grid', 'table', 'treegrid'],
		requiredOwned: ['row'],
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
		]
	},
	search: {
		type: 'landmark',
		allowedAttrs: ['aria-expanded']
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
		]
	},
	section: {
		type: 'abstract',
		// Note: spec difference
		nameFromContent: true
	},
	sectionhead: {
		type: 'abstract',
		// Note: spec difference
		nameFromContent: true
	},
	select: {
		type: 'abstract'
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
		]
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
		]
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
		]
	},
	status: {
		type: 'widget',
		allowedAttrs: ['aria-expanded']
	},
	structure: {
		type: 'abstract'
	},
	switch: {
		type: 'widget',
		requiredAttrs: ['aria-checked'],
		allowedAttrs: ['aria-readonly'],
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
		]
	},
	tabpanel: {
		type: 'widget',
		allowedAttrs: ['aria-expanded']
	},
	term: {
		type: 'structure',
		allowedAttrs: ['aria-expanded'],
		// Note: spec difference
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
		]
	},
	timer: {
		type: 'widget',
		allowedAttrs: ['aria-expanded']
	},
	toolbar: {
		type: 'structure',
		allowedAttrs: ['aria-orientation', 'aria-activedescendant', 'aria-expanded']
	},
	tooltip: {
		type: 'structure',
		allowedAttrs: ['aria-expanded'],
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
		]
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
		]
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
		nameFromContent: true
	},
	widget: {
		type: 'abstract'
	},
	window: {
		type: 'abstract'
	}
};

export default ariaRoles;

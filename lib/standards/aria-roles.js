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
		type: 'landmark',
		allowedAttrs: ['aria-activedescendant']
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
		requiredOwned: ['row'],
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
		requiredAttrs: ['aria-checked'],
		// Note: aria-required is not in the 1.1 spec but is
		// consistently supported in ATs and was added in 1.2.
		allowedAttrs: ['aria-readonly', 'aria-required'],
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
		]
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
		allowedAttrs: ['aria-expanded']
	},
	form: {
		type: 'landmark',
		allowedAttrs: ['aria-expanded']
	},
	grid: {
		type: 'composite',
		requiredOwned: ['row', 'rowgroup'],
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
	}
};

export default ariaRoles;

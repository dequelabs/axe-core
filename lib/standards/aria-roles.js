// Source: https://www.w3.org/TR/wai-aria-1.1/#roles
// Source: https://www.w3.org/TR/dpub-aria-1.0/

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
		nameFrom: ['author']
	},
	alertdialog: {
		type: 'widget',
		allowedAttrs: ['aria-expanded', 'aria-modal'],
		nameFrom: ['author']
	},
	application: {
		type: 'landmark',
		allowedAttrs: ['aria-activedescendant'],
		nameFrom: ['author']
	},
	article: {
		type: 'structure',
		allowedAttrs: ['aria-posinset', 'aria-setsize', 'aria-expanded'],
		nameFrom: ['author'],
		implicit: ['article']
	},
	banner: {
		type: 'landmark',
		allowedAttrs: ['aria-expanded'],
		nameFrom: ['author'],
		implicit: ['header']
	},
	button: {
		type: 'widget',
		allowedAttrs: ['aria-expanded', 'aria-pressed'],
		nameFrom: ['contents', 'author'],
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
		owned: ['row'],
		allowedAttrs: [
			'aria-colindex',
			'aria-colspan',
			'aria-rowindex',
			'aria-rowspan',
			'aria-expanded'
		],
		nameFrom: ['contents', 'author'],
		implicit: ['td', 'th']
	},
	checkbox: {
		type: 'widget',
		requiredAttrs: ['aria-checked'],
		// Note: aria-required is not in the 1.1 spec but is
		// consistently supported in ATs and was added in 1.2.
		allowedAttrs: ['aria-readonly', 'aria-required'],
		nameFrom: ['contents', 'author'],
		implicit: ['input[type="checkbox"]']
	},
	columnheader: {
		type: 'structure',
		context: ['row'],
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
		implicit: ['th']
	},
	combobox: {
		type: 'composite',
		owned: ['listbox', 'tree', 'grid', 'dialog', 'textbox'],
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
		nameFrom: ['author']
	},
	command: {
		type: 'abstract',
		nameFrom: ['author']
	},
	complementary: {
		type: 'landmark',
		allowedAttrs: ['aria-expanded'],
		nameFrom: ['author'],
		implicit: ['aside']
	},
	composite: {
		type: 'abstract',
		nameFrom: ['author']
	},
	contentinfo: {
		type: 'landmark',
		allowedAttrs: ['aria-expanded'],
		nameFrom: ['author'],
		implicit: ['footer']
	},
	definition: {
		type: 'structure',
		allowedAttrs: ['aria-expanded'],
		nameFrom: ['author'],
		implicit: ['dd', 'dfn']
	},
	dialog: {
		type: 'widget',
		allowedAttrs: ['aria-expanded', 'aria-modal'],
		nameFrom: ['author'],
		implicit: ['dialog']
	},
	directory: {
		type: 'structure',
		allowedAttrs: ['aria-expanded'],
		nameFrom: ['contents', 'author']
	},
	document: {
		type: 'structure',
		allowedAttrs: ['aria-expanded'],
		nameFrom: ['author'],
		implicit: ['body']
	},
	feed: {
		type: 'structure',
		owned: ['article'],
		allowedAttrs: ['aria-expanded'],
		nameFrom: ['author']
	},
	figure: {
		type: 'structure',
		allowedAttrs: ['aria-expanded'],
		nameFrom: ['author'],
		implicit: ['figure']
	},
	form: {
		type: 'landmark',
		allowedAttrs: ['aria-expanded'],
		nameFrom: ['author'],
		implicit: ['form']
	},
	grid: {
		type: 'composite',
		owned: ['row', 'rowgroup'],
		allowedAttrs: [
			'aria-level',
			'aria-multiselectable',
			'aria-readonly',
			'aria-activedescendant',
			'aria-colcount',
			'aria-expanded',
			'aria-rowcount'
		],
		nameFrom: ['author'],
		implicit: ['table']
	},
	gridcell: {
		type: 'widget',
		context: ['row'],
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
		nameFrom: ['contents', 'author'],
		implicit: ['td', 'th']
	},
	group: {
		type: 'structure',
		allowedAttrs: ['aria-activedescendant', 'aria-expanded'],
		nameFrom: ['author'],
		implicit: ['details', 'optgroup']
	},
	heading: {
		type: 'structure',
		requiredAttrs: ['aria-level'],
		allowedAttrs: ['aria-expanded'],
		nameFrom: ['contents', 'author'],
		implicit: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
	}
};

export default ariaRoles;

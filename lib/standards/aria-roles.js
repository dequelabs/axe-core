// Source: https://www.w3.org/TR/wai-aria-1.1/#roles
// Source for abstract roles (types): https://www.w3.org/TR/wai-aria/#abstract_roles

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
    type: 'structure',
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['section']
  },
  alertdialog: {
    type: 'window',
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: ['aria-expanded', 'aria-modal'],
    superclassRole: ['alert', 'dialog'],
    accessibleNameRequired: true
  },
  application: {
    // Note: spec difference
    type: 'landmark',
    // Note: aria-expanded is not in the 1.1 spec but is
    // consistently supported in ATs and was added in 1.2
    allowedAttrs: ['aria-activedescendant', 'aria-expanded'],
    superclassRole: ['structure'],
    accessibleNameRequired: true
  },
  article: {
    type: 'structure',
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: ['aria-posinset', 'aria-setsize', 'aria-expanded'],
    superclassRole: ['document']
  },
  banner: {
    type: 'landmark',
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['landmark']
  },
  blockquote: {
    type: 'structure',
    superclassRole: ['section']
  },
  button: {
    type: 'widget',
    allowedAttrs: ['aria-expanded', 'aria-pressed'],
    superclassRole: ['command'],
    accessibleNameRequired: true,
    nameFromContent: true,
    childrenPresentational: true
  },
  caption: {
    type: 'structure',
    requiredContext: ['figure', 'table', 'grid', 'treegrid'],
    superclassRole: ['section'],
    prohibitedAttrs: ['aria-label', 'aria-labelledby']
  },
  cell: {
    type: 'structure',
    requiredContext: ['row'],
    // Spec difference: Aria-expanded removed in 1.2
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
    // Note: aria-required is not in the 1.1 spec but is
    // consistently supported in ATs and was added in 1.2
    requiredAttrs: ['aria-checked'],
    allowedAttrs: ['aria-readonly', 'aria-expanded', 'aria-required'],
    superclassRole: ['input'],
    accessibleNameRequired: true,
    nameFromContent: true,
    childrenPresentational: true
  },
  code: {
    type: 'structure',
    superclassRole: ['section'],
    prohibitedAttrs: ['aria-label', 'aria-labelledby']
  },
  columnheader: {
    type: 'structure',
    requiredContext: ['row'],
    // Spec difference: Aria-expanded removed in 1.2
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
    // Note: spec difference
    accessibleNameRequired: false,
    nameFromContent: true
  },
  combobox: {
    // Note: spec difference
    type: 'widget',
    requiredAttrs: ['aria-expanded', 'aria-controls'],
    allowedAttrs: [
      'aria-owns',
      'aria-autocomplete',
      'aria-readonly',
      'aria-required',
      'aria-activedescendant',
      'aria-orientation'
    ],
    superclassRole: ['select'],
    accessibleNameRequired: true
  },
  command: {
    type: 'abstract',
    superclassRole: ['widget']
  },
  complementary: {
    type: 'landmark',
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['landmark']
  },
  composite: {
    type: 'abstract',
    superclassRole: ['widget']
  },
  contentinfo: {
    type: 'landmark',
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['landmark']
  },
  comment: {
    type: 'structure',
    allowedAttrs: ['aria-level', 'aria-posinset', 'aria-setsize'],
    superclassRole: ['article']
  },
  definition: {
    type: 'structure',
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['section']
  },
  deletion: {
    type: 'structure',
    superclassRole: ['section'],
    prohibitedAttrs: ['aria-label', 'aria-labelledby']
  },
  dialog: {
    type: 'window',
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: ['aria-expanded', 'aria-modal'],
    superclassRole: ['window'],
    accessibleNameRequired: true
  },
  directory: {
    type: 'structure',
    deprecated: true,
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['list'],
    // Note: spec difference
    nameFromContent: true
  },
  document: {
    type: 'structure',
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['structure']
  },
  emphasis: {
    type: 'structure',
    superclassRole: ['section'],
    prohibitedAttrs: ['aria-label', 'aria-labelledby']
  },
  feed: {
    type: 'structure',
    requiredOwned: ['article'],
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['list']
  },
  figure: {
    type: 'structure',
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['section'],
    // Note: spec difference
    nameFromContent: true
  },
  form: {
    type: 'landmark',
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['landmark']
  },
  grid: {
    type: 'composite',
    requiredOwned: ['rowgroup', 'row'],
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: [
      'aria-level',
      'aria-multiselectable',
      'aria-readonly',
      'aria-activedescendant',
      'aria-colcount',
      'aria-expanded',
      'aria-rowcount'
    ],
    superclassRole: ['composite', 'table'],
    // Note: spec difference
    accessibleNameRequired: false
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
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: ['aria-activedescendant', 'aria-expanded'],
    superclassRole: ['section']
  },
  heading: {
    type: 'structure',
    requiredAttrs: ['aria-level'],
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['sectionhead'],
    // Note: spec difference
    accessibleNameRequired: false,
    nameFromContent: true
  },
  img: {
    type: 'structure',
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['section'],
    accessibleNameRequired: true,
    childrenPresentational: true
  },
  input: {
    type: 'abstract',
    superclassRole: ['widget']
  },
  insertion: {
    type: 'structure',
    superclassRole: ['section'],
    prohibitedAttrs: ['aria-label', 'aria-labelledby']
  },
  landmark: {
    type: 'abstract',
    superclassRole: ['section']
  },
  link: {
    type: 'widget',
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['command'],
    accessibleNameRequired: true,
    nameFromContent: true
  },
  list: {
    type: 'structure',
    requiredOwned: ['listitem'],
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['section']
  },
  listbox: {
    // Note: spec difference
    type: 'widget',
    requiredOwned: ['group', 'option'],
    allowedAttrs: [
      'aria-multiselectable',
      'aria-readonly',
      'aria-required',
      'aria-activedescendant',
      'aria-expanded',
      'aria-orientation'
    ],
    superclassRole: ['select'],
    accessibleNameRequired: true
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
    superclassRole: ['section'],
    // Note: spec difference
    nameFromContent: true
  },
  log: {
    type: 'structure',
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['section']
  },
  main: {
    type: 'landmark',
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['landmark']
  },
  marquee: {
    type: 'structure',
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['section']
  },
  math: {
    type: 'structure',
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['section'],
    childrenPresentational: true
  },
  menu: {
    type: 'composite',
    // Note: spec difference (menu & separator as required owned)
    requiredOwned: [
      'group',
      'menuitemradio',
      'menuitem',
      'menuitemcheckbox',
      'menu',
      'separator'
    ],
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: [
      'aria-activedescendant',
      'aria-expanded',
      'aria-orientation'
    ],
    superclassRole: ['select']
  },
  menubar: {
    type: 'composite',
    // Note: spec difference (menu & separator as required owned)
    requiredOwned: [
      'group',
      'menuitemradio',
      'menuitem',
      'menuitemcheckbox',
      'menu',
      'separator'
    ],
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: [
      'aria-activedescendant',
      'aria-expanded',
      'aria-orientation'
    ],
    superclassRole: ['menu']
  },
  menuitem: {
    type: 'widget',
    requiredContext: ['menu', 'menubar', 'group'],
    // Note: aria-expanded is not in the 1.1 spec but is
    // consistently supported in ATs and was added in 1.2
    allowedAttrs: ['aria-posinset', 'aria-setsize', 'aria-expanded'],
    superclassRole: ['command'],
    accessibleNameRequired: true,
    nameFromContent: true
  },
  menuitemcheckbox: {
    type: 'widget',
    requiredContext: ['menu', 'menubar', 'group'],
    requiredAttrs: ['aria-checked'],
    allowedAttrs: [
      'aria-expanded',
      'aria-posinset',
      'aria-readonly',
      'aria-setsize'
    ],
    superclassRole: ['checkbox', 'menuitem'],
    accessibleNameRequired: true,
    nameFromContent: true,
    childrenPresentational: true
  },
  menuitemradio: {
    type: 'widget',
    requiredContext: ['menu', 'menubar', 'group'],
    requiredAttrs: ['aria-checked'],
    allowedAttrs: [
      'aria-expanded',
      'aria-posinset',
      'aria-readonly',
      'aria-setsize'
    ],
    superclassRole: ['menuitemcheckbox', 'radio'],
    accessibleNameRequired: true,
    nameFromContent: true,
    childrenPresentational: true
  },
  meter: {
    type: 'structure',
    requiredAttrs: ['aria-valuenow'],
    allowedAttrs: ['aria-valuemax', 'aria-valuemin', 'aria-valuetext'],
    superclassRole: ['range'],
    accessibleNameRequired: true,
    childrenPresentational: true
  },
  mark: {
    type: 'structure',
    superclassRole: ['section'],
    prohibitedAttrs: ['aria-label', 'aria-labelledby']
  },
  navigation: {
    type: 'landmark',
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['landmark']
  },
  none: {
    type: 'structure',
    superclassRole: ['structure'],
    prohibitedAttrs: ['aria-label', 'aria-labelledby']
  },
  note: {
    type: 'structure',
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['section']
  },
  option: {
    type: 'widget',
    requiredContext: ['group', 'listbox'],
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
    accessibleNameRequired: true,
    nameFromContent: true,
    childrenPresentational: true
  },
  paragraph: {
    type: 'structure',
    superclassRole: ['section'],
    prohibitedAttrs: ['aria-label', 'aria-labelledby']
  },
  presentation: {
    type: 'structure',
    superclassRole: ['structure'],
    prohibitedAttrs: ['aria-label', 'aria-labelledby']
  },
  progressbar: {
    type: 'widget',
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: [
      'aria-expanded',
      'aria-valuemax',
      'aria-valuemin',
      'aria-valuenow',
      'aria-valuetext'
    ],
    superclassRole: ['range'],
    accessibleNameRequired: true,
    childrenPresentational: true
  },
  radio: {
    type: 'widget',
    // Note: aria-required is not in the 1.1 or 1.2 specs but is
    // consistently supported in ATs on the individual radio element
    requiredAttrs: ['aria-checked'],
    allowedAttrs: ['aria-posinset', 'aria-setsize', 'aria-required'],
    superclassRole: ['input'],
    accessibleNameRequired: true,
    nameFromContent: true,
    childrenPresentational: true
  },
  radiogroup: {
    type: 'composite',
    // Note: spec difference (no required owned)
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: [
      'aria-readonly',
      'aria-required',
      'aria-activedescendant',
      'aria-expanded',
      'aria-orientation'
    ],
    superclassRole: ['select'],
    // Note: spec difference
    accessibleNameRequired: false
  },
  range: {
    type: 'abstract',
    superclassRole: ['widget']
  },
  region: {
    type: 'landmark',
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['landmark'],
    // Note: spec difference
    accessibleNameRequired: false
  },
  roletype: {
    type: 'abstract',
    superclassRole: []
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
      'aria-expanded',
      'aria-posinset',
      'aria-setsize'
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
    // Spec difference: Aria-expanded removed in 1.2
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
    // Note: spec difference
    accessibleNameRequired: false,
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
    superclassRole: ['range'],
    childrenPresentational: true
  },
  search: {
    type: 'landmark',
    // Spec difference: Aria-expanded removed in 1.2
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
    superclassRole: ['textbox'],
    accessibleNameRequired: true
  },
  section: {
    type: 'abstract',
    superclassRole: ['structure'],
    // Note: spec difference
    nameFromContent: true
  },
  sectionhead: {
    type: 'abstract',
    superclassRole: ['structure'],
    // Note: spec difference
    nameFromContent: true
  },
  select: {
    type: 'abstract',
    superclassRole: ['composite', 'group']
  },
  separator: {
    type: 'structure',
    requiredAttrs: ['aria-valuenow'],
    // Note: since the separator role has implicit
    // aria-orientation, aria-valuemax, aria-valuemin, and
    // values it is not required to be added by
    // the user
    allowedAttrs: [
      'aria-valuemax',
      'aria-valuemin',
      'aria-orientation',
      'aria-valuetext'
    ],
    superclassRole: ['structure', 'widget'],
    childrenPresentational: true
  },
  slider: {
    type: 'widget',
    requiredAttrs: ['aria-valuenow'],
    // Note: since the slider role has implicit
    // aria-orientation, aria-valuemax, aria-valuemin values it
    // is not required to be added by the user
    // Note: aria-required is not in the 1.1 or 1.2 specs but is
    // consistently supported in ATs
    allowedAttrs: [
      'aria-valuemax',
      'aria-valuemin',
      'aria-orientation',
      'aria-readonly',
      'aria-required',
      'aria-valuetext'
    ],
    superclassRole: ['input', 'range'],
    accessibleNameRequired: true,
    childrenPresentational: true
  },
  spinbutton: {
    type: 'widget',
    // Note: since the spinbutton role has implicit
    // aria-valuenow, aria-valuemax, aria-valuemin values it
    // is not required to be added by the user
    allowedAttrs: [
      'aria-valuemax',
      'aria-valuemin',
      'aria-readonly',
      'aria-required',
      'aria-activedescendant',
      'aria-valuetext',
      'aria-valuenow'
    ],
    superclassRole: ['composite', 'input', 'range'],
    accessibleNameRequired: true
  },
  status: {
    type: 'structure',
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['section']
  },
  strong: {
    type: 'structure',
    superclassRole: ['section'],
    prohibitedAttrs: ['aria-label', 'aria-labelledby']
  },
  structure: {
    type: 'abstract',
    superclassRole: ['roletype']
  },
  subscript: {
    type: 'structure',
    superclassRole: ['section'],
    prohibitedAttrs: ['aria-label', 'aria-labelledby']
  },
  superscript: {
    type: 'structure',
    superclassRole: ['section'],
    prohibitedAttrs: ['aria-label', 'aria-labelledby']
  },
  switch: {
    type: 'widget',
    requiredAttrs: ['aria-checked'],
    allowedAttrs: ['aria-expanded', 'aria-readonly', 'aria-required'],
    superclassRole: ['checkbox'],
    accessibleNameRequired: true,
    nameFromContent: true,
    childrenPresentational: true
  },
  suggestion: {
    type: 'structure',
    requiredOwned: ['insertion', 'deletion'],
    superclassRole: ['section'],
    prohibitedAttrs: ['aria-label', 'aria-labelledby']
  },
  tab: {
    type: 'widget',
    requiredContext: ['tablist'],
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: [
      'aria-posinset',
      'aria-selected',
      'aria-setsize',
      'aria-expanded'
    ],
    superclassRole: ['sectionhead', 'widget'],
    nameFromContent: true,
    childrenPresentational: true
  },
  table: {
    type: 'structure',
    requiredOwned: ['rowgroup', 'row'],
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: ['aria-colcount', 'aria-rowcount', 'aria-expanded'],
    // NOTE: although the spec says this is not named from contents,
    // the accessible text acceptance tests (#139 and #140) require
    // table be named from content (we even had to special case
    // table in commons/aria/named-from-contents)
    superclassRole: ['section'],
    // Note: spec difference
    accessibleNameRequired: false,
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
    // Spec ambiguity: Aria 1.1 and 1.2 both say that tabpanel rolls up to
    // structure via its section superclass, but also include it as a widget
    // in §5.3.2 Widget Roles.
    type: 'structure',
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['section'],
    // Note: spec difference
    accessibleNameRequired: false
  },
  term: {
    type: 'structure',
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['section'],
    // Note: spec difference
    nameFromContent: true
  },
  text: {
    type: 'structure',
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
    superclassRole: ['input'],
    accessibleNameRequired: true
  },
  time: {
    type: 'structure',
    superclassRole: ['section']
  },
  timer: {
    type: 'structure',
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['status']
  },
  toolbar: {
    type: 'structure',
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: [
      'aria-orientation',
      'aria-activedescendant',
      'aria-expanded'
    ],
    superclassRole: ['group'],
    accessibleNameRequired: true
  },
  tooltip: {
    type: 'structure',
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['section'],
    nameFromContent: true
  },
  tree: {
    type: 'composite',
    requiredOwned: ['group', 'treeitem'],
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: [
      'aria-multiselectable',
      'aria-required',
      'aria-activedescendant',
      'aria-expanded',
      'aria-orientation'
    ],
    superclassRole: ['select'],
    // Note: spec difference
    accessibleNameRequired: false
  },
  treegrid: {
    type: 'composite',
    requiredOwned: ['rowgroup', 'row'],
    // Spec difference: Aria-expanded removed in 1.2
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
    superclassRole: ['grid', 'tree'],
    // Note: spec difference
    accessibleNameRequired: false
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
    accessibleNameRequired: true,
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

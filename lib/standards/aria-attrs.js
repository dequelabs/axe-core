// Source: https://www.w3.org/TR/wai-aria-1.1/#states_and_properties
const ariaAttrs = {
  'aria-activedescendant': {
    type: 'idref',
    prop: 'ariaActiveDescendantElement',
    allowEmpty: true
  },
  'aria-atomic': {
    type: 'boolean',
    prop: 'ariaAtomic',
    global: true
  },
  'aria-autocomplete': {
    type: 'nmtoken',
    prop: 'ariaAutoComplete',
    values: ['inline', 'list', 'both', 'none']
  },
  'aria-braillelabel': {
    type: 'string',
    prop: 'ariaBrailleLabel',
    allowEmpty: true,
    global: true
  },
  'aria-brailleroledescription': {
    type: 'string',
    prop: 'ariaBrailleRoleDescription',
    allowEmpty: true,
    global: true
  },
  'aria-busy': {
    type: 'boolean',
    prop: 'ariaBusy',
    global: true
  },
  'aria-checked': {
    type: 'nmtoken',
    prop: 'ariaChecked',
    values: ['false', 'mixed', 'true', 'undefined']
  },
  'aria-colcount': {
    type: 'int',
    prop: 'ariaColCount',
    minValue: -1
  },
  'aria-colindex': {
    type: 'int',
    prop: 'ariaColIndex',
    minValue: 1
  },
  'aria-colspan': {
    type: 'int',
    prop: 'ariaColSpan',
    minValue: 1
  },
  'aria-controls': {
    type: 'idrefs',
    prop: 'ariaControlsElements',
    allowEmpty: true,
    global: true
  },
  'aria-current': {
    type: 'nmtoken',
    prop: 'ariaCurrent',
    allowEmpty: true,
    values: ['page', 'step', 'location', 'date', 'time', 'true', 'false'],
    global: true
  },
  'aria-describedby': {
    type: 'idrefs',
    prop: 'ariaDescribedByElements',
    allowEmpty: true,
    global: true
  },
  'aria-description': {
    type: 'string',
    prop: 'ariaDescription',
    allowEmpty: true,
    global: true
  },
  'aria-details': {
    type: 'idref',
    prop: 'ariaDetailsElements',
    allowEmpty: true,
    global: true
  },
  'aria-disabled': {
    type: 'boolean',
    prop: 'ariaDisabled',
    global: true
  },
  'aria-dropeffect': {
    type: 'nmtokens',
    values: ['copy', 'execute', 'link', 'move', 'none', 'popup'],
    global: true
  },
  'aria-errormessage': {
    type: 'idref',
    prop: 'ariaErrorMessageElements',
    allowEmpty: true,
    global: true
  },
  'aria-expanded': {
    type: 'nmtoken',
    prop: 'ariaExpanded',
    values: ['true', 'false', 'undefined']
  },
  'aria-flowto': {
    type: 'idrefs',
    prop: 'ariaFlowToElements',
    allowEmpty: true,
    global: true
  },
  'aria-grabbed': {
    type: 'nmtoken',
    values: ['true', 'false', 'undefined'],
    global: true
  },
  'aria-haspopup': {
    type: 'nmtoken',
    prop: 'ariaHasPopup',
    allowEmpty: true,
    values: ['true', 'false', 'menu', 'listbox', 'tree', 'grid', 'dialog'],
    global: true
  },
  'aria-hidden': {
    type: 'nmtoken',
    prop: 'ariaHidden',
    values: ['true', 'false', 'undefined'],
    global: true
  },
  'aria-invalid': {
    type: 'nmtoken',
    prop: 'ariaInvalid',
    values: ['grammar', 'false', 'spelling', 'true'],
    global: true
  },
  'aria-keyshortcuts': {
    type: 'string',
    prop: 'ariaKeyShortcuts',
    allowEmpty: true,
    global: true
  },
  'aria-label': {
    type: 'string',
    prop: 'ariaLabel',
    allowEmpty: true,
    global: true
  },
  'aria-labelledby': {
    type: 'idrefs',
    prop: 'ariaLabelledByElements',
    allowEmpty: true,
    global: true
  },
  'aria-level': {
    type: 'int',
    prop: 'ariaLevel',
    minValue: 1
  },
  'aria-live': {
    type: 'nmtoken',
    prop: 'ariaLive',
    values: ['assertive', 'off', 'polite'],
    global: true
  },
  'aria-modal': {
    type: 'boolean',
    prop: 'ariaModal'
  },
  'aria-multiline': {
    type: 'boolean',
    prop: 'ariaMultiline'
  },
  'aria-multiselectable': {
    type: 'boolean',
    prop: 'ariaMultiSelectable'
  },
  'aria-orientation': {
    type: 'nmtoken',
    prop: 'ariaOrientation',
    values: ['horizontal', 'undefined', 'vertical']
  },
  'aria-owns': {
    type: 'idrefs',
    prop: 'ariaOwnsElements',
    allowEmpty: true,
    global: true
  },
  'aria-placeholder': {
    type: 'string',
    prop: 'ariaPlaceholder',
    allowEmpty: true
  },
  'aria-posinset': {
    type: 'int',
    prop: 'ariaPosInSet',
    minValue: 1
  },
  'aria-pressed': {
    type: 'nmtoken',
    prop: 'ariaPressed',
    values: ['false', 'mixed', 'true', 'undefined']
  },
  'aria-readonly': {
    type: 'boolean',
    prop: 'ariaReadOnly'
  },
  'aria-relevant': {
    type: 'nmtokens',
    prop: 'ariaRelevant',
    values: ['additions', 'all', 'removals', 'text'],
    global: true
  },
  'aria-required': {
    type: 'boolean',
    prop: 'ariaRequired'
  },
  'aria-roledescription': {
    type: 'string',
    prop: 'ariaRoleDescription',
    allowEmpty: true,
    global: true
  },
  'aria-rowcount': {
    type: 'int',
    prop: 'ariaRowCount',
    minValue: -1
  },
  'aria-rowindex': {
    type: 'int',
    prop: 'ariaRowIndex',
    minValue: 1
  },
  'aria-rowspan': {
    type: 'int',
    prop: 'ariaRowSpan',
    minValue: 0
  },
  'aria-selected': {
    type: 'nmtoken',
    prop: 'ariaSelected',
    values: ['false', 'true', 'undefined']
  },
  'aria-setsize': {
    type: 'int',
    prop: 'ariaSetSize',
    minValue: -1
  },
  'aria-sort': {
    type: 'nmtoken',
    prop: 'ariaSort',
    values: ['ascending', 'descending', 'none', 'other']
  },
  'aria-valuemax': {
    type: 'decimal',
    prop: 'ariaValueMax'
  },
  'aria-valuemin': {
    type: 'decimal',
    prop: 'ariaValueMin'
  },
  'aria-valuenow': {
    type: 'decimal',
    prop: 'ariaValueNow'
  },
  'aria-valuetext': {
    type: 'string',
    prop: 'ariaValueText',
    allowEmpty: true
  }
};

export default ariaAttrs;

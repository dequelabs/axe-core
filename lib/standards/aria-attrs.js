// Source: https://www.w3.org/TR/wai-aria/#states_and_properties
const ariaAttrs = {
  'aria-actions': {
    type: 'idrefs',
    prop: 'ariaActionsElements',
    allowEmpty: true,
    global: true
  },
  'aria-activedescendant': {
    type: 'idref',
    prop: 'ariaActiveDescendantElement',
    allowEmpty: true
  },
  'aria-atomic': {
    type: 'boolean',
    prop: 'ariaAtomic',
    global: true,
    caseInsensitive: true
  },
  'aria-autocomplete': {
    type: 'nmtoken',
    prop: 'ariaAutoComplete',
    values: ['inline', 'list', 'both', 'none'],
    caseInsensitive: true
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
    global: true,
    // NVDA/Firefox ignores all non-lowercase values
    caseInsensitive: false
  },
  'aria-checked': {
    type: 'nmtoken',
    prop: 'ariaChecked',
    values: ['false', 'mixed', 'true', 'undefined'],
    // JAWS/Chrome and NVDA/Firefox announce states incorrectly if not all lowercase
    caseInsensitive: false
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
    global: true,
    // VoiceOver/Safari and NVDA/Firefox treats non-lowercase as "aria-current=true"
    caseInsensitive: false
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
    type: 'idrefs',
    prop: 'ariaDetailsElements',
    allowEmpty: true,
    global: true
  },
  'aria-disabled': {
    type: 'boolean',
    prop: 'ariaDisabled',
    global: true,
    caseInsensitive: true
  },
  'aria-dropeffect': {
    type: 'nmtokens',
    values: ['copy', 'execute', 'link', 'move', 'none', 'popup'],
    global: true,
    caseInsensitive: true,
    // Deprecated in WAI-ARIA 1.1
    deprecated: true
  },
  'aria-errormessage': {
    type: 'idrefs',
    prop: 'ariaErrorMessageElements',
    allowEmpty: true,
    global: true
  },
  'aria-expanded': {
    type: 'nmtoken',
    prop: 'ariaExpanded',
    values: ['true', 'false', 'undefined'],
    caseInsensitive: true
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
    global: true,
    caseInsensitive: true,
    // Deprecated in WAI-ARIA 1.1
    deprecated: true
  },
  'aria-haspopup': {
    type: 'nmtoken',
    prop: 'ariaHasPopup',
    allowEmpty: true,
    values: ['true', 'false', 'menu', 'listbox', 'tree', 'grid', 'dialog'],
    global: true,
    caseInsensitive: true
  },
  'aria-hidden': {
    type: 'nmtoken',
    prop: 'ariaHidden',
    values: ['true', 'false', 'undefined'],
    global: true,
    caseInsensitive: true
  },
  'aria-invalid': {
    type: 'nmtoken',
    prop: 'ariaInvalid',
    values: ['grammar', 'false', 'spelling', 'true'],
    global: true,
    caseInsensitive: true
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
    global: true,
    caseInsensitive: true
  },
  'aria-modal': {
    type: 'boolean',
    prop: 'ariaModal',
    caseInsensitive: true
  },
  'aria-multiline': {
    type: 'boolean',
    prop: 'ariaMultiline',
    // NVDA/Firefox ignores all non-lowercase values
    caseInsensitive: false
  },
  'aria-multiselectable': {
    type: 'boolean',
    prop: 'ariaMultiSelectable',
    caseInsensitive: true
  },
  'aria-orientation': {
    type: 'nmtoken',
    prop: 'ariaOrientation',
    values: ['horizontal', 'undefined', 'vertical'],
    caseInsensitive: true
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
    values: ['false', 'mixed', 'true', 'undefined'],
    // NVDA/Firefox treats non-lowercase as "aria-pressed=true"
    caseInsensitive: false
  },
  'aria-readonly': {
    type: 'boolean',
    prop: 'ariaReadOnly',
    // NVDA/Firefox treats non-lowercase as "aria-readonly=true"
    caseInsensitive: false
  },
  'aria-relevant': {
    type: 'nmtokens',
    prop: 'ariaRelevant',
    values: ['additions', 'all', 'removals', 'text'],
    global: true,
    // VoiceOver/Safari treats non-lowercase as "aria-relevant=all"
    // JAWS/Chrome won't announce any changes if not all lowercase
    caseInsensitive: false
  },
  'aria-required': {
    type: 'boolean',
    prop: 'ariaRequired',
    // NVDA/Firefox treats non-lowercase as "aria-required=true"
    caseInsensitive: false
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
    values: ['false', 'true', 'undefined'],
    caseInsensitive: true
  },
  'aria-setsize': {
    type: 'int',
    prop: 'ariaSetSize',
    minValue: -1
  },
  'aria-sort': {
    type: 'nmtoken',
    prop: 'ariaSort',
    values: ['ascending', 'descending', 'none', 'other'],
    // NVDA/Firefox ignores all non-lowercase values
    caseInsensitive: false
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

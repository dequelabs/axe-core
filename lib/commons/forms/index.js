// TODO: es-module-commons. convert to:
// export { default as isAriaCombobox } from 'path'
import isAriaCombobox from './is-aria-combobox';
import isAriaListbox from './is-aria-listbox';
import isAriaRange from './is-aria-range';
import isAriaTextbox from './is-aria-textbox';
import isNativeSelect from './is-native-select';
import isNativeTextbox from './is-native-textbox';

/**
 * Namespace for forms-related utilities.
 * @namespace commons.forms
 * @memberof axe
 */
const forms = {
	isAriaCombobox,
	isAriaListbox,
	isAriaRange,
	isAriaTextbox,
	isNativeSelect,
	isNativeTextbox
};
commons.forms = forms;

/* global text */

// TODO: es-module-commons. convert to:
// export { default as isAriaCombobox } from 'path'
import accessibleTextVirtual from './accessible-text-virtual';
import accessibleText from './accessible-text';
import formControlValue, {
	formControlValueMethods
} from './form-control-value';
import hasUnicode from './has-unicode';
import isHumanInterpretable from './is-human-interpretable';
import isIconLigature from './is-icon-ligature';
import isValidAutocomplete, { autocomplete } from './is-valid-autocomplete';
import labelText from './label-text';
import labelVirtual from './label-virtual';
import label from './label';
import nativeElementType from './native-element-type';
import nativeTextAlternative from './native-text-alternative';
import nativeTextMethods from './native-text-methods';
import removeUnicode from './remove-unicode';
import sanitize from './sanitize';
import subtreeText from './subtree-text';
import titleText from './title-text';
import unsupported from './unsupported';
import visibleTextNodes from './visible-text-nodes';
import visibleVirtual from './visible-virtual';
import visible from './visible';

/**
 * Namespace for text-related utilities.
 * @namespace text
 * @memberof axe.commons
 */
// TODO: es-module-commons. don't rely on global
text = {
	accessibleTextVirtual,
	accessibleText,
	formControlValue,
	formControlValueMethods,
	hasUnicode,
	isHumanInterpretable,
	isIconLigature,
	isValidAutocomplete,
	autocomplete,
	labelText,
	labelVirtual,
	label,
	nativeElementType,
	nativeTextAlternative,
	nativeTextMethods,
	removeUnicode,
	sanitize,
	subtreeText,
	titleText,
	unsupported,
	visibleTextNodes,
	visibleVirtual,
	visible
};
commons.text = text;

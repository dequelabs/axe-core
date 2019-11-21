/**
 * Namespace for text-related utilities.
 * @namespace text
 * @memberof axe.commons
 */
export {
	accessibleText,
	accessibleTextVirtual
} from './accessible-text-virtual';
export {
	default as formControlValue,
	formControlValueMethods
} from './form-control-value';
export { default as isHumanInterpretable } from './is-human-interpretable';
export { default as isIconLigature } from './is-icon-ligature';
export {
	default as isValidAutocomplete,
	autocomplete
} from './is-valid-autocomplete';
export { default as labelText } from './label-text';
export { label, labelVirtual } from './label-virtual';
export { default as nativeElementType } from './native-element-types';
export { default as nativeTextAlternative } from './native-text-alternative';
export { default as nativeTextMethods } from './native-text-methods';
export { default as sanitize } from './sanitize';
export { default as subtreeText } from './subtree-text';
export { default as titleText } from './title-text';
export { hasUnicode, removeUnicode } from './unicode';
export { default as unsupported } from './unsupported';
export { default as visibleTextNodes } from './visible-text-nodes';
export { visible, visibleVirtual } from './visible-virtual';

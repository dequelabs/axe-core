/**
 * Namespace for text-related utilities.
 * @namespace text
 * @memberof axe.commons
 */
export {
	accessibleText,
	accessibleTextVirtual
} from './accessible-text-virtual.js';
export {
	default as formControlValue,
	formControlValueMethods
} from './form-control-value.js';
export { default as isHumanInterpretable } from './is-human-interpretable.js';
export { default as isIconLigature } from './is-icon-ligature.js';
export {
	default as isValidAutocomplete,
	autocomplete
} from './is-valid-autocomplete.js';
export { default as labelText } from './label-text.js';
export { label, labelVirtual } from './label-virtual.js';
export { default as nativeElementType } from './native-element-types.js';
export { default as nativeTextAlternative } from './native-text-alternative.js';
export { default as nativeTextMethods } from './native-text-methods.js';
export { default as sanitize } from './sanitize.js';
export { default as subtreeText } from './subtree-text.js';
export { default as titleText } from './title-text.js';
export { hasUnicode, removeUnicode } from './unicode.js';
export { default as unsupported } from './unsupported.js';
export { default as visibleTextNodes } from './visible-text-nodes.js';
export { visible, visibleVirtual } from './visible-virtual.js';

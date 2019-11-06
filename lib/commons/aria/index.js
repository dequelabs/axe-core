/**
 * Namespace for aria-related utilities.
 * @namespace commons.aria
 * @memberof axe
 */

// by "renaming" (but not really) the exports we can see what the export is
// called here rather than having to dive into each of the files to figure
// out its name
export { default as allowedAttr } from './allowed-attr.js';
export { default as arialabelText } from './arialabel-text.js';
export { default as arialabelledbyText } from './arialabelledby-text.js';
export {
	default as getElementUnallowedRoles
} from './get-element-unallowed-roles.js';
export { default as getOwnedVirtual } from './get-owned-virtual.js';
export { default as getRoleType } from './get-role-type.js';
export { default as getRole } from './get-role.js';
export { default as getRolesByType } from './get-roles-by-type.js';
export {
	default as getRolesWithNameFromContents
} from './get-roles-with-name-from-contents.js';
export { default as implicitNodes } from './implicit-nodes.js';
export { default as implicitRole } from './implicit-role.js';
export { default as isAccessibleRef } from './is-accessible-ref.js';
export {
	default as isAriaRoleAllowedOnElement
} from './is-aria-role-allowed-on-element.js';
export { default as isUnsupportedRole } from './is-unsupported-role.js';
export { default as isValidRole } from './is-valid-role.js';
export { labelVirtual, label } from './label-virtual.js';
export { default as lookupTable } from './lookup-table.js';
export { default as namedFromContents } from './named-from-contents.js';
export { default as requiredAttr } from './required-attr.js';
export { default as requiredContext } from './required-context.js';
export { default as requiredOwned } from './required-owned.js';
export { default as validateAttrValue } from './validate-attr-value.js';
export { default as validateAttr } from './validate-attr.js';

/* global aria */

// TODO: es-module-commons. convert to:
// export { default as allowedAttr } from 'path'
import allowedAttr from './allowed-attr';
import arialabelText from './arialabel-text';
import arialabelledbyText from './arialabelledby-text';
import getElementUnallowedRoles from './get-element-unallowed-roles';
import getOwnedVirtual from './get-owned-virtual';
import getRoleType from './get-role-type';
import getRole from './get-role';
import getRolesByType from './get-roles-by-type';
import getRolesWithNameFromContents from './get-roles-with-name-from-contents';
import implicitNodes from './implicit-nodes';
import getImplicitRole from './implicit-role';
import isAccessibleRef from './is-accessible-ref';
import isAriaRoleAllowedOnElement from './is-aria-role-allowed-on-element';
import isUnsupportedRole from './is-unsupported-role';
import isValidRole from './is-valid-role';
import labelVirtual from './label-virtual';
import label from './label';
import lookupTable from './lookup-table';
import namedFromContents from './named-from-contents';
import requiredAttr from './required-attr';
import requiredContext from './required-context';
import requiredOwned from './required-owned';
import validateAttrValue from './validate-attr-value';
import validateAttr from './validate-attr';

/**
 * Namespace for aria-related utilities.
 * @namespace commons.aria
 * @memberof axe
 */
// TODO: es-module-commons. don't rely on global
aria = {
	allowedAttr,
	arialabelText,
	arialabelledbyText,
	getElementUnallowedRoles,
	getOwnedVirtual,
	getRoleType,
	getRole,
	getRolesByType,
	getRolesWithNameFromContents,
	implicitNodes,
	implicitRole: getImplicitRole,
	isAccessibleRef,
	isAriaRoleAllowedOnElement,
	isUnsupportedRole,
	isValidRole,
	labelVirtual,
	label,
	lookupTable,
	namedFromContents,
	requiredAttr,
	requiredContext,
	requiredOwned,
	validateAttrValue,
	validateAttr
};
commons.aria = aria;

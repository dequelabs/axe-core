import {
	getRole,
	lookupTable,
	arialabelText,
	arialabelledbyText,
	getRolesWithNameFromContents
} from '../commons/aria';
import { sanitize, visibleVirtual } from '../commons/text';

function labelContentNameMismatchMatches(node, virtualNode) {
	/**
	 * Applicability:
	 * Rule applies to any element that has
	 * a) a semantic role that is `widget` that supports name from content
	 * b) has visible text content
	 * c) has accessible name (eg: `aria-label`)
	 */
	const role = getRole(node);
	if (!role) {
		return false;
	}

	const widgetRoles = Object.keys(lookupTable.role).filter(
		key => lookupTable.role[key].type === `widget`
	);
	const isWidgetType = widgetRoles.includes(role);
	if (!isWidgetType) {
		return false;
	}

	const rolesWithNameFromContents = getRolesWithNameFromContents();
	if (!rolesWithNameFromContents.includes(role)) {
		return false;
	}

	/**
	 * if no `aria-label` or `aria-labelledby` attribute - ignore `node`
	 */
	if (
		!sanitize(arialabelText(virtualNode)) &&
		!sanitize(arialabelledbyText(node))
	) {
		return false;
	}

	/**
	 * if no `contentText` - ignore `node`
	 */
	if (!sanitize(visibleVirtual(virtualNode))) {
		return false;
	}

	return true;
}

export default labelContentNameMismatchMatches;

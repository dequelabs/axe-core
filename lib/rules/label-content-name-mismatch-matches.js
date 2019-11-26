import {
  getRole,
  lookupTable,
  getRolesWithNameFromContents,
  arialabelText,
  arialabelledbyText,
} from '../commons/aria';
import { sanitize, visibleVirtual } from '../commons/text';

/**
 * Applicability:
 * Rule applies to any element that has
 * a) a semantic role that is `widget` that supports name from content
 * b) has visible text content
 * c) has accessible name (eg: `aria-label`)
 */
function labelContentNameMismatchMatches(node, virtualNode, context) {
  const role = getRole(node);
  if (!role) {
  	return false;
  }

  const isWidgetType = lookupTable.rolesOfType.widget.includes(role);
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
  	!sanitize(arialabelText(node)) &&
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

export default labelContentNameMismatchMatches
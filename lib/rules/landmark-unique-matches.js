import { isVisibleToScreenReaders } from '../commons/dom';
import { getRole, getRoleType } from '../commons/aria';
import { getAriaRolesByType } from '../commons/standards';
import { accessibleTextVirtual } from '../commons/text';
import { closest } from '../core/utils';

/*
 * Since this is a best-practice rule, we are filtering elements as dictated by ARIA 1.1 Practices regardless of treatment by browser/AT combinations.
 *
 * Info: https://www.w3.org/TR/wai-aria-practices-1.1/#aria_landmark
 */
const excludedParentsForHeaderFooterLandmarks = [
  'article',
  'aside',
  'main',
  'nav',
  'section'
].join(',');

export default function landmarkUniqueMatches(node, virtualNode) {
  return (
    isLandmarkVirtual(virtualNode) && isVisibleToScreenReaders(virtualNode)
  );
}

function isLandmarkVirtual(vNode) {
  const landmarkRoles = getAriaRolesByType('landmark');
  const role = getRole(vNode, { dpub: true });
  if (!role) {
    return false;
  }

  const { nodeName } = vNode.props;
  if (nodeName === 'header' || nodeName === 'footer') {
    return isHeaderFooterLandmark(vNode);
  }

  if (nodeName === 'section' || nodeName === 'form') {
    const accessibleText = accessibleTextVirtual(vNode);
    return !!accessibleText;
  }

  var roleType = getRoleType(role);
  return (
    role === 'region' ||
    roleType === 'landmark' ||
    landmarkRoles.includes(roleType) ||
    landmarkRoles.indexOf(role) >= 0
  );
}

function isHeaderFooterLandmark(headerFooterElement) {
  return !closest(headerFooterElement, excludedParentsForHeaderFooterLandmarks);
}

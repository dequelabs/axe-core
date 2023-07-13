import { isVisibleToScreenReaders } from '../commons/dom';
import { closest } from '../core/utils';
import { getRole } from '../commons/aria';
import { getAriaRolesByType } from '../commons/standards';
import { accessibleTextVirtual } from '../commons/text';

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
  const role = getRole(vNode);
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

  return landmarkRoles.indexOf(role) >= 0 || role === 'region';
}

function isHeaderFooterLandmark(headerFooterElement) {
  return !closest(headerFooterElement, excludedParentsForHeaderFooterLandmarks);
}

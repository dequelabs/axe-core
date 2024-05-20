import { isVisibleToScreenReaders } from '../commons/dom';
import { closest } from '../core/utils';
import { getRole } from '../commons/aria';
import { getAriaRolesByType } from '../commons/standards';
import { accessibleTextVirtual } from '../commons/text';

// Sectioning content -
// https://html.spec.whatwg.org/multipage/dom.html#sectioning-content
const sectioningContentElements = ['article', 'aside', 'nav', 'section'];

/*
 * `header` and `footer` elements map to `banner` landmarks only when scoped to `body`
 * https://w3c.github.io/html-aam/#el-header
 * https://w3c.github.io/html-aam/#el-footer
 */
const excludedParentsForHeaderFooterLandmarks = [
  ...sectioningContentElements,
  'main'
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

  if (nodeName === 'aside') {
    return isAsideLandmark(vNode);
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

/*
 * `aside` elements map to `complementary` landmarks when scoped to `body` or
 * `main`. If it is within sectioning content, it is not a landmark unless it
 * has an accessible name.
 *
 * https://w3c.github.io/html-aam/#el-aside-ancestorbodymain
 */
const sectioningContentSelector = sectioningContentElements.join(',');
function isAsideLandmark(asideElement) {
  return (
    !closest(
      asideElement.parent, // closest() can match self, which we do not want, so start at parent element
      sectioningContentSelector
    ) || !!accessibleTextVirtual(asideElement)
  );
}

import { findUpVirtual, isVisible } from '../commons/dom';
import { getRole, getRoleType } from '../commons/aria';
import { getAriaRolesByType } from '../commons/standards';
import { accessibleTextVirtual } from '../commons/text';

function landmarkUniqueMatches(node, virtualNode) {
  /*
   * Since this is a best-practice rule, we are filtering elements as dictated by ARIA 1.1 Practices regardless of treatment by browser/AT combinations.
   *
   * Info: https://www.w3.org/TR/wai-aria-practices-1.1/#aria_landmark
   */
  var excludedParentsForHeaderFooterLandmarks = [
    'article',
    'aside',
    'main',
    'nav',
    'section'
  ].join(',');
  function isHeaderFooterLandmark(headerFooterElement) {
    return !findUpVirtual(
      headerFooterElement,
      excludedParentsForHeaderFooterLandmarks
    );
  }

  function isLandmarkVirtual(virtualNode) {
    var { actualNode } = virtualNode;
    var landmarkRoles = getAriaRolesByType('landmark');

    var role = getRole(actualNode, { dpub: true });
    if (!role) {
      return false;
    }
    // console.log('\n\n isLandmarkVirtual 1>> ', actualNode.nodeName, role);

    var nodeName = actualNode.nodeName.toUpperCase();
    if (nodeName === 'HEADER' || nodeName === 'FOOTER') {
      var v = isHeaderFooterLandmark(virtualNode);
      // console.log('\n\n isLandmarkVirtual 2>> ', v);
      return v;
    }

    if (nodeName === 'SECTION' || nodeName === 'FORM') {
      var accessibleText = accessibleTextVirtual(virtualNode);
      // console.log('\n\n isLandmarkVirtual 3>> ', !!accessibleText);
      return !!accessibleText;
    }

    var roleType = getRoleType(role);
    // console.log('\n\n isLandmarkVirtual 4>> ', roleType);
    return (
      role === 'region' ||
      roleType === 'landmark' ||
      landmarkRoles.includes(roleType) ||
      landmarkRoles.indexOf(role) >= 0
    );
  }

  return isLandmarkVirtual(virtualNode) && isVisible(node, true);
}

export default landmarkUniqueMatches;

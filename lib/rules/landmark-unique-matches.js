import { isVisibleToScreenReaders } from '../commons/dom';
import { getRole, getRoleType } from '../commons/aria';
import { getAriaRolesByType } from '../commons/standards';
import { accessibleTextVirtual } from '../commons/text';
// import { closest } from '../core/utils';

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

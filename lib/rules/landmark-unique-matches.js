import { isVisibleToScreenReaders } from '../commons/dom';
import { getRole } from '../commons/aria';
import { getAriaRolesByType } from '../commons/standards';
import { accessibleTextVirtual } from '../commons/text';

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

  if (nodeName === 'section' || nodeName === 'form') {
    const accessibleText = accessibleTextVirtual(vNode);
    return !!accessibleText;
  }

  return landmarkRoles.indexOf(role) >= 0 || role === 'region';
}

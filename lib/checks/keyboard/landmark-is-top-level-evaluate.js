import { getRole, implicitRole, getExplicitRole } from '../../commons/aria';
import { getAriaRolesByType } from '../../commons/standards';
import { getComposedParent } from '../../commons/dom';

function landmarkIsTopLevelEvaluate(node) {
  const landmarks = getAriaRolesByType('landmark');
  let parent = getComposedParent(node);
  const nodeRole = getRole(node);

  this.data({ role: nodeRole });

  while (parent) {
    let role = getExplicitRole(parent);
    if (!role && parent.nodeName.toUpperCase() !== 'FORM') {
      role = implicitRole(parent);
    }
    // allow aside inside main
    // @see https://github.com/dequelabs/axe-core/issues/2651
    if (
      role &&
      landmarks.includes(role) &&
      !(role === 'main' && nodeRole === 'complementary')
    ) {
      return false;
    }
    parent = getComposedParent(parent);
  }
  return true;
}

export default landmarkIsTopLevelEvaluate;

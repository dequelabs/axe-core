// DAISY-AXE
import {
  getExplicitRole,
  getSuperClassRole,
  isValidRole
} from '../../commons/aria';
// import { isValidRole, getExplicitRole } from '../../commons/aria';

export default function listitemEvaluate(node, options, virtualNode) {
  const { parent } = virtualNode;
  if (!parent) {
    // Can only happen with detached DOM nodes and roots:
    return undefined;
  }

  const parentNodeName = parent.props.nodeName;
  const parentRole = getExplicitRole(parent);

  if (['presentation', 'none', 'list'].includes(parentRole)) {
    return true;
  }

  if (parentRole && isValidRole(parentRole)) {
    // DAISY-AXE
    const sup = getSuperClassRole(parentRole);
    if (sup && sup.includes('list')) {
      return true;
    }

    this.data({
      messageKey: 'roleNotValid'
    });
    return false;
  }
  return ['ul', 'ol', 'menu'].includes(parentNodeName);
}

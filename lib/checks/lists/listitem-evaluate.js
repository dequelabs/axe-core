import { isValidRole, getExplicitRole, getRole } from '../../commons/aria';

export default function listitemEvaluate(node, options, virtualNode) {
  const { parent } = virtualNode;
  if (!parent) {
    // Can only happen with detached DOM nodes and roots:
    return undefined;
  }

  const parentExplicitRole = getExplicitRole(parent);
  const parentRole = getRole(parent);

  if (['presentation', 'none', 'list'].includes(parentRole)) {
    return true;
  }

  if (parentExplicitRole && isValidRole(parentExplicitRole)) {
    this.data({
      messageKey: 'roleNotValid'
    });
  }
  return false;
}

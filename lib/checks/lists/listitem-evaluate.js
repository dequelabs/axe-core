import { isValidRole, getExplicitRole } from '../../commons/aria';

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
    this.data({
      messageKey: 'roleNotValid'
    });
    return false;
  }
  return ['ul', 'ol', 'menu'].includes(parentNodeName);
}

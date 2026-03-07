import { isValidRole, getExplicitRole } from '../../commons/aria';
import { isShadowRoot } from '../../core/utils';

export default function listitemEvaluate(node, options, virtualNode) {
  const { parent } = virtualNode;
  if (!parent) {
    // Can only happen with detached DOM nodes and roots:
    return undefined;
  }

  const listParent = getListParent(parent);
  if (!listParent) {
    return false;
  }

  const parentRole = getExplicitRole(listParent);

  if (['presentation', 'none', 'list'].includes(parentRole)) {
    return true;
  }

  if (parentRole && isValidRole(parentRole)) {
    this.data({
      messageKey: 'roleNotValid'
    });
    return false;
  }
  return ['ul', 'ol', 'menu'].includes(listParent.props.nodeName);
}

/**
 * Walk up through custom element shadow hosts to find the semantic parent.
 * Custom elements with shadow DOM that wrap <li> are transparent — the
 * real parent is the element above the custom element host.
 */
function getListParent(vNode) {
  let current = vNode;
  while (
    current &&
    current.actualNode &&
    isShadowRoot(current.actualNode) &&
    !getExplicitRole(current) &&
    !['ul', 'ol', 'menu'].includes(current.props.nodeName)
  ) {
    current = current.parent;
  }
  return current || null;
}

import getExplicitRole from '../commons/aria/get-explicit-role';
import { hasConflictResolution } from '../commons/aria/get-role';

export default function summaryIsInteractiveMatches(_, virtualNode) {
  // Summary only interactive if its real DOM parent is a details element
  const parent = virtualNode.parent;
  if (parent.props.nodeName !== 'details' || isSlottedElm(virtualNode)) {
    return false;
  }
  // Only the first summary element is interactive
  const firstSummary = parent.children.find(
    child => child.props.nodeName === 'summary'
  );
  if (firstSummary !== virtualNode) {
    return false;
  }
  const role = getExplicitRole(virtualNode, { fallback: true, dpub: true });
  if (!role) {
    return true;
  }
  return (
    ['none', 'presentation'].includes(role) &&
    hasConflictResolution(virtualNode)
  );
}

function isSlottedElm(vNode) {
  // Normally this wouldn't be enough, but since we know parent is a details
  // element, we can ignore edge cases like slot being the real parent
  const domParent = vNode.actualNode?.parentElement;
  return domParent && domParent !== vNode.parent.actualNode;
}

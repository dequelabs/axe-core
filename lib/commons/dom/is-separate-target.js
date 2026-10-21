import getRoleType from '../aria/get-role-type';
import hasSameDestination from './has-same-destination';
import isFocusable from './is-focusable';
import { contains } from '../../core/utils';

/**
 * Determine whether a nearby element counts as a separate target from vNode:
 * a focusable widget that does not navigate to the same destination.
 * @method isSeparateTarget
 * @memberof axe.commons.dom
 * @param {VirtualNode} vNode
 * @param {VirtualNode} vOther
 * @return {Boolean}
 */
export default function isSeparateTarget(vNode, vOther) {
  return (
    getRoleType(vOther) === 'widget' &&
    isFocusable(vOther) &&
    !hasSameDestination(vNode, vOther) &&
    !isOnlyDescendantOfWidget(vNode, vOther)
  );
}

/**
 * Determine if a widget descendant is the only descendant of another widget, excluding empty text nodes and wrapping elements.
 * @param {VirtualNode} vNode
 * @param {VirtualNode} vOther
 * @return {Boolean}
 */
function isOnlyDescendantOfWidget(vNode, vOther) {
  const ancestor = contains(vNode, vOther)
    ? vNode
    : contains(vOther, vNode)
      ? vOther
      : null;
  const widgetDescendant = ancestor === vNode ? vOther : vNode;

  if (!ancestor) {
    return false;
  }

  let descendant = ancestor;
  while (descendant !== widgetDescendant) {
    const children = descendant.children.filter(node => {
      return node.props.type === 1 || node.props.nodeValue?.trim() !== '';
    });

    if (children.length !== 1) {
      return false;
    }

    descendant = children[0];
  }

  return true;
}

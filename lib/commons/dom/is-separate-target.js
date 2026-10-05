import getRoleType from '../aria/get-role-type';
import hasSameDestination from './has-same-destination';
import isFocusable from './is-focusable';

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
    !hasSameDestination(vNode, vOther)
  );
}

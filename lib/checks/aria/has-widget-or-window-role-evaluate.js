import { getRoleType } from '../../commons/aria';

const acceptedRoles = {
  widget: true,
  composite: true,
  window: true
};

/**
 * Check if an elements `role` attribute uses any widget, composite, window abstract role values.
 *
 * Widget roles are taken from the `ariaRoles` standards object from the roles `type` property.
 *
 * @memberof checks
 * @return {Boolean} True if the element uses a `widget`, `composite`, or `window` abstract role (type). False otherwise.
 */
// # TODO: change to abstract role for widget and window
function hasWidgetOrWindowRoleEvaluate(node) {
  const role = node.getAttribute('role');
  if (role === null) {
    return false;
  }
  return !!acceptedRoles[getRoleType(role)];
}

export default hasWidgetOrWindowRoleEvaluate;

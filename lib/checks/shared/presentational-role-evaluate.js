import { getExplicitRole, getRole, hasAriaValue } from '../../commons/aria';
import { getGlobalAriaAttrs } from '../../commons/standards';
import { isFocusable } from '../../commons/dom';

export default function presentationalRoleEvaluate(node, options, virtualNode) {
  const explicitRole = getExplicitRole(virtualNode);

  // in JAWS, an iframe or frame with an accessible name and a presentational role gets announced
  // as "group" rather than being ignored. aria-label is handled by role-conflict resolution and
  // aria-labelledby only triggers the group role when it's valid (exists and has content)
  if (
    ['presentation', 'none'].includes(explicitRole) &&
    ['iframe', 'frame'].includes(virtualNode.props.nodeName) &&
    virtualNode.hasAttr('title')
  ) {
    this.data({
      messageKey: 'iframe',
      nodeName: virtualNode.props.nodeName
    });
    return false;
  }

  const role = getRole(virtualNode);

  if (['presentation', 'none'].includes(role)) {
    this.data({ role });
    return true;
  }

  // if the user didn't intended to make this presentational we fail
  if (!['presentation', 'none'].includes(explicitRole)) {
    return false;
  }

  // user intended to make this presentational so inform them of
  // problems caused by role conflict resolution
  // use hasAriaValue so a global ARIA attribute supplied via the reflected AOM
  // property or element internals counts, not only the HTML attribute
  const hasGlobalAria = getGlobalAriaAttrs().some(attr =>
    hasAriaValue(virtualNode, attr)
  );
  const focusable = isFocusable(virtualNode);
  let messageKey;

  if (hasGlobalAria && !focusable) {
    messageKey = 'globalAria';
  } else if (!hasGlobalAria && focusable) {
    messageKey = 'focusable';
  } else {
    messageKey = 'both';
  }

  this.data({
    messageKey,
    role
  });
  return false;
}

import { getRole } from '../../commons/aria';
import { isFocusable } from '../../commons/dom';
import { getAriaRolesByType } from '../../commons/standards';

function ariaLabelValidUseEvaluate(node, options, virtualNode) {
  const role = getRole(virtualNode);

  // @see https://developer.paciellogroup.com/blog/2017/07/short-note-on-aria-label-aria-labelledby-and-aria-describedby/
  if (
    isFocusable(virtualNode) ||
    getAriaRolesByType('landmark').includes(role) ||
    getAriaRolesByType('widget').includes(role) ||
    getAriaRolesByType('composite').includes(role) ||
    ['img', 'frame', 'iframe'].includes(virtualNode.props.nodeName)
  ) {
    return true;
  }

  return false;
}

export default ariaLabelValidUseEvaluate;

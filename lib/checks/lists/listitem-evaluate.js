import { getComposedParent } from '../../commons/dom';
import { isValidRole } from '../../commons/aria';

function listitemEvaluate(node, options, virtualNode, context) {
  const parent = getComposedParent(node);
  if (!parent) {
  	// Can only happen with detached DOM nodes and roots:
  	return undefined;
  }

  const parentTagName = parent.nodeName.toUpperCase();
  const parentRole = (parent.getAttribute('role') || '').toLowerCase();

  if (parentRole === 'list') {
  	return true;
  }

  if (parentRole && isValidRole(parentRole)) {
  	this.data('roleNotValid');
  	return false;
  }

  return ['UL', 'OL'].includes(parentTagName);
}

export default listitemEvaluate;
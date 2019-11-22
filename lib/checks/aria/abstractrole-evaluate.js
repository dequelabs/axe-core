import { getRoleType } from '../../commons/aria';

function abstractRoleEvaluate(node, options, virtualNode, context) {
  return getRoleType(node.getAttribute('role')) === 'abstract';
}

export default abstractRoleEvaluate;
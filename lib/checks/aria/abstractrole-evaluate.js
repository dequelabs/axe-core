import { getRoleType } from '../../commons/aria';

function abstractroleEvaluate(node, options, virtualNode, context) {
  return getRoleType(node.getAttribute('role')) === 'abstract';
}

export default abstractroleEvaluate;
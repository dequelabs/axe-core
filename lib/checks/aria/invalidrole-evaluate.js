import { isValidRole } from '../../commons/aria';

function invalidroleEvaluate(node, options, virtualNode, context) {
  return !isValidRole(node.getAttribute('role'), {
  	allowAbstract: true
  });
}

export default invalidroleEvaluate;

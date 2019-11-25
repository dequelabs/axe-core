import { isUnsupportedRole, getRole } from '../../commons/aria';

function unsupportedroleEvaluate(node, options, virtualNode, context) {
  return isUnsupportedRole(getRole(node));
}

export default unsupportedroleEvaluate;
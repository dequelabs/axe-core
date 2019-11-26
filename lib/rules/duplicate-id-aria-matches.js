import { isAccessibleRef } from '../commons/aria';

function duplicateIdAriaMatches(node, virtualNode, context) {
  return isAccessibleRef(node);
}

export default duplicateIdAriaMatches;
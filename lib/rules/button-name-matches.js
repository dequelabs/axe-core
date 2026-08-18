import noExplicitNameRequired from './no-explicit-name-required-matches';
import { isInert } from '../commons/dom';

export default function buttonNameMatches(node, virtualNode) {
  if (isInert(virtualNode)) {
    return false;
  }
  return noExplicitNameRequired(node, virtualNode);
}

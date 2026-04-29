import { isVisibleToScreenReaders } from '../commons/dom';
import { getRoleType } from '../commons/aria';

export default function landmarkUniqueMatches(node, virtualNode) {
  return (
    getRoleType(virtualNode) === 'landmark' &&
    isVisibleToScreenReaders(virtualNode)
  );
}

import { getRoleType } from '../commons/aria';
import { isVisibleToScreenReaders } from '../commons/dom';

export default function landmarkUniqueMatches(node, virtualNode) {
  return (
    getRoleType(virtualNode) === 'landmark' &&
    isVisibleToScreenReaders(virtualNode)
  );
}

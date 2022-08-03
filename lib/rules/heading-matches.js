import { getRole } from '../commons/aria';

export default function headingMatches(node, virtualNode) {
  return getRole(virtualNode) === 'heading';
}

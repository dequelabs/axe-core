import { getRole } from '../commons/aria';

export default function headingMatches(virtualNode) {
  return getRole(virtualNode) === 'heading';
}

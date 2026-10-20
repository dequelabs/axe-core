import { getRole } from '../commons/aria';

export default function listMatches(node, virtualNode) {
  return getRole(virtualNode, { fallback: true }) === 'list';
}

import { getRole } from '../commons/aria';

export default function tableOrGridRoleMatches(_, vNode) {
  const role = getRole(vNode);
  return ['treegrid', 'grid', 'table'].includes(role);
}

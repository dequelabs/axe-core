function noRoleMatches(node, vNode) {
  return !vNode.attr('role');
}

export default noRoleMatches;

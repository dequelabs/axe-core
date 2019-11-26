function noRoleMatches(node, virtualNode, context) {
  return !node.getAttribute('role');
}

export default noRoleMatches;

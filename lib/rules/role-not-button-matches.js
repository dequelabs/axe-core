function roleNotButtonMatches(node, virtualNode, context) {
  return node.getAttribute('role') !== 'button';
}

export default roleNotButtonMatches;

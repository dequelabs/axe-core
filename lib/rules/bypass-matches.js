function bypassMatches(node, virtualNode, context) {
  return !!node.querySelector('a[href]');
}

export default bypassMatches;
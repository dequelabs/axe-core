function noNegativeTabindexMatches(node, virtualNode) {
  const tabindex = parseInt(virtualNode.attr('tabindex'), 10);
  return isNaN(tabindex) || tabindex >= 0;
}

export default noNegativeTabindexMatches;

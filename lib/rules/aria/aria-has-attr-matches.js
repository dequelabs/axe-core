function ariaHasAttrMatches(node, virtualNode) {
  const aria = /^aria-/;

  return virtualNode.attrNames.some(attr => {
    return aria.test(attr);
  });
}

export default ariaHasAttrMatches;

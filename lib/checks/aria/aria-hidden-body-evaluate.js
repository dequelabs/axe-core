function ariaHiddenBodyEvaluate(node, options, virtualNode, context) {
  return node.getAttribute('aria-hidden') !== 'true';
}

export default ariaHiddenBodyEvaluate;
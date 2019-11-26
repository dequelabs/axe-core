function rolePresentationEvaluate(node, options, virtualNode, context) {
  return node.getAttribute('role') === 'presentation';
}

export default rolePresentationEvaluate;
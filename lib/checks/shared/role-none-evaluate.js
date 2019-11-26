function roleNoneEvaluate(node, options, virtualNode, context) {
  return node.getAttribute('role') === 'none';
}

export default roleNoneEvaluate;
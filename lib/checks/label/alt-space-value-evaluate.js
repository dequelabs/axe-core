function altSpaceValueEvaluate(node, options, virtualNode, context) {
  const validAttrValue = /^\s+$/.test(node.getAttribute('alt'));
  return node.hasAttribute('alt') && validAttrValue;
}

export default altSpaceValueEvaluate;
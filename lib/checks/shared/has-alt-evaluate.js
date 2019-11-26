function hasAltEvaluate(node, options, virtualNode, context) {
  var nn = node.nodeName.toLowerCase();
  return (
  	node.hasAttribute('alt') && (nn === 'img' || nn === 'input' || nn === 'area')
  );
}

export default hasAltEvaluate;
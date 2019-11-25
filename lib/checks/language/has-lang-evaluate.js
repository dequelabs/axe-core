function hasLangEvaluate(node, options, virtualNode, context) {
  return !!(
  	node.getAttribute('lang') ||
  	node.getAttribute('xml:lang') ||
  	''
  ).trim();
}

export default hasLangEvaluate;
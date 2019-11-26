function notHtmlMatches(node, virtualNode, context) {
  return node.nodeName.toLowerCase() !== 'html';
}

export default notHtmlMatches;

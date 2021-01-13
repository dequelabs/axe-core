function notHtmlMatches(node, virtualNode) {
  return virtualNode.props.nodeName.toLowerCase() !== 'html';
}

export default notHtmlMatches;

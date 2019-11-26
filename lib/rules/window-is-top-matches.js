function windowIsTopMatches(node, virtualNode, context) {
  return (
  	node.ownerDocument.defaultView.self === node.ownerDocument.defaultView.top
  );
}

export default windowIsTopMatches;
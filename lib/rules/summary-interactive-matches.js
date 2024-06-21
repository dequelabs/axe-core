import { hasContentVirtual } from '../commons/dom';

export default function summaryIsInteractiveMatches(_, virtualNode) {
  // Summary only interactive if its real DOM parent is a details element
  const parent = virtualNode.parent;
  if (
    parent.props.nodeName !== 'details' ||
    virtualNode.shadowId !== parent.shadowId
  ) {
    return false;
  }
  if (!hasDetailsContent(parent)) {
    return false;
  }
  // Only the first summary element is interactive
  const firstSummary = parent.children.find(
    child => child.props.nodeName === 'summary'
  );
  if (firstSummary !== virtualNode) {
    return false;
  }
  return true;
}

function hasDetailsContent(vDetails) {
  let summary = false;
  for (const vNode of vDetails.children) {
    const { nodeType, nodeValue } = vNode.props;
    // Skip the first summary elm
    if (!summary && vNode.props.nodeName === 'summary') {
      summary = true;
      continue;
    }
    // True for elements with content
    if (nodeType === document.ELEMENT_NODE && hasContentVirtual(vNode)) {
      return true;
    }
    // True for text nodes
    if (nodeType === document.TEXT_NODE && nodeValue.trim()) {
      return true;
    }
  }
  return false;
}

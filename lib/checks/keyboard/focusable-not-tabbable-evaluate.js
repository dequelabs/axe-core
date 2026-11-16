import { isModalOpen, isVisibleOnScreen } from '../../commons/dom';

function focusableNotTabbableEvaluate(node, options, virtualNode) {
  const elementsThatCanBeDisabled = [
    'button',
    'fieldset',
    'input',
    'select',
    'textarea'
  ];

  const tabbableElements = virtualNode.tabbableElements;

  if (!tabbableElements || !tabbableElements.length) {
    return true;
  }

  const relatedNodes = tabbableElements.filter(vNode => {
    return !elementsThatCanBeDisabled.includes(vNode.props.nodeName);
  });

  this.relatedNodes(relatedNodes.map(vNode => vNode.actualNode));

  if (relatedNodes.length === 0 || isModalOpen()) {
    return true;
  }

  return relatedNodes.every(vNode => {
    const pointerEvents = vNode.getComputedStylePropertyValue('pointer-events');
    const width = parseInt(vNode.getComputedStylePropertyValue('width'));
    const height = parseInt(vNode.getComputedStylePropertyValue('height'));

    return (
      vNode.actualNode.onfocus ||
      ((width === 0 || height === 0) && pointerEvents === 'none') ||
      isHiddenFocusGuard(vNode)
    );
  })
    ? undefined
    : false;
}

/**
 * Determine if an element looks like a focus guard: an empty element
 * that is visually hidden, such as the ones floating-ui and similar
 * libraries use to redirect focus with event listeners.
 * @param {VirtualNode} vNode
 * @return {Boolean}
 */
function isHiddenFocusGuard(vNode) {
  // area elements have no box of their own
  if (vNode.props.nodeName === 'area') {
    return false;
  }

  const hasContent = vNode.children.some(
    child => child.props.nodeType === 1 || child.props.nodeValue?.trim()
  );
  if (hasContent) {
    return false;
  }

  const { width, height } = vNode.boundingClientRect;
  return width <= 1 || height <= 1 || !isVisibleOnScreen(vNode);
}

export default focusableNotTabbableEvaluate;

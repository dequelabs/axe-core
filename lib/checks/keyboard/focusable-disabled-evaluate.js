import { isModalOpen } from '../../commons/dom';
import { getNodeFromTree } from '../../core/utils';

function focusableDisabledEvaluate(node, options, virtualNode) {
  const elementsThatCanBeDisabled = [
    'BUTTON',
    'FIELDSET',
    'INPUT',
    'SELECT',
    'TEXTAREA'
  ];

  const tabbableElements = virtualNode.tabbableElements;

  if (!tabbableElements || !tabbableElements.length) {
    return true;
  }

  const relatedNodes = tabbableElements.reduce((out, { actualNode: el }) => {
    const nodeName = el.nodeName.toUpperCase();
    // populate nodes that can be disabled
    if (elementsThatCanBeDisabled.includes(nodeName)) {
      out.push(el);
    }
    return out;
  }, []);

  this.relatedNodes(relatedNodes);

  if (relatedNodes.length === 0 || isModalOpen()) {
    return true;
  }
  return relatedNodes.every(related => {
    const vNode = getNodeFromTree(related);
    const pointerEvents = vNode.getComputedStylePropertyValue('pointer-events');
    const width = vNode.getComputedStylePropertyValue('width');
    const height = vNode.getComputedStylePropertyValue('height');

    return (
      related.onfocus ||
      ((width === 0 || height === 0) && pointerEvents === 'none')
    );
  })
    ? undefined
    : false;
}

export default focusableDisabledEvaluate;

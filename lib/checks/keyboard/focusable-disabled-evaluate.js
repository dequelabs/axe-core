import { isModalOpen } from '../../commons/dom';

function focusableDisabledEvaluate(node, options, virtualNode) {
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
    return elementsThatCanBeDisabled.includes(vNode.props.nodeName);
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
      ((width === 0 || height === 0) && pointerEvents === 'none')
    );
  })
    ? undefined
    : false;
}

export default focusableDisabledEvaluate;

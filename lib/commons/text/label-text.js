import accessibleTextVirtual from './accessible-text-virtual';
import accessibleText from './accessible-text';
import findElmsInContext from '../dom/find-elms-in-context';
import { closest, nodeSorter } from '../../core/utils';

/**
 * Return accessible text for an implicit and/or explicit HTML label element
 * @param {VirtualNode} element
 * @param {Object} context
 * @property {Bool} inControlContext
 * @property {Bool} inLabelledByContext
 * @return {String} Label text
 */
function labelText(virtualNode, context = {}) {
  const { alreadyProcessed } = accessibleTextVirtual;
  if (
    context.inControlContext ||
    context.inLabelledByContext ||
    alreadyProcessed(virtualNode, context)
  ) {
    return '';
  }
  if (!context.startNode) {
    context.startNode = virtualNode;
  }

  const labelContext = { inControlContext: true, ...context };
  const explicitLabels = getExplicitLabels(virtualNode);
  const implicitLabel = closest(virtualNode, 'label');

  let labels;
  if (implicitLabel) {
    // Avoid duplicates when the implicit label is already included in
    // explicitLabels (e.g. form-associated custom elements whose
    // `actualNode.labels` NodeList contains both explicit and implicit
    // labels).
    if (explicitLabels.includes(implicitLabel.actualNode)) {
      labels = explicitLabels;
    } else {
      labels = [...explicitLabels, implicitLabel.actualNode];
      labels.sort(nodeSorter);
    }
  } else {
    labels = explicitLabels;
  }

  return labels
    .map(label => accessibleText(label, labelContext))
    .filter(text => text !== '')
    .join(' ');
}

/**
 * Find a non-ARIA label for an element
 * @private
 * @param {VirtualNode} element The VirtualNode instance whose label we are seeking
 * @return {HTMLElement[]} The label elements, or an empty array if none are found
 */
function getExplicitLabels(virtualNode) {
  // Form-associated custom elements expose a `labels` NodeList via
  // ElementInternals. Use it directly when available. We only check
  // custom elements (names with hyphens) to avoid changing the
  // existing behavior for native form controls.
  if (
    virtualNode.props.nodeName.includes('-') &&
    virtualNode.actualNode?.labels?.length
  ) {
    return Array.from(virtualNode.actualNode.labels);
  }

  if (!virtualNode.attr('id')) {
    return [];
  }

  if (!virtualNode.actualNode) {
    throw new TypeError(
      'Cannot resolve explicit label reference for non-DOM nodes'
    );
  }

  return findElmsInContext({
    elm: 'label',
    attr: 'for',
    value: virtualNode.attr('id'),
    context: virtualNode.actualNode
  });
}

export default labelText;

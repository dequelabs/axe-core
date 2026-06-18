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

  // Form-associated custom elements expose their associated labels (both
  // explicit `for=` and implicit wrapping) via ElementInternals. When present,
  // that list is the authoritative, complete set, so use it directly instead
  // of resolving labels from the DOM.
  const internals = virtualNode.elementInternals;
  if (internals) {
    try {
      // `labels` throws on custom elements that aren't form-associated
      const internalLabels = Array.from(internals.labels);
      return internalLabels
        .map(label => accessibleText(label, labelContext))
        .filter(text => text !== '')
        .join(' ');
    } catch {
      // not a form-associated custom element; fall through to DOM resolution
    }
  }

  const explicitLabels = getExplicitLabels(virtualNode);
  const implicitLabel = closest(virtualNode, 'label');

  let labels;
  if (implicitLabel) {
    labels = [...explicitLabels, implicitLabel.actualNode];
    labels.sort(nodeSorter);
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
 * @return {HTMLElement} The label element, or null if none is found
 */
function getExplicitLabels(virtualNode) {
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

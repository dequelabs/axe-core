import { isMultiline } from '../../commons/dom';
import { visibleVirtual } from '../../commons/text';

const MAX_RELATED_NODES = 5;

/**
 * Check if a CSS property, !important or not is within an allowed range, for
 * each visible text that gets the property from the element. Text is measured
 * against its own font-size, and skipped when an element between it and this
 * one declares the property again.
 * @param {HTMLElement} node
 * @param {Object} options
 * @param {VirtualNode} virtualNode
 * @return {Boolean|undefined}
 */
export default function inlineStyleProperty(node, options, virtualNode) {
  const {
    cssProperty,
    absoluteValues,
    minValue,
    maxValue,
    normalValue = 0,
    noImportant,
    multiLineOnly
  } = options;
  if (
    !noImportant &&
    node.style.getPropertyPriority(cssProperty) !== `important`
  ) {
    return true;
  }

  const data = {};
  if (typeof minValue === 'number') {
    data.minValue = minValue;
  }
  if (typeof maxValue === 'number') {
    data.maxValue = maxValue;
  }

  // These do not set the actual value to important, instead they
  // say that it is important to use the inherited / root value.
  // The actual value can still be modified
  const declaredPropValue = node.style.getPropertyValue(cssProperty);
  if (
    ['inherit', 'unset', 'revert', 'revert-layer'].includes(declaredPropValue)
  ) {
    this.data({ value: declaredPropValue, ...data });
    return true;
  }

  const measured = getTextContainers(virtualNode, cssProperty)
    .filter(container => !multiLineOnly || isMultiline(container.actualNode))
    .map(container => ({
      container,
      value: getNumberValue(container.actualNode, {
        absoluteValues,
        cssProperty,
        normalValue
      })
    }));
  if (measured.length === 0) {
    return true;
  }

  const failed = measured.filter(
    ({ value }) =>
      typeof value === 'number' &&
      !(
        (typeof minValue !== 'number' || value >= minValue) &&
        (typeof maxValue !== 'number' || value <= maxValue)
      )
  );
  if (failed.length > 0) {
    const related = failed
      .map(({ container }) => container)
      .filter(container => container !== virtualNode);
    this.data({
      value: failed[0].value,
      ...data,
      ...(related.length > MAX_RELATED_NODES && { messageKey: 'omitted' })
    });
    this.relatedNodes(
      related.slice(0, MAX_RELATED_NODES).map(({ actualNode }) => actualNode)
    );
    return false;
  }

  const notNumber = measured.find(({ value }) => typeof value !== 'number');
  if (notNumber) {
    this.data({ value: notNumber.value, ...data });
    return undefined; // Renderer did something it shouldn't
  }
  this.data({ value: measured[0].value, ...data });
  return true;
}

/**
 * Get the elements with visible text of their own that get the property from
 * the element, in document order
 * @param {VirtualNode} vNode
 * @param {String} cssProperty
 * @return {VirtualNode[]}
 */
function getTextContainers(vNode, cssProperty) {
  const containers = [];
  if (visibleVirtual(vNode, false, true) !== '') {
    containers.push(vNode);
  }
  for (const child of vNode.children) {
    if (child.props.nodeType === 1 && !redeclares(child, cssProperty)) {
      containers.push(...getTextContainers(child, cssProperty));
    }
  }
  return containers;
}

/**
 * @param {VirtualNode} vNode
 * @param {String} cssProperty
 * @return {Boolean} Whether the style attribute gives the property a value of
 *   its own, and does not take the one of the parent
 */
function redeclares({ actualNode }, cssProperty) {
  const value = actualNode.style.getPropertyValue(cssProperty);
  return value !== '' && value !== 'inherit' && value !== 'unset';
}

function getNumberValue(domNode, { cssProperty, absoluteValues, normalValue }) {
  const computedStyle = window.getComputedStyle(domNode);
  const cssPropValue = computedStyle.getPropertyValue(cssProperty);
  if (cssPropValue === 'normal') {
    return normalValue;
  }
  const parsedValue = parseFloat(cssPropValue);
  if (absoluteValues) {
    return parsedValue;
  }

  const fontSize = parseFloat(computedStyle.getPropertyValue('font-size'));
  // Make the value relative to the font-size
  const value = Math.round((parsedValue / fontSize) * 100) / 100;
  if (isNaN(value)) {
    return cssPropValue; // Something went wrong, return the string instead
  }
  return value;
}

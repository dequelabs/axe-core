import { isMultiline } from '../../commons/dom';
import { visibleVirtual } from '../../commons/text';

const MAX_RELATED_NODES = 5;

/**
 * Check if a CSS property, !important or not is within an allowed range, for
 * each visible text that gets the property from the element. Text is measured
 * against its own font-size, and skipped when it, or an element between it and
 * this one, declares the property again.
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

  let firstValue;
  let notNumber;
  let failedValue;
  const related = [];
  walkTextContainers(virtualNode, virtualNode, cssProperty, container => {
    if (multiLineOnly && !isMultiline(container.actualNode)) {
      return false;
    }
    const value = getNumberValue(container, {
      absoluteValues,
      cssProperty,
      normalValue
    });
    if (firstValue === undefined) {
      firstValue = value;
    }
    if (typeof value !== 'number') {
      notNumber = notNumber === undefined ? value : notNumber;
      return false;
    }
    if (
      (typeof minValue !== 'number' || value >= minValue) &&
      (typeof maxValue !== 'number' || value <= maxValue)
    ) {
      return false;
    }
    failedValue = failedValue === undefined ? value : failedValue;
    if (container !== virtualNode) {
      related.push(container.actualNode);
    }
    // One more than can be listed is enough to pick the `omitted` message
    return related.length > MAX_RELATED_NODES;
  });

  if (failedValue !== undefined) {
    this.data({
      value: failedValue,
      ...data,
      ...(related.length > MAX_RELATED_NODES && { messageKey: 'omitted' })
    });
    this.relatedNodes(related.slice(0, MAX_RELATED_NODES));
    return false;
  }
  if (firstValue === undefined) {
    return true;
  }
  if (notNumber !== undefined) {
    this.data({ value: notNumber, ...data });
    return undefined; // Renderer did something it shouldn't
  }
  this.data({ value: firstValue, ...data });
  return true;
}

/**
 * Call the callback with the elements that have visible text of their own and
 * get the property from the target, in document order, until it returns true
 * @param {VirtualNode} vNode
 * @param {VirtualNode} target The element with the property in its style attribute
 * @param {String} cssProperty
 * @param {Function} callback Gets a VirtualNode, returns true to stop the walk
 * @return {Boolean} Whether the callback stopped the walk
 */
function walkTextContainers(vNode, target, cssProperty, callback) {
  if (visibleVirtual(vNode, false, true) !== '') {
    // The value of a stylesheet is not the one of the style attribute. What
    // is below an element with another value gets it from there instead
    if (vNode !== target && !inheritsValue(vNode, target, cssProperty)) {
      return false;
    }
    if (callback(vNode)) {
      return true;
    }
  }
  return vNode.children.some(
    child =>
      child.props.nodeType === 1 &&
      !redeclares(child, cssProperty) &&
      walkTextContainers(child, target, cssProperty, callback)
  );
}

/**
 * @param {VirtualNode} vNode
 * @param {VirtualNode} target
 * @param {String} cssProperty
 * @return {Boolean} Whether the element has the value the target passes down.
 *   A stylesheet that gives the same value as the inherited one can not be told
 *   apart from inheritance, and is taken for it
 */
function inheritsValue(vNode, target, cssProperty) {
  const value = vNode.getComputedStylePropertyValue(cssProperty);
  if (value === target.getComputedStylePropertyValue(cssProperty)) {
    return true;
  }
  // A number without a unit is inherited as it is, so its length follows the
  // font-size of the element
  const declared = target.actualNode.style.getPropertyValue(cssProperty);
  if (!/^(\d+\.?\d*|\.\d+)$/.test(declared)) {
    return false;
  }
  const fontSize = parseFloat(vNode.getComputedStylePropertyValue('font-size'));
  return (
    Math.round((parseFloat(value) / fontSize) * 100) ===
    Math.round(parseFloat(declared) * 100)
  );
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

/**
 * @param {VirtualNode} vNode
 * @param {Object} options
 * @param {String} options.cssProperty
 * @param {Boolean} [options.absoluteValues] Do not make the value relative to the font-size
 * @param {Number} options.normalValue Value to use for `normal`
 * @return {Number|String} The value, or the computed string if it is no number
 */
function getNumberValue(vNode, { cssProperty, absoluteValues, normalValue }) {
  const cssPropValue = vNode.getComputedStylePropertyValue(cssProperty);
  if (cssPropValue === 'normal') {
    return normalValue;
  }
  const parsedValue = parseFloat(cssPropValue);
  if (absoluteValues) {
    return parsedValue;
  }

  const fontSize = parseFloat(vNode.getComputedStylePropertyValue('font-size'));
  // Make the value relative to the font-size
  const value = Math.round((parsedValue / fontSize) * 100) / 100;
  if (isNaN(value)) {
    return cssPropValue; // Something went wrong, return the string instead
  }
  return value;
}

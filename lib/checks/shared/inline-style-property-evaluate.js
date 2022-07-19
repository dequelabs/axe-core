import { getLineCount } from '../../commons/text';

/**
 * Check if a CSS property 
 */
export default function inlineStyleProperty(node, options) {
  const {
    cssProperty,
    absoluteValues,
    minValue,
    maxValue,
    noImportant,
    multiLineOnly
  } = options;
  if (!noImportant && node.style.getPropertyPriority(cssProperty) !== `important`) {
    return true; // style attribute does not use !important
  }
  if (multiLineOnly && getLineCount(node) <= 1) {
    return true; // Ignore line-height for single line texts
  }

  const data = {}
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
  if (['inherit', 'unset'].includes(declaredPropValue)) {
    this.data({ value: declaredPropValue, ...data });
    return true;
  }

  const value = getNumberValue(node, { absoluteValues, cssProperty });
  this.data({ value, ...data });
  if (typeof value !== 'number') {
    return undefined; // Renderer did something it shouldn't
  }

  if (
    (typeof minValue !== 'number' && typeof maxValue !== 'number') ||
    (typeof minValue === 'number' && value < minValue) || 
    (typeof maxValue === 'number' && value > maxValue)
  ) {
    return false;
  }
  return true;
}

function getNumberValue(domNode, { cssProperty, absoluteValues }) {
  const computedStyle = window.getComputedStyle(domNode);
  const cssPropValue = computedStyle.getPropertyValue(cssProperty);
  if (cssPropValue === 'normal') {
    return 0;
  }
  const parsedValue = parseFloat(cssPropValue);
  if (absoluteValues) {
    return parsedValue;
  }
  const fontSize = parseFloat(computedStyle.getPropertyValue('font-size'));
  // Make the value relative to the font-size
  const value = Math.round(parsedValue / fontSize * 100) / 100;
  if (isNaN(value)) {
    return cssPropValue; // Something went wrong, return the string instead
  }
  return value;
}

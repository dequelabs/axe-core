import { getLineCount } from '../../commons/text';

/**
 * Check if a CSS property 
 */
export default function inlineCssPropertyEvaluate(node, options) {
  const { cssProperty, minValue } = options;
  if (node.style.getPropertyPriority(cssProperty) !== `important`) {
    return true; // style attribute does not use !important
  }
  if (options.multiLineOnly && getLineCount(node) <= 1) {
    return true; // Ignore line-height for single line texts
  }

  // These do not set the actual value to important, instead they
  // say that it is important to use the inherited / root value.
  // The actual value can still be modified
  const declaredPropValue = node.style.getPropertyValue(cssProperty)
  if (['inherit', 'unset'].includes(declaredPropValue)) {
    this.data({ value: declaredPropValue });
    return true;
  }

  const value = getNumberValue(cssProperty, node);
  this.data({ value });
  if (typeof value !== 'number') {
    return undefined; // Renderer did something it shouldn't
  }
  if (typeof minValue !== 'number') {
    return false; // @TODO: Add test
  }
  return value >= minValue;
}

function getNumberValue(cssProperty, domNode) {
  const computedStyle = window.getComputedStyle(domNode);
  const cssPropValue = computedStyle.getPropertyValue(cssProperty);
  if (cssPropValue === 'normal') {
    return 0;
  }
  const parsedValue = parseFloat(cssPropValue);
  const fontSize = parseFloat(computedStyle.getPropertyValue('font-size'));
  // Make the value relative to the font-size
  const value = Math.round(parsedValue / fontSize * 100) / 100;
  if (isNaN(value)) {
    return cssPropValue; // Something went wrong, return the string instead
  }
  return value;
}

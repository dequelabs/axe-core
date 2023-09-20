import Color from './color';
import { sanitize } from '../text';
import { getComposedParent } from '../dom';

/**
 * Determine if the text content of two nodes is styled in a way that they can be distinguished without relying on color
 * @method elementIsDistinct
 * @memberof axe.commons.color
 * @instance
 * @param  {HTMLElement} node The element to check
 * @param  {HTMLElement} ancestorNode The ancestor node element to check
 * @return {Boolean}
 */
export default function elementIsDistinct(node, ancestorNode) {
  const nodeStyle = window.getComputedStyle(node);

  const ancestorStyle = window.getComputedStyle(ancestorNode);
  let curNode = node;
  while (curNode !== ancestorNode) {
    const curNodeStyle = window.getComputedStyle(curNode);

    // Check if the link has a background
    if (curNodeStyle.getPropertyValue('background-image') !== 'none') {
      return true;
    }

    if (
      hasDifferentText(node, curNode) ||
      hasVisibleBorder(curNodeStyle) ||
      hasVisibleTextDecortation(curNodeStyle, ancestorStyle)
    ) {
      return true;
    }

    curNode = getComposedParent(curNode);
  }

  // font styles are inherited so we only need to check
  // the target node
  if (getFonts(nodeStyle)[0] !== getFonts(ancestorStyle)[0]) {
    return true;
  }

  let hasStyle = ['font-weight', 'font-style', 'font-size'].some(cssProp => {
    return (
      nodeStyle.getPropertyValue(cssProp) !==
      ancestorStyle.getPropertyValue(cssProp)
    );
  });

  const tDec = nodeStyle.getPropertyValue('text-decoration');
  if (tDec.split(' ').length < 3) {
    // old style CSS text decoration
    hasStyle =
      hasStyle || tDec !== ancestorStyle.getPropertyValue('text-decoration');
  }

  return hasStyle;
}

/**
 * Creates a string array of fonts for given CSSStyleDeclaration object
 * @private
 * @param {Object} style CSSStyleDeclaration object
 * @return {Array}
 */
function getFonts(style) {
  return style
    .getPropertyValue('font-family')
    .split(/[,;]/g)
    .map(font => {
      return font.trim().toLowerCase();
    });
}

function hasDifferentText(node, ancestorNode) {
  // 3 is an arbitrary number that helps account for punctuation
  // and emoji that takes up two characters
  return ancestorNode.textContent
    .split(node.textContent)
    .some(text => sanitize(text).length > 3);
}

function hasVisibleBorder(nodeStyle) {
  // Check if the link has a border or outline
  return ['border-bottom', 'border-top', 'outline'].some(edge => {
    const borderClr = new Color();
    borderClr.parseString(nodeStyle.getPropertyValue(edge + '-color'));

    // Check if a border/outline was specified
    return (
      nodeStyle.getPropertyValue(edge + '-style') !== 'none' &&
      parseFloat(nodeStyle.getPropertyValue(edge + '-width')) > 0 &&
      borderClr.alpha !== 0
    );
  });
}

function hasVisibleTextDecortation(nodeStyle, ancestorStyle) {
  // Check if the link has text-decoration styles
  return ['text-decoration-line', 'text-decoration-style'].some(cssProp => {
    const ancestorValue = ancestorStyle.getPropertyValue(cssProp);
    const nodeValue = nodeStyle.getPropertyValue(cssProp);

    /*
        For logic purposes we can treat the target node and all inline ancestors as a single logic point since if any of them define a text-decoration style it will visually apply that style to the target.

        A target node is distinct if it defines a text-decoration and either the ancestor does not define one or the target's text-decoration is different than the ancestor. A target that does not define a text-decoration can never be distinct from the ancestor.
      */
    return (
      nodeValue !== 'none' &&
      (ancestorValue === 'none' || nodeValue !== ancestorValue)
    );
  });
}

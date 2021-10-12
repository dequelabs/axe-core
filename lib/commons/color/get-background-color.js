import incompleteData from './incomplete-data';
import getBackgroundStack from './get-background-stack';
import getOwnBackgroundColor from './get-own-background-color';
import elementHasImage from './element-has-image';
import Color from './color';
import flattenColors from './flatten-colors';
import flattenShadowColors from './flatten-shadow-colors';
import getTextShadowColors from './get-text-shadow-colors';
import visuallyContains from '../dom/visually-contains';

/**
 * Determine if element is partially overlapped, triggering a Can't Tell result
 * @private
 * @param {Element} elm
 * @param {Element} bgElm
 * @param {Object} bgColor
 * @return {Boolean}
 */
function elmPartiallyObscured(elm, bgElm, bgColor) {
  var obscured =
    elm !== bgElm && !visuallyContains(elm, bgElm) && bgColor.alpha !== 0;
  if (obscured) {
    incompleteData.set('bgColor', 'elmPartiallyObscured');
  }
  return obscured;
}

/**
 * Returns background color for element
 * Uses getBackgroundStack() to get all elements rendered underneath the current element,
 * to help determine the composite background color.
 *
 * @method getBackgroundColor
 * @memberof axe.commons.color
 * @param	{Element} elm Element to determine background color
 * @param	{Array}   [bgElms=[]] elements to inspect
 * @param	{Number}  shadowOutlineEmMax Thickness of `text-shadow` at which it becomes a background color
 * @returns {Color}
 */
function getBackgroundColor(elm, bgElms = [], shadowOutlineEmMax = 0.1) {
  let bgColors = getTextShadowColors(elm, { minRatio: shadowOutlineEmMax });
  if (bgColors.length) {
    bgColors = [bgColors.reduce(flattenShadowColors)];
  }
  const elmStack = getBackgroundStack(elm);

  // Search the stack until we have an alpha === 1 background
  (elmStack || []).some(bgElm => {
    const bgElmStyle = window.getComputedStyle(bgElm);

    // Get the background color
    const bgColor = getOwnBackgroundColor(bgElmStyle);

    if (
      // abort if a node is partially obscured and obscuring element has a background
      elmPartiallyObscured(elm, bgElm, bgColor) ||
      // OR if the background elm is a graphic
      elementHasImage(bgElm, bgElmStyle)
    ) {
      bgColors = null;
      bgElms.push(bgElm);

      return true;
    }

    if (bgColor.alpha !== 0) {
      // store elements contributing to the br color.
      bgElms.push(bgElm);
      bgColors.unshift(bgColor);

      // Exit if the background is opaque
      return bgColor.alpha === 1;
    } else {
      return false;
    }
  });

  if (bgColors === null || elmStack === null) {
    return null;
  }

  // Body can sometimes appear out of order in the stack:
  //   1) Body is not the first element due to negative z-index elements
  //   2) Elements are positioned outside of body's rect coordinates
  //      (see https://github.com/dequelabs/axe-core/issues/1456)
  // In those instances we want to reinsert body back into the element stack
  // when not using the root document element as the html canvas for bgcolor
  if (elmStack.indexOf(document.body) === -1) {
    // if the html element defines a bgColor and body defines a
    // bgColor but its height is not the full viewport, then the html
    // bgColor fills the full viewport and body bgColor only fills to
    // its size. however, if the html element does not define a
    // bgColor, then the body bgColor fills the full viewport. so if
    // the body wasn't added to the elmStack, we need to know which
    // bgColor to get (html or body)
    const html = document.documentElement;
    const body = document.body;
    const htmlStyle = window.getComputedStyle(html);
    const bodyStyle = window.getComputedStyle(body);
    const htmlBgColor = getOwnBackgroundColor(htmlStyle);
    const bodyBgColor = getOwnBackgroundColor(bodyStyle);
    const bodyBgColorApplies = bodyBgColor && visuallyContains(elm, body);

    if (
      (!htmlBgColor && bodyBgColorApplies) ||
      (bodyBgColorApplies && bodyBgColorApplies.alpha !== 1)
    ) {
      bgColors.unshift(bodyBgColor);
    }

    if (
      htmlBgColor &&
      (!bodyBgColorApplies || (bodyBgColorApplies && bodyBgColor.alpha !== 1))
    ) {
      bgColors.unshift(htmlBgColor);
    }
  }

  // Mix the colors together, on top of a default white. Colors must be mixed
  // in bottom up order (background to foreground order) to produce the correct
  // result.
  // @see https://github.com/dequelabs/axe-core/issues/2924
  bgColors.unshift(new Color(255, 255, 255, 1));
  var colors = bgColors.reduce((bgColor, fgColor) => {
    return flattenColors(fgColor, bgColor);
  });
  return colors;
}

export default getBackgroundColor;

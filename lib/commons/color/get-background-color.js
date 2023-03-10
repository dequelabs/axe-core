import incompleteData from './incomplete-data';
import getBackgroundStack from './get-background-stack';
// import getOwnBackgroundColor from './get-own-background-color';
import elementHasImage from './element-has-image';
import Color from './color';
import flattenColors from './flatten-colors';
import flattenShadowColors from './flatten-shadow-colors';
import getTextShadowColors from './get-text-shadow-colors';
import getVisibleChildTextRects from '../dom/get-visible-child-text-rects';
import { getNodeFromTree } from '../../core/utils';

/**
 * Returns background color for element
 * Uses getBackgroundStack() to get all elements rendered underneath the current element,
 * to help determine the composite background color.
 *
 * @method getBackgroundColor
 * @memberof axe.commons.color
 * @param  {Element} elm Element to determine background color
 * @param  {Array}   [bgElms=[]] elements to inspect
 * @param  {Number}  shadowOutlineEmMax Thickness of `text-shadow` at which it becomes a background color
 * @returns {Color}
 */
export default function getBackgroundColor(
  elm,
  bgElms = [],
  shadowOutlineEmMax = 0.1
) {
  const vNode = getNodeFromTree(elm);
  const bgColorCache = vNode._cache.getBackgroundColor;

  if (bgColorCache) {
    bgElms.push(...bgColorCache.bgElms);
    incompleteData.set('bgColor', bgColorCache.incompleteData);
    return bgColorCache.bgColor;
  }

  const bgColor = _getBackgroundColor(elm, bgElms, shadowOutlineEmMax);

  vNode._cache.getBackgroundColor = {
    bgColor,
    bgElms,
    incompleteData: incompleteData.get('bgColor')
  };

  return bgColor;
}

function _getBackgroundColor(elm, bgElms, shadowOutlineEmMax) {
  let bgColors = getTextShadowColors(elm, { minRatio: shadowOutlineEmMax });
  if (bgColors.length) {
    bgColors = [bgColors.reduce(flattenShadowColors)];
  }

  const elmStack = getBackgroundStack(elm);
  if (elmStack === null) {
    return null;
  }

  const textRects = getVisibleChildTextRects(elm);
  const stackingContext = [];
  const contextMap = new Map();

  if (window.DEBUG) {
    console.log(
      JSON.stringify(
        elmStack.map(node => node.cloneNode().outerHTML),
        null,
        2
      )
    );
  }

  // Search the stack until we have an alpha === 1 background
  for (let i = 0; i < elmStack.length; i++) {
    const bgElm = elmStack[i];
    const bgElmStyle = window.getComputedStyle(bgElm);

    if (elementHasImage(bgElm, bgElmStyle)) {
      bgElms.push(bgElm);
      if (window.DEBUG) {
        console.log('elementHasImage');
      }
      return null;
    }

    // ignore fully transparent backgrounds
    const bgColor = getOwnBackgroundColor(bgElmStyle);
    if (bgColor.alpha === 0) {
      continue;
    }

    // abort if a node is partially obscured and obscuring element has a background
    if (
      bgElmStyle.getPropertyValue('display') !== 'inline' &&
      !fullyEncompasses(bgElm, textRects)
    ) {
      if (window.DEBUG) {
        console.log('elmPartiallyObscured');
      }
      bgElms.push(bgElm);
      incompleteData.set('bgColor', 'elmPartiallyObscured');

      return null;
    }

    // store elements contributing to the bg color.
    let alpha = 1;
    const bgVNode = getNodeFromTree(bgElm);
    const stackingOrder = bgVNode._stackingOrder;
    stackingOrder.forEach(({ vNode }, index) => {
      const ancestorVNode = stackingOrder[index - 1]?.vNode;
      const context = addToStackingContext(contextMap, vNode, ancestorVNode);
      alpha *= context.opacity;

      if (index === 0 && !contextMap.get(vNode)) {
        stackingContext.unshift(context);
      }
      contextMap.set(vNode, context);
    });

    const ancestorVNode = stackingOrder[stackingOrder.length - 1]?.vNode;
    const context = addToStackingContext(contextMap, bgVNode, ancestorVNode);
    context.bgColor = bgColor;
    alpha *= context.opacity * bgColor.alpha;

    if (bgColor.alpha !== 0) {
      bgElms.push(bgElm);
    }

    // Exit if the background is opaque
    if (alpha === 1) {
      break;
    }
  }
  if (window.DEBUG) {
    console.log(
      JSON.stringify(
        stackingContext,
        (key, value) => {
          if (key === 'vNode') {
            if (value.props.nodeName === 'html') {
              return 'html';
            }
            return value.actualNode.cloneNode().outerHTML;
          }

          return value;
        },
        2
      )
    );
  }
  bgColors = stackingContext.map(flattenStack).concat(bgColors);
  if (window.DEBUG) {
    console.log('bgColors:', JSON.stringify(bgColors, null, 2));
    console.log('includes body:', elmStack.includes(document.body));
  }

  const pageBgs = getPageBackgroundColors(
    elm,
    elmStack.includes(document.body)
  );
  bgColors.unshift(...pageBgs.map(pageBg => pageBg.color));

  // default to white if bgColors is empty
  if (bgColors.length === 0) {
    return new Color(255, 255, 255, 1);
  }
  // Mix the colors together. Colors must be mixed in bottom up
  // order (background to foreground order) to produce the correct
  // result.
  // @see https://github.com/dequelabs/axe-core/issues/2924

  if (window.DEBUG) {
    console.log('bgColors (2):', JSON.stringify(bgColors, null, 2));
  }
  const blendedColor = bgColors.reduce((bgColor, fgColor) => {
    return flattenColors(fgColor, bgColor);
  });

  // default page background is white which must be mixed last
  // @see https://www.w3.org/TR/compositing-1/#pagebackdrop
  return flattenColors(
    blendedColor.color instanceof Color ? blendedColor.color : blendedColor,
    new Color(255, 255, 255, 1)
  );
}

function createStackingContext(vNode) {
  return {
    vNode: vNode,
    opacity: parseFloat(vNode?.getComputedStylePropertyValue('opacity') ?? 1),
    bgColor: new Color(0, 0, 0, 0),
    descendants: []
  };
}

function addToStackingContext(contextMap, vNode, parentVNode) {
  const context = contextMap.get(vNode) ?? createStackingContext(vNode);
  const parentContext = contextMap.get(parentVNode);
  if (
    parentContext &&
    parentVNode !== vNode &&
    !parentContext.descendants.includes(context)
  ) {
    parentContext.descendants.unshift(context);
  }

  return context;
}

function reduceToColor(bgContext, fgContext) {
  let bgColor;
  let fgColor;

  if (bgContext.descendants?.length) {
    bgColor = bgContext.descendants.reduce(
      reduceToColor,
      createStackingContext()
    );
  }

  if (!bgColor) {
    bgColor = bgContext instanceof Color ? bgContext : bgContext.bgColor;
  }

  if (fgContext.descendants?.length) {
    fgColor = fgContext.descendants.reduce(
      reduceToColor,
      createStackingContext()
    );
  }

  if (!fgColor) {
    fgColor = fgContext.bgColor;
  }

  const color = flattenColors(fgColor, bgColor);
  color.alpha *= bgContext.opacity ?? 1;

  return color;
}

function flattenStack(context) {
  const fgColor = context.descendants.reduce(
    reduceToColor,
    createStackingContext()
  );
  const bgColor = context.bgColor;

  if (fgColor instanceof Color) {
    const color = flattenColors(fgColor, bgColor);
    color.alpha *= context.opacity;
    return color;
  }

  bgColor.alpha *= context.opacity;
  return bgColor;
}

function getOwnBackgroundColor(vNode) {
  const bgColor = new Color();
  if (vNode.getPropertyValue) {
    bgColor.parseString(vNode.getPropertyValue('background-color'));
  } else {
    bgColor.parseString(
      vNode.getComputedStylePropertyValue('background-color')
    );
  }

  return bgColor;
}

/**
 * Checks whether a node fully encompasses a set of rects.
 * @private
 * @param {Element} node
 * @param {NodeRect[]} rects
 * @return {Boolean}
 */
function fullyEncompasses(node, rects) {
  rects = Array.isArray(rects) ? rects : [rects];

  const nodeRect = node.getBoundingClientRect();
  let { right, bottom } = nodeRect;
  const style = window.getComputedStyle(node);
  const overflow = style.getPropertyValue('overflow');

  if (
    ['scroll', 'auto'].includes(overflow) ||
    node instanceof window.HTMLHtmlElement
  ) {
    right = nodeRect.left + node.scrollWidth;
    bottom = nodeRect.top + node.scrollHeight;
  }

  return rects.every(rect => {
    return (
      rect.top >= nodeRect.top &&
      rect.bottom <= bottom &&
      rect.left >= nodeRect.left &&
      rect.right <= right
    );
  });
}

function normalizeBlendMode(blendmode) {
  return !!blendmode ? blendmode : undefined;
}
/**
 * Get the page background color.
 * @private
 * @param {Element} elm
 * @param {Boolean} stackContainsBody
 * @return {Colors[]}
 */
function getPageBackgroundColors(elm, stackContainsBody) {
  const pageColors = [];

  // Body can sometimes appear out of order in the stack:
  //   1) Body is not the first element due to negative z-index elements
  //   2) Elements are positioned outside of body's rect coordinates
  //      (see https://github.com/dequelabs/axe-core/issues/1456)
  // In those instances we need to determine if we should use the
  // body background or the html background color
  if (!stackContainsBody) {
    // if the html element defines a bgColor and body defines a
    // bgColor but body's height is not the full viewport, then the
    // html bgColor fills the full viewport and body bgColor only
    // fills to its size. however, if the html element does not
    // define a bgColor, then the body bgColor fills the full
    // viewport. so if the body wasn't added to the elmStack, we
    // need to know which bgColor to get (html or body)
    const html = document.documentElement;
    const body = document.body;
    const htmlStyle = window.getComputedStyle(html);
    const bodyStyle = window.getComputedStyle(body);
    const htmlBgColor = getOwnBackgroundColor(htmlStyle);
    const bodyBgColor = getOwnBackgroundColor(bodyStyle);
    const bodyBgColorApplies =
      bodyBgColor.alpha !== 0 &&
      fullyEncompasses(body, elm.getBoundingClientRect());
    if (
      (bodyBgColor.alpha !== 0 && htmlBgColor.alpha === 0) ||
      (bodyBgColorApplies && bodyBgColor.alpha !== 1)
    ) {
      pageColors.unshift({
        color: bodyBgColor,
        blendMode: normalizeBlendMode(
          bodyStyle.getPropertyValue('mix-blend-mode')
        )
      });
    }

    if (
      htmlBgColor.alpha !== 0 &&
      (!bodyBgColorApplies || (bodyBgColorApplies && bodyBgColor.alpha !== 1))
    ) {
      pageColors.unshift({
        color: htmlBgColor,
        blendMode: normalizeBlendMode(
          htmlStyle.getPropertyValue('mix-blend-mode')
        )
      });
    }
  }

  return pageColors;
}

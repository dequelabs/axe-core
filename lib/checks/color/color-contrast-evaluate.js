import { isVisibleOnScreen } from '../../commons/dom';
import {
  visibleVirtual,
  hasUnicode,
  sanitize,
  removeUnicode
} from '../../commons/text';
import {
  getBackgroundColor,
  getForegroundColor,
  incompleteData,
  getContrast,
  getOwnBackgroundColor,
  getTextShadowColors,
  flattenShadowColors
} from '../../commons/color';
import { memoize, performanceTimer } from '../../core/utils';

let visibleOnScreenStart;
let visibleVirtualStart;
let textIsEmojisStart;
let findPseudoElementStart;
let getTextShadowColorsStart;
let getBackgroundColorStart;
let getForegroundColorStart;
let getContrastStart;

let visibleOnScreenTime = 0;
let visibleVirtualTime = 0;
let textIsEmojisTime = 0;
let findPseudoElementTime = 0;
let getTextShadowColorsTime = 0;
let getBackgroundColorTime = 0;
let getForegroundColorTime = 0;
let getContrastTime = 0;

export default function colorContrastEvaluate(node, options, virtualNode) {
  const {
    ignoreUnicode,
    ignoreLength,
    ignorePseudo,
    boldValue,
    boldTextPt,
    largeTextPt,
    contrastRatio,
    shadowOutlineEmMax,
    pseudoSizeThreshold
  } = options;


  visibleOnScreenStart = window.performance.now();
  if (!isVisibleOnScreen(node)) {
    this.data({ messageKey: 'hidden' });
    return true;
  }
  visibleOnScreenTime += window.performance.now() - visibleOnScreenStart;

  visibleVirtualStart = window.performance.now();
  const visibleText = visibleVirtual(virtualNode, false, true);
  visibleVirtualTime += window.performance.now() - visibleVirtualStart;

  textIsEmojisStart = window.performance.now();
  if (ignoreUnicode && textIsEmojis(visibleText)) {
    textIsEmojisTime += window.performance.now() - textIsEmojisStart;
    this.data({ messageKey: 'nonBmp' });
    return undefined;
  }

  const nodeStyle = window.getComputedStyle(node);
  const fontSize = parseFloat(nodeStyle.getPropertyValue('font-size'));
  const fontWeight = nodeStyle.getPropertyValue('font-weight');
  const bold = parseFloat(fontWeight) >= boldValue || fontWeight === 'bold';

  const ptSize = Math.ceil(fontSize * 72) / 96;
  const isSmallFont =
    (bold && ptSize < boldTextPt) || (!bold && ptSize < largeTextPt);

  const { expected, minThreshold, maxThreshold } = isSmallFont
    ? contrastRatio.normal
    : contrastRatio.large;

  // if element or a parent has pseudo content then we need to mark
  // as needs review

  findPseudoElementStart = window.performance.now();
  const pseudoElm = findPseudoElement(virtualNode, {
    ignorePseudo,
    pseudoSizeThreshold
  });
  findPseudoElementTime += window.performance.now() - findPseudoElementStart;
  if (pseudoElm) {
    this.data({
      fontSize: `${((fontSize * 72) / 96).toFixed(1)}pt (${fontSize}px)`,
      fontWeight: bold ? 'bold' : 'normal',
      messageKey: 'pseudoContent',
      expectedContrastRatio: expected + ':1'
    });

    this.relatedNodes(pseudoElm.actualNode);
    return undefined;
  }

  // Thin shadows only. Thicker shadows are included in the background instead
  getTextShadowColorsStart = window.performance.now();
  const shadowColors = getTextShadowColors(node, {
    minRatio: 0.001,
    maxRatio: shadowOutlineEmMax
  });
  getTextShadowColorsTime += window.performance.now() - getTextShadowColorsStart;
  if (shadowColors === null) {
    this.data({ messageKey: 'complexTextShadows' });
    return undefined;
  }

  const bgNodes = [];
  getBackgroundColorStart = window.performance.now();
  const bgColor = getBackgroundColor(node, bgNodes, shadowOutlineEmMax);
  getBackgroundColorTime += window.performance.now() - getBackgroundColorStart;

  getForegroundColorStart = window.performance.now();
  const fgColor = getForegroundColor(node, false, bgColor, options);
  getForegroundColorTime += window.performance.now() - getForegroundColorStart;

  let contrast = null;
  let contrastContributor = null;
  let shadowColor = null;

  getContrastStart = window.performance.now();
  if (shadowColors.length === 0) {
    contrast = getContrast(bgColor, fgColor);
  } else if (fgColor && bgColor) {
    shadowColor = [...shadowColors, bgColor].reduce(flattenShadowColors);
    // Compare shadow, bgColor, textColor. Check passes if any is sufficient
    const fgBgContrast = getContrast(bgColor, fgColor);
    const bgShContrast = getContrast(bgColor, shadowColor);
    const fgShContrast = getContrast(shadowColor, fgColor);
    contrast = Math.max(fgBgContrast, bgShContrast, fgShContrast);
    if (contrast !== fgBgContrast) {
      contrastContributor =
        bgShContrast > fgShContrast ? 'shadowOnBgColor' : 'fgOnShadowColor';
    }
  }
  getContrastTime += window.performance.now() - getContrastStart;

  const isValid = contrast > expected;

  // ratio is outside range
  if (
    (typeof minThreshold === 'number' &&
      (typeof contrast !== 'number' || contrast < minThreshold)) ||
    (typeof maxThreshold === 'number' &&
      (typeof contrast !== 'number' || contrast > maxThreshold))
  ) {
    this.data({ contrastRatio: contrast });
    return true;
  }

  // truncate ratio to three digits while rounding down
  // 4.499 = 4.49, 4.019 = 4.01
  const truncatedResult = Math.floor(contrast * 100) / 100;

  // if fgColor or bgColor are missing, get more information.
  let missing;
  let colorParse;

  if (bgColor === null) {
    if (incompleteData.get('colorParse')) {
      missing = 'colorParse';
      colorParse = incompleteData.get('colorParse');
    } else {
      missing = incompleteData.get('bgColor');
    }
  } else if (!isValid) {
    missing = contrastContributor;
  }

  if (fgColor === null && incompleteData.get('colorParse')) {
    missing = 'colorParse';
    colorParse = incompleteData.get('colorParse');
  }

  const equalRatio = truncatedResult === 1;
  const shortTextContent = visibleText.length === 1;
  if (equalRatio) {
    missing = incompleteData.set('bgColor', 'equalRatio');
  } else if (!isValid && shortTextContent && !ignoreLength) {
    // Check that the text content is a single character long
    missing = 'shortTextContent';
  }

  // need both independently in case both are missing
  this.data({
    fgColor: fgColor ? fgColor.toHexString() : undefined,
    bgColor: bgColor ? bgColor.toHexString() : undefined,
    contrastRatio: truncatedResult,
    fontSize: `${((fontSize * 72) / 96).toFixed(1)}pt (${fontSize}px)`,
    fontWeight: bold ? 'bold' : 'normal',
    messageKey: missing,
    expectedContrastRatio: expected + ':1',
    shadowColor: shadowColor ? shadowColor.toHexString() : undefined,
    colorParse: colorParse
  });

  // We don't know, so we'll put it into Can't Tell
  if (
    fgColor === null ||
    bgColor === null ||
    equalRatio ||
    (shortTextContent && !ignoreLength && !isValid)
  ) {
    missing = null;
    incompleteData.clear();
    this.relatedNodes(bgNodes);
    return undefined;
  }

  if (!isValid) {
    this.relatedNodes(bgNodes);
  }

  return isValid;
}
colorContrastEvaluate._logTime = function() {
  performanceTimer._log('Measure runchecks_color-contrast#visibleOnScreen took ' + visibleOnScreenTime + 'ms');
  performanceTimer._log('Measure runchecks_color-contrast#visibleVirtual took ' + visibleVirtualTime + 'ms');
  performanceTimer._log('Measure runchecks_color-contrast#textIsEmojis took ' + textIsEmojisTime + 'ms');
  performanceTimer._log('Measure runchecks_color-contrast#findPseudoElement took ' + findPseudoElementTime + 'ms');
  performanceTimer._log('Measure runchecks_color-contrast#getTextShadowColors took ' + getTextShadowColorsTime + 'ms');
  performanceTimer._log('Measure runchecks_color-contrast#getBackgroundColor took ' + getBackgroundColorTime + 'ms');
  performanceTimer._log('Measure runchecks_color-contrast#getForegroundColor took ' + getForegroundColorTime + 'ms');
  performanceTimer._log('Measure runchecks_color-contrast#getContrastTime took ' + getContrastTime + 'ms');

  getBackgroundColor._logTime();
}

function findPseudoElement(
  vNode,
  { pseudoSizeThreshold = 0.25, ignorePseudo = false }
) {
  if (ignorePseudo) {
    return;
  }
  const rect = vNode.boundingClientRect;
  const minimumSize = rect.width * rect.height * pseudoSizeThreshold;
  do {
    const beforeSize = getPseudoElementArea(vNode.actualNode, ':before');
    const afterSize = getPseudoElementArea(vNode.actualNode, ':after');
    if (beforeSize + afterSize > minimumSize) {
      return vNode; // Combined area of before and after exceeds the minimum size
    }
  } while ((vNode = vNode.parent));
}

const getPseudoElementArea = memoize(
  function getPseudoElementArea(node, pseudo) {
    const style = window.getComputedStyle(node, pseudo);
    const matchPseudoStyle = (prop, value) =>
      style.getPropertyValue(prop) === value;
    if (
      matchPseudoStyle('content', 'none') ||
      matchPseudoStyle('display', 'none') ||
      matchPseudoStyle('visibility', 'hidden') ||
      matchPseudoStyle('position', 'absolute') === false
    ) {
      return 0; // The pseudo element isn't visible
    }

    if (
      getOwnBackgroundColor(style).alpha === 0 &&
      matchPseudoStyle('background-image', 'none')
    ) {
      return 0; // There is no background
    }

    // Find the size of the pseudo element;
    const pseudoWidth = parseUnit(style.getPropertyValue('width'));
    const pseudoHeight = parseUnit(style.getPropertyValue('height'));
    if (pseudoWidth.unit !== 'px' || pseudoHeight.unit !== 'px') {
      // IE doesn't normalize to px. Infinity gets everything to undefined
      return pseudoWidth.value === 0 || pseudoHeight.value === 0 ? 0 : Infinity;
    }
    return pseudoWidth.value * pseudoHeight.value;
  }
);

function textIsEmojis(visibleText) {
  const options = { nonBmp: true };
  const hasUnicodeChars = hasUnicode(visibleText, options);
  const hasNonUnicodeChars =
    sanitize(removeUnicode(visibleText, options)) === '';
  return hasUnicodeChars && hasNonUnicodeChars;
}

function parseUnit(str) {
  const unitRegex = /^([0-9.]+)([a-z]+)$/i;
  const [, value = '', unit = ''] = str.match(unitRegex) || [];
  return {
    value: parseFloat(value),
    unit: unit.toLowerCase()
  };
}

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
import { memoize } from '../../core/utils';

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

  if (!isVisibleOnScreen(node)) {
    this.data({ messageKey: 'hidden' });
    return true;
  }

  const visibleText = visibleVirtual(virtualNode, false, true);
  if (ignoreUnicode && textIsEmojis(visibleText)) {
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
  const pseudoElm = findPseudoElement(virtualNode, {
    ignorePseudo,
    pseudoSizeThreshold
  });
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
  const shadowColors = getTextShadowColors(node, {
    minRatio: 0.001,
    maxRatio: shadowOutlineEmMax
  });
  if (shadowColors === null) {
    this.data({ messageKey: 'complexTextShadows' });
    return undefined;
  }

  const bgNodes = [];
  const bgColor = getBackgroundColor(node, bgNodes, shadowOutlineEmMax);
  const fgColor = getForegroundColor(node, false, bgColor, options);

  let contrast = null;
  let contrastContributor = null;
  let shadowColor = null;
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
  if (bgColor === null) {
    missing = incompleteData.get('bgColor');
  } else if (!isValid) {
    missing = contrastContributor;
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
    shadowColor: shadowColor ? shadowColor.toHexString() : undefined
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

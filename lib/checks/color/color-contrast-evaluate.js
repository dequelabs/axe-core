import { isVisible } from '../../commons/dom';
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
  getTextShadowColors,
  flattenShadowColors
} from '../../commons/color';
import { findPseudoElement } from '../../commons/dom';

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

  if (!isVisible(node, false)) {
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

  const bgNodes = [];
  const bgColor = getBackgroundColor(node, bgNodes, {
    shadowOutlineEmMax,
    ignorePseudo,
    pseudoSizeThreshold
  });
  const fgColor = getForegroundColor(node, false, bgColor);
  // Thin shadows only. Thicker shadows are included in the background instead
  const shadowColors = getTextShadowColors(node, {
    minRatio: 0.001,
    maxRatio: shadowOutlineEmMax
  });

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
    (typeof minThreshold === 'number' && contrast < minThreshold) ||
    (typeof maxThreshold === 'number' && contrast > maxThreshold)
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

function textIsEmojis(visibleText) {
  const options = { nonBmp: true };
  const hasUnicodeChars = hasUnicode(visibleText, options);
  const hasNonUnicodeChars =
    sanitize(removeUnicode(visibleText, options)) === '';
  return hasUnicodeChars && hasNonUnicodeChars;
}

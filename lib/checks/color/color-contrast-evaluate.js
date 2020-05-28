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
	getContrast,
	incompleteData
} from '../../commons/color';

function colorContrastEvaluate(node, options, virtualNode) {
	if (!isVisible(node, false)) {
		return true;
	}

	const visibleText = visibleVirtual(virtualNode, false, true);
	const ignoreUnicode = !!options.ignoreUnicode;
	const textContainsOnlyUnicode =
		hasUnicode(visibleText, {
			nonBmp: true
		}) &&
		sanitize(
			removeUnicode(visibleText, {
				nonBmp: true
			})
		) === '';

	if (textContainsOnlyUnicode && ignoreUnicode) {
		this.data({ messageKey: 'nonBmp' });
		return undefined;
	}

	const noScroll = !!options.noScroll;
	const bgNodes = [];
	const bgColor = getBackgroundColor(node, bgNodes, noScroll);
	const fgColor = getForegroundColor(node, noScroll, bgColor);

	const nodeStyle = window.getComputedStyle(node);
	const fontSize = parseFloat(nodeStyle.getPropertyValue('font-size'));
	const fontWeight = parseFloat(nodeStyle.getPropertyValue('font-weight'));
	const bold = !isNaN(fontWeight) && fontWeight >= options.boldValue;

	const contrastRatio = getContrast(bgColor, fgColor);
	const ptSize = Math.ceil(fontSize * 72) / 96;
	const isSmallFont =
		(bold && ptSize < options.boldPt) || (!bold && ptSize < options.nonBoldPt);
	const expectedContrastRatio = isSmallFont
		? options.normalContrastRatio
		: options.largeContrastRatio;
	const isValid = contrastRatio > expectedContrastRatio;

	// ratio is outside minimum range
	if (
		(isSmallFont && contrastRatio < options.minNormalContrastRatio) ||
		(!isSmallFont && contrastRatio < options.minLargeContrastRatio)
	) {
		return true;
	}

	// truncate ratio to three digits while rounding down
	// 4.499 = 4.49, 4.019 = 4.01
	const truncatedResult = Math.floor(contrastRatio * 100) / 100;

	// if fgColor or bgColor are missing, get more information.
	let missing;
	if (bgColor === null) {
		missing = incompleteData.get('bgColor');
	}

	const equalRatio = truncatedResult === 1;
	const shortTextContent = visibleText.length === 1;
	const ignoreLength = !!(options || {}).ignoreLength;
	if (equalRatio) {
		missing = incompleteData.set('bgColor', 'equalRatio');
	} else if (shortTextContent && !ignoreLength) {
		// Check that the text content is a single character long
		missing = 'shortTextContent';
	}

	// need both independently in case both are missing
	const data = {
		fgColor: fgColor ? fgColor.toHexString() : undefined,
		bgColor: bgColor ? bgColor.toHexString() : undefined,
		contrastRatio: truncatedResult,
		fontSize: `${((fontSize * 72) / 96).toFixed(1)}pt (${fontSize}px)`,
		fontWeight: bold ? 'bold' : 'normal',
		messageKey: missing,
		expectedContrastRatio: expectedContrastRatio + ':1'
	};

	this.data(data);

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

export default colorContrastEvaluate;

/*global color */

function _getFonts(style) {
	return style.getPropertyValue('font-family')
	.split(/[,;]/g)
	.map(function (font) {
		return font.trim().toLowerCase();
	});
}

function elementIsDistinct(node, ancestorNode) {
	var nodeStyle = window.getComputedStyle(node);

	// Check if the link has a background
	if (nodeStyle.getPropertyValue('background-image') !== 'none') {
		return true;
	}

	// Check if the link has a border or outline
	var hasBorder = ['border-bottom', 'border-top', 'outline']
	.reduce(function (result, edge) {

		var borderClr = new color.Color();
		borderClr.parseRgbString(nodeStyle.getPropertyValue(edge + '-color'));

		// Check if a border/outline was specified
		return result || (
			// or if the current border edge / outline
			nodeStyle.getPropertyValue(edge + '-style') !== 'none' &&
			parseFloat(nodeStyle.getPropertyValue(edge + '-width')) > 0 &&
			borderClr.alpha !== 0
		);
	}, false);

	if (hasBorder) {
		return true;
	}

	var parentStyle = window.getComputedStyle(ancestorNode);
	// Compare fonts
	if (_getFonts(nodeStyle)[0] !== _getFonts(parentStyle)[0]) {
		return true;
	}

	var hasStyle = ['text-decoration-line', 'text-decoration-style', 'font-weight', 'font-style', 'font-size']
	.reduce(function (result, cssProp) {
		return result || (nodeStyle.getPropertyValue(cssProp) !== parentStyle.getPropertyValue(cssProp));
	}, false);

	var tDec = nodeStyle.getPropertyValue('text-decoration');
	if (tDec.split(' ').length < 3) {
		// old style CSS text decoration
		hasStyle = hasStyle || (tDec !== parentStyle.getPropertyValue('text-decoration'));
	}

	return hasStyle;
}


color.elementIsDistinct = elementIsDistinct;
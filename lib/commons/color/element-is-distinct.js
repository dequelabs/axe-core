/*global color */

function _getFonts(style) {
	return style['font-family'].split(/[,;]/g).map(function (font) {
		return font.trim().toLowerCase();
	});
}

function elementIsDistinct(node, ancestorNode) {
	var nodeStyle = window.getComputedStyle(node);

	// Check if the link has a background
	if (nodeStyle['background-image'] !== 'none') {
		return true;
	}

	// Check if the link has a border or outline
	var hasBorder = ['border-bottom', 'border-top', 'outline']
	.reduce(function (result, edge) {
		// Check if a border/outline was specified
		return result || (
			// or if the current border edge / outline
			nodeStyle[edge + '-style'] !== 'none' &&
			parseFloat(nodeStyle[edge + '-width']) > 0 &&
			nodeStyle[edge + '-color'] !== 'transparant'
		);
	}, false);
	console.log(hasBorder);
	if (hasBorder) {
		return true;
	}

	var parentStyle = window.getComputedStyle(ancestorNode);
	// Compare fonts
	if (_getFonts(nodeStyle)[0] !== _getFonts(parentStyle)[0]) {
		return true;
	}

	var hasStyle = ['text-decoration', 'font-weight', 'font-style', 'font-size']
	.reduce(function (result, cssProp) {
		return result || (nodeStyle[cssProp] !== parentStyle[cssProp]);
	}, false);
	console.log(hasStyle);
	return hasStyle;
}


color.elementIsDistinct = elementIsDistinct;
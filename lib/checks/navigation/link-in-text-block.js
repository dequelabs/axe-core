
function _getFonts(style) {
	return style['font-family'].split(/[,;]/g).map(function (font) {
		return font.trim().toLowerCase();
	});
}

function elementIsDistinguished(node, parentNode) {
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

	if (hasBorder) {
		return true;
	}

	var parentStyle = window.getComputedStyle(parentNode);
	// Compare fonts
	if (_getFonts(nodeStyle)[0] !== _getFonts(parentStyle)[0]) {
		return true;
	}

	return ['color', 'text-decoration', 'font-weight', 'font-style', 'font-size']
	.reduce(function (result, cssProp) {
		return result || (nodeStyle[cssProp] !== parentStyle[cssProp]);
	}, false);
}


var parentBlock = node;
while (parentBlock.nodeType === 1 && window.getComputedStyle(parentBlock).display !== 'block') {
	parentBlock = parentBlock.parentNode;
}

return elementIsDistinguished(node, parentBlock);
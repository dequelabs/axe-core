/* global axe*/
var color = axe.commons.color;

function getContrast(color1, color2) {
	var c1lum = color1.getRelativeLuminance();
	var c2lum = color2.getRelativeLuminance();
	return (Math.max(c1lum, c2lum) + 0.05) / (Math.min(c1lum, c2lum) + 0.05);
}

var blockLike = ['block', 'list-item', 'table', 'flex', 'grid', 'inline-block'];
function isBlock(elm) {
	var display = window.getComputedStyle(elm).getPropertyValue('display');
	return (blockLike.indexOf(display) !== -1 ||
			display.substr(0, 6) === 'table-');
}


if (isBlock(node)) {
	return false;
}

var parentBlock = node.parentNode;
while (parentBlock.nodeType === 1 && !isBlock(parentBlock)) {
	parentBlock = parentBlock.parentNode;
}

// TODO: Check the :visited state of the link
if (color.elementIsDistinct(node, parentBlock)) {
	return true;

} else {

	// Check if contrast of foreground is sufficient
	var nodeColor, parentColor;
	nodeColor = color.getForegroundColor(node);
	parentColor = color.getForegroundColor(parentBlock);

	if (!nodeColor || !parentColor) {
		return undefined;
	}

	var contrast = getContrast(nodeColor, parentColor);
	if (contrast === 1) {
		return true;
	} else if (contrast >= 3.0) {
		axe.commons.color.incompleteData.set('fgColor', {
			reason: 'bgContrast'
		});
		this.data({
			missingData: [axe.commons.color.incompleteData.get('fgColor')]
		});
		axe.commons.color.incompleteData.clear();
		// User needs to check whether there is a hover and a focus style
		return undefined;
	}

	// Check if contrast of background is sufficient
	nodeColor = color.getBackgroundColor(node);
	parentColor = color.getBackgroundColor(parentBlock);

	if (!nodeColor || !parentColor || getContrast(nodeColor, parentColor) >= 3.0) {
		let reason;
		if (!nodeColor || !parentColor) {
			reason = axe.commons.color.incompleteData.get('bgColor').reason;
		}
		else {
			reason = 'bgContrast';
		}
		axe.commons.color.incompleteData.set('fgColor', {
			reason: reason
		});
		this.data({
			missingData: [axe.commons.color.incompleteData.get('fgColor')]
		});
		axe.commons.color.incompleteData.clear();
		return undefined;
	}

}

// TODO: We should check the focus / hover style too
return false;

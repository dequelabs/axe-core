/* global commons*/

function getContrast(color1, color2) {
	var c1lum = color1.getRelativeLuminance();
	var c2lum = color2.getRelativeLuminance();
	return (Math.max(c1lum, c2lum) + 0.05) / (Math.min(c1lum, c2lum) + 0.05);
}

var parentBlock = node;

// TODO: What about display flex / table-* stuff?
while (parentBlock.nodeType === 1 &&
window.getComputedStyle(parentBlock).getPropertyValue('display') !== 'block') {
	parentBlock = parentBlock.parentNode;
}

var color = commons.color;
if (color.elementIsDistinct(node, parentBlock)) {
	// TODO: look at :visited
	return true;

} else {
	var nodeColor, parentColor;

	// Check if contrast of foreground is sufficient
	nodeColor = color.getForegroundColor(node);
	parentColor = color.getForegroundColor(parentBlock);
	if (getContrast(nodeColor, parentColor) >= 3.0) {
		return true;
	}

	// Check if contrast of background is sufficient
	nodeColor = color.getBackgroundColor(node);
	parentColor = color.getBackgroundColor(parentBlock);
	if (nodeColor && parentColor && getContrast(nodeColor, parentColor) >= 3.0) {
		return true;
	}

}

return false;

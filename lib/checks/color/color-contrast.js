if (!axe.commons.dom.isVisible(node, false)) {
	return true;
}

var noScroll = !!(options || {}).noScroll;
var bgNodes = [],
	bgColor = axe.commons.color.getBackgroundColor(node, bgNodes, noScroll),
	fgColor = axe.commons.color.getForegroundColor(node, noScroll);

//We don't know, so we'll pass it provisionally
if (fgColor === null || bgColor === null) {
	return undefined;
}

var nodeStyle = window.getComputedStyle(node);
var fontSize = parseFloat(nodeStyle.getPropertyValue('font-size'));
var fontWeight = nodeStyle.getPropertyValue('font-weight');
var bold = (['bold', 'bolder', '600', '700', '800', '900'].indexOf(fontWeight) !== -1);

var cr = axe.commons.color.hasValidContrastRatio(bgColor, fgColor, fontSize, bold);

// truncate ratio to three digits while rounding down
// 4.499 = 4.49, 4.019 = 4.01
var truncatedResult = Math.floor(cr.contrastRatio * 100) / 100;

this.data({
	fgColor: fgColor.toHexString(),
	bgColor: bgColor.toHexString(),
	contrastRatio: truncatedResult,
	fontSize: (fontSize * 72 / 96).toFixed(1) + 'pt',
	fontWeight: bold ? 'bold' : 'normal',
});

if (!cr.isValid) {
	this.relatedNodes(bgNodes);
}
return cr.isValid;

if (!commons.dom.isVisible(node, false)) {
	return true;
}

var noScroll = !!(options || {}).noScroll;
var bgNodes = [],
	bgColor = commons.color.getBackgroundColor(node, bgNodes, noScroll),
	fgColor = commons.color.getForegroundColor(node, noScroll);

//We don't know, so we'll pass it provisionally
if (fgColor === null || bgColor === null) {
	return true;
}

var nodeStyle = window.getComputedStyle(node);
var fontSize = parseFloat(nodeStyle.getPropertyValue('font-size'));
var fontWeight = nodeStyle.getPropertyValue('font-weight');
var bold = (['bold', 'bolder', '600', '700', '800', '900'].indexOf(fontWeight) !== -1);

var cr = commons.color.hasValidContrastRatio(bgColor, fgColor, fontSize, bold);

this.data({
	fgColor: fgColor.toHexString(),
	bgColor: bgColor.toHexString(),
	contrastRatio: cr.contrastRatio.toFixed(2),
	fontSize: (fontSize * 72 / 96).toFixed(1) + 'pt',
	fontWeight: bold ? 'bold' : 'normal',
});

if (!cr.isValid) {
	this.relatedNodes(bgNodes);
}
return cr.isValid;

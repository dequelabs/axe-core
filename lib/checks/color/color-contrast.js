var bgNodes = [],
	bgColor = kslib.dom.getBackgroundColor(node, bgNodes),
	fgColor = kslib.dom.getForegroundColor(node);

//We don't know, so we'll pass it provisionally
if (fgColor === null || bgColor === null) {
	return true;
}

var dv = node.ownerDocument.defaultView,
	nodeStyle = dv.getComputedStyle(node);
var fontSize = parseFloat(nodeStyle.getPropertyValue('font-size'));
var fontWeight = nodeStyle.getPropertyValue('font-weight');
var bold = (['bold', 'bolder', '600', '700', '800', '900'].indexOf(fontWeight) !== -1);

var cr = kslib.color.hasValidContrastRatio(bgColor, fgColor, fontSize, bold);

this.data({fgColor: fgColor.toHexString(), bgColor: bgColor.toHexString(), contrastRatio: cr.contrastRatio.toFixed(2)});
this.relatedNodes(bgNodes);
return cr.isValid;

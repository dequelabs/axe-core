options = Array.isArray(options) ? options : [];

var attr = node.getAttribute('aria-errormessage'),
	hasAttr = node.hasAttribute('aria-errormessage');

var doc = axe.commons.dom.getRootNode(node);

function validateAttrValue() {
	var idref = attr && doc.getElementById(attr);
	if (idref) {
		return idref.getAttribute('role') === 'alert' ||
			idref.getAttribute('aria-live') === 'assertive' ||
			axe.utils.tokenList(node.getAttribute('aria-describedby') || '').indexOf(attr) > -1;
	}
}

// limit results to elements that actually have this attribute
if (options.indexOf(attr) === -1 && hasAttr) {
	if (!validateAttrValue()) {
		this.data(attr);
		return false;
	}
}

return true;

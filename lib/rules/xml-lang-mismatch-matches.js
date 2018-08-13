// Rule: xml-lang-mismatch
// The rule checks that for the html element
// There is no mismatch between the primary language in non-empty lang and xml:lang attributes, if BOTH are used.

// filter only html nodes
const isHtmlNode = node.nodeName.toUpperCase() === 'HTML';

// filter node attributes that are either lang or xml:lang and has a value
const langAndXmlLangAttrs = Array.from(node.attributes).filter(attr => {
	const attrName = attr.nodeName.toLowerCase();
	const attrValue = attr.nodeValue;
	if (!attrValue) {
		return false;
	}
	return ['lang', 'xml:lang'].includes(attrName);
});

// return
// ensure node is HTML and has both lang and xml:lang specified (length of 2 for )
return isHtmlNode && langAndXmlLangAttrs.length === 2;

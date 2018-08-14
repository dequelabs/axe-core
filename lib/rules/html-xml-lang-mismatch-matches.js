// Rule: xml-lang-mismatch
// The rule checks that for the html element
// There is no mismatch between the primary language in non-empty lang and xml:lang attributes, if BOTH are used.

// using -> "selector": "html[lang][xml\\:lang]" to narrow down html with lang and xml:lang attributes

// get primary base language for each of the attributes
const { getBaseLang } = axe.commons.utils;
const primaryLangValue = getBaseLang(node.getAttribute('lang') || '');
const primaryXmlLangValue = getBaseLang(node.getAttribute('xml:lang') || '');

// ensure that the value specified is valid lang
return (
	axe.utils.validLangs().includes(primaryLangValue) &&
	axe.utils.validLangs().includes(primaryXmlLangValue)
);

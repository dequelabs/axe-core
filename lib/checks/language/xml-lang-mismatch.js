const { getBaseLang } = axe.commons.utils;
const primaryLangValue = getBaseLang(node.getAttribute('lang'));
const primaryXmlLangValue = getBaseLang(node.getAttribute('xml:lang'));

return primaryLangValue === primaryXmlLangValue;

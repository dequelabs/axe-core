const isContainedInDocumentBody = document.body.contains(node); // reference: https://developer.mozilla.org/en-US/docs/Web/API/Node/contains
const hasLangOrXmlLangAttribute = node.getAttribute('lang') || node.getAttribute('xml:lang');

// filter elements contained in document body or it's contents, and has one of the lang attributes supplied
return isContainedInDocumentBody && hasLangOrXmlLangAttribute;
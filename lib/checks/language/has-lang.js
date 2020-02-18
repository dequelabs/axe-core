/* global isXHTMLGlobal */

const langValue = node.getAttribute(`lang`);
const xmlLangValue = node.getAttribute(`xml:lang`);

if (!langValue && !isXHTMLGlobal) {
	return false;
}

return !!(langValue || xmlLangValue || '').trim();

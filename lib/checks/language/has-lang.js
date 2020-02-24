const { isXHTML } = axe.utils;

const langValue = (node.getAttribute(`lang`) || '').trim();
const xmlLangValue = (node.getAttribute(`xml:lang`) || '').trim();

if (!langValue && !isXHTML(document)) {
	return false;
}

return !!(langValue || xmlLangValue);

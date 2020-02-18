const { isXHTML } = axe.utils;

const langValue = node.getAttribute(`lang`);
const xmlLangValue = node.getAttribute(`xml:lang`);

if (!langValue && !isXHTML(document)) {
	return false;
}

return !!(langValue || xmlLangValue || '').trim();

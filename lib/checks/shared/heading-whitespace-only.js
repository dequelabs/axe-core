const text = axe.commons.text.accessibleTextVirtual(virtualNode, {
	sanitize: false
});
const hasBreakingSpaceElement =
	axe.utils.querySelectorAll(virtualNode, 'br, wbr').length > 0;

if (text.length === 0 && !hasBreakingSpaceElement) {
	return true;
}

const spaceSeparatorCharCodes = [
	160, // non-breaking space
	8194, // en space
	8195, // em space
	8201 // thin space
];

const hasSpaceSeparator =
	text
		.split('')
		.map(char => char.charCodeAt(0))
		.filter(charCode => spaceSeparatorCharCodes.includes(charCode)).length > 0;

return !(hasSpaceSeparator || hasBreakingSpaceElement);

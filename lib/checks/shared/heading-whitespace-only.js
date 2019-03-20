if (axe.commons.text.accessibleTextVirtual(virtualNode)) {
	return true;
}

const spaceSeparatorCharCodes = [
	160, // non-breaking space
	8194, // en space
	8195, // em space
	8201 // thin space
];

let hasBreakingSpaceElement = node.querySelectorAll('br, wbr').length > 0;
let hasSpaceSeparator =
	node.textContent
		.split('')
		.map(char => char.charCodeAt(0))
		.filter(charCode => spaceSeparatorCharCodes.includes(charCode)).length > 0;

return !(hasSpaceSeparator || hasBreakingSpaceElement);

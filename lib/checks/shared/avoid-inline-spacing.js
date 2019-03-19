const inlineSpacingCssProperties = [
	'line-height',
	'letter-spacing',
	'word-spacing'
];

const hasImportantPriority = inlineSpacingCssProperties.some(
	property => node.style.getPropertyPriority(property) === `important`
);

if (hasImportantPriority) {
	return false; //-> fail
}

return true; // -> pass

/* global aria, dom, text */
aria.getAriaLabelledbyText = function getAriaLabelledbyText(node, context) {
	node = node.actualNode || node;
	if (node.nodeType !== 1 || context.inLabelledByContext) {
		return '';
	}

	const refs = dom.idrefs(node, 'aria-labelledby').filter(elm => elm);
	return refs.reduce((accessibleName, elm) => {
		const accessibleNameAdd = text.accessibleText(elm, {
			inLabelledByContext: true,
			...context
		});
		if (!accessibleNameAdd) {
			return accessibleName;
		}

		return accessibleName + ' ' + accessibleNameAdd.trim();
	}, '');
};

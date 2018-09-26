/* global aria, dom, text */
aria.getAriaLabelledbyText = function getAriaLabelledbyText(node, context) {
	node = node.actualNode || node;

	/**
	 * Note: The there are significant difference in how many "leads" browsers follow.
	 * - Firefox stops after the first IDREF, so it
	 * 		doesn't follow aria-labelledby after a for:>ID ref.
	 * - Chrome seems to just keep iterating no matter how many levels deep.
	 * - AccName-AAM 1.1 suggests going one level deep, but to treat
	 * 		each ref type separately.
	 *
	 * Axe-core's implementation behaves most closely like Firefox as it seems
	 *  to be the most common deniminator. Main difference is that Firefox
	 *  includes the value of form controls in addition to aria-label(s),
	 *  something no other browser seems to do. Axe doesn't do that.
	 */
	if (
		node.nodeType !== 1 ||
		context.inLabelledByContext ||
		context.inControlContext
	) {
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

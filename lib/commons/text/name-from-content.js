/* global text, aria */
text.nameFromContent = function nameFromContent(virtualNode, context) {
	const { actualNode } = virtualNode;
	if (actualNode.nodeType !== 1) {
		return '';
	}

	const role = aria.getRole(actualNode);
	const roleDef = aria.lookupTable.role[role];
	/**
	 * Note: Unlike what ACCNAME-1.1 says, axe-core allows "name from content"
	 * for elements without a role, as there MIGHT BE cases where accName
	 * is called on elements without a role. This gives axe a way to work out
	 * if these elements are still available to assistive technologies.
	 *
	 * For a correct implementation use context.strict = true
	 */
	let isNamedFromContent;
	if (context.strict) {
		isNamedFromContent = roleDef && roleDef.nameFrom.includes('contents');
	} else {
		isNamedFromContent =
			!roleDef ||
			['presentation', 'none'].includes(role) ||
			roleDef.nameFrom.includes('contents');
	}

	if (
		isNamedFromContent ||
		context.inLabelledByContext ||
		actualNode.nodeName.toUpperCase() === 'LABEL'
	) {
		// 2F.i
		return text.subtreeText(virtualNode, context);
	}
	return '';
};

text.descendingContentText = function descendingContentText(
	virtualNode,
	context
) {
	const { actualNode } = virtualNode;
	const { startNode } = context;
	const role = aria.getRole(actualNode, { noImplicit: true });
	const roleDef = aria.lookupTable.role[role];

	if (
		!startNode ||
		startNode === virtualNode ||
		(roleDef && !roleDef.nameFrom.includes('contents'))
	) {
		return '';
	}
	// 2F.i
	return text.nativeTextMethods.subtreeText(virtualNode, context);
};

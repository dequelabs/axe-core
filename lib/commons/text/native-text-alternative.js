/* global text, aria */

/**
 * Get the accessible text using native HTML methods only
 *
 * @param {VirtualNode} element
 * @param {Object} context
 * @property {Bool} inLabelledByContext Whether or not the lookup is part of aria-labelledby reference
 * @property {Element} startNode First node in accessible name computation
 * @property {Bool} strict Should the name computation strictly follow AccName 1.1
 * @property {Bool} debug Enable logging for formControlValue
 * @return {String} Accessible text
 */
text.nativeTextAlternative = function nativeTextAlternative(
	virtualNode,
	context
) {
	/* eslint max-statements:["error",30], complexity: ["error",25] */
	const { actualNode } = virtualNode;
	if (actualNode.nodeType !== 1) {
		return '';
	}
	const role = aria.getRole(actualNode);
	if (['presentation', 'none'].includes(role)) {
		return '';
	}

	const { nativeElementType, nativeTextMethods } = text;
	const nativeType = nativeElementType.find(({ matches }) => {
		return axe.utils.elementMatch(virtualNode, matches);
	});

	let methods = [];
	if (nativeType) {
		methods = methods.concat(nativeType.namingMethods);
	}

	for (let i = 0; i < methods.length; i++) {
		const nativeTextMethod = nativeTextMethods[methods[i]];
		const textAlternative = nativeTextMethod(virtualNode, context);

		if (textAlternative) {
			if (context.debug) {
				axe.log(textAlternative, virtualNode.actualNode, context, methods[i]);
			}
			return textAlternative;
		}
	}

	if (context.debug) {
		axe.log('{empty}', virtualNode.actualNode, context, methods);
	}
	return '';
};

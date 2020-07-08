import { labelVirtual, accessibleText, sanitize } from '../../commons/text';
import { idrefs } from '../../commons/dom';

function helpSameAsLabelEvaluate(node, options, virtualNode) {
	try {
		const labelText = labelVirtual(virtualNode);
		let check = virtualNode.attr('title');

		if (!labelText) {
			return false;
		}

		if (!check) {
			check = '';

			if (virtualNode.attr('aria-describedby')) {
				const ref = idrefs(virtualNode.actualNode, 'aria-describedby');
				check = ref
					.map(function(thing) {
						return thing ? accessibleText(thing) : '';
					})
					.join('');
			}
		}

		return sanitize(check) === sanitize(labelText);
	} catch (e) {
		return undefined;
	}
}

export default helpSameAsLabelEvaluate;

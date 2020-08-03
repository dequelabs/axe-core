import { validateAttr } from '../../commons/aria';
import standards from '../../standards';
import matches from '../../commons/matches';
import { getNodeAttributes } from '../../core/utils';

function ariaUnsupportedAttrEvaluate(node) {
	const unsupportedAttrs = Array.from(getNodeAttributes(node))
		.filter(({ name }) => {
			const attribute = standards.ariaAttrs[name];

			if (!validateAttr(name)) {
				return false;
			}

			const { unsupported } = attribute;

			if (typeof unsupported !== 'object') {
				return !!unsupported;
			}

			return !matches(node, unsupported.exceptions);
		})
		.map(candidate => candidate.name.toString());

	if (unsupportedAttrs.length) {
		this.data(unsupportedAttrs);
		return true;
	}
	return false;
}

export default ariaUnsupportedAttrEvaluate;

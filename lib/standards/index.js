import ariaAttrs from './aria-attrs';
import { clone, deepMerge } from '../core/utils';

const origAriaAttrs = clone(ariaAttrs);
const standards = {
	ariaAttrs
};
export function configureStandards(config) {
	if (config.ariaAttrs) {
		standards.ariaAttrs = deepMerge(standards.ariaAttrs, config.ariaAttrs);
	}
}

export function resetStandards() {
	standards.ariaAttrs = origAriaAttrs;
}

export default standards;

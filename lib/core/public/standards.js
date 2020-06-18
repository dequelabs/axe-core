import ariaAttrs from '../../standards/aria-attrs';
import { clone } from '../utils';

const standards = {
	ariaAttrs
};

export function configureStandards(config) {
	if (config.ariaAttrs) {
		standards.ariaAttrs = Object.assign({}, clone(ariaAttrs), config.ariaAttrs);
	}
}

export function resetStandards() {
	standards.ariaAttrs = ariaAttrs;
}

export default standards;

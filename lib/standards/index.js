import ariaAttrs from './aria-attrs';
import { clone } from '../core/utils';

const origAriaAttrs = clone(ariaAttrs);
const standards = {
	ariaAttrs
};

// @see https://stackoverflow.com/a/59008477/2124254
function merge(current, updates) {
	for (const key of Object.keys(updates)) {
		if (!current.hasOwnProperty(key) || typeof updates[key] !== 'object' || Array.isArray(current[key])) {
			current[key] = updates[key];
		} else {
			merge(current[key], updates[key]);
		}
	}
	return current;
}

export function configureStandards(config) {
	if (config.ariaAttrs) {
		standards.ariaAttrs = merge(ariaAttrs, config.ariaAttrs);
	}
}

export function resetStandards() {
	standards.ariaAttrs = origAriaAttrs;
}

export default standards;

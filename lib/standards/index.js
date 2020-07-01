import ariaAttrs from './aria-attrs';
import cssColors from './css-colors';
import { clone } from '../core/utils';

const originals = {
	ariaAttrs,
	cssColors
};
const standards = clone(originals);

// @see https://stackoverflow.com/a/59008477/2124254
function merge(current, updates) {
	for (const key of Object.keys(updates)) {
		if (
			!current.hasOwnProperty(key) ||
			typeof updates[key] !== 'object' ||
			Array.isArray(current[key])
		) {
			current[key] = updates[key];
		} else {
			merge(current[key], updates[key]);
		}
	}
	return current;
}

export function configureStandards(config) {
	Object.keys(standards).forEach(propName => {
		if (config[propName]) {
			standards[propName] = merge(standards[propName], config[propName]);
		}
	});
}

export function resetStandards() {
	Object.keys(standards).forEach(propName => {
		standards[propName] = clone(originals[propName]);
	});
}

export default standards;

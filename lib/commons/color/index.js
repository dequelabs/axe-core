/**
 * Namespace for color-related utilities.
 * @namespace commons.color
 * @memberof axe
 */

// by "renaming" (but not really) the exports we can see what the export is
// called here rather than having to dive into each of the files to figure
// out its name
export { default as centerPointOfRect } from './center-point-of-rect.js';
export { default as Color } from './color.js';
export { default as elementHasImage } from './element-has-image.js';
export { default as elementIsDistinct } from './element-is-distinct.js';
export { default as filteredRectStack } from './filtered-rect-stack.js';
export { default as flattenColors } from './flatten-color.js';
export { default as getBackgroundColor } from './get-background-color.js';
export { default as getBackgroundStack } from './get-background-stack.js';
export { default as getContrast } from './get-contrast.js';
export { default as getForegroundColor } from './get-foreground-color.js';
export {
	default as getOwnBackgroundColor
} from './get-own-background-color.js';
export { default as getRectStack } from './get-rect-stack.js';
export {
	default as hasValidContrastRatio
} from './has-valid-contrast-ratio.js';
export { default as incompleteData } from './incomplete-data.js';

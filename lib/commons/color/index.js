// TODO: es-module-commons. convert to:
// export { default as isAriaCombobox } from 'path'
import centerPointOfRect from './center-point-of-rect';
import Color from './color';
import elementHasImage from './element-has-image';
import elementIsDistinct from './element-is-distinct';
import filteredRectStack from './filtered-rect-stack';
import flattenColors from './flatten-colors';
import getBackgroundColor from './get-background-color';
import getBackgroundStack from './get-background-stack';
import getContrast from './get-contrast';
import getForegroundColor from './get-foreground-color';
import getOwnBackgroundColor from './get-own-background-color';
import getRectStack from './get-rect-stack';
import hasValidContrastRatio from './has-valid-contrast-ratio';
import incompleteData from './incomplete-data';

/**
 * Namespace for color-related utilities.
 * @namespace commons.color
 * @memberof axe
 */
const color = {
	centerPointOfRect,
	Color,
	elementHasImage,
	elementIsDistinct,
	filteredRectStack,
	flattenColors,
	getBackgroundColor,
	getBackgroundStack,
	getContrast,
	getForegroundColor,
	getOwnBackgroundColor,
	getRectStack,
	hasValidContrastRatio,
	incompleteData
};
commons.color = color;

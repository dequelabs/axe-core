/* global context */
const { cssom = undefined } = context || {};
if (!cssom || !cssom.length) {
	return undefined;
}

let isLocked = false;
let relatedElements = [];
const rulesGroupByDocumentFragment = groupCssomByDocument(cssom);

for (const key of Object.keys(rulesGroupByDocumentFragment)) {
	const { root, rules } = rulesGroupByDocumentFragment[key];
	const orientationRules = getOrientaionCssMediaFeatureRules(rules);
	if (!orientationRules.length) {
		continue;
	}

	orientationRules.forEach(({ cssRules }) => {
		Array.from(cssRules).forEach(cssRule => {
			const locked = getIsOrientationLocked(cssRule);

			// if locked and not root HTML, preserve as relatedNodes
			if (locked && cssRule.selectorText.toUpperCase() !== 'HTML') {
				const elms =
					Array.from(root.querySelectorAll(cssRule.selectorText)) || [];
				relatedElements = relatedElements.concat(elms);
			}

			// set locked boolean
			isLocked = locked;
		});
	});
}

if (!isLocked) {
	return true;
}
if (relatedElements.length) {
	this.relatedNodes(relatedElements);
}
return false;

/**
 * Group given cssom by document/ document fragment
 * @param {Array<Object>} allCssom cssom
 * @return {Object}
 */
function groupCssomByDocument(cssObjectModel) {
	return cssObjectModel.reduce((out, { sheet, root, shadowId }) => {
		const key = shadowId ? shadowId : 'topDocument';

		if (!out[key]) {
			out[key] = { root, rules: [] };
		}

		if (!sheet || !sheet.cssRules) {
			return out;
		}

		const rules = Array.from(sheet.cssRules);
		out[key].rules = out[key].rules.concat(rules);

		return out;
	}, {});
}

/**
 * Get CSS Rules that target Orientation CSS Media Features
 * @param {Array<Object>} cssRules
 * @returns {Array<Object>}
 */
function getOrientaionCssMediaFeatureRules(cssRules) {
	return (
		cssRules
			/**
			 * Filter:
			 * CSSRule.MEDIA_Rule
			 * -> https://developer.mozilla.org/en-US/docs/Web/API/CSSMediaRule
			 */
			.filter(({ type }) => type === 4)
			/**
			 * Filter:
			 * CSSRule with conditionText of `orientation`
			 */
			.filter(({ cssText }) => {
				return (
					/orientation:\s*landscape/i.test(cssText) ||
					/orientation:\s*portrait/i.test(cssText)
				);
			})
			/**
			 * Filter:
			 * Ensure RULELIST is not empty
			 */
			.filter(({ cssRules }) => cssRules.length > 0)
	);
}

/**
 * Interpolate a given CSS Rule to ascertain if orientation is locked by use of any transformation functions that affect rotation along the Z Axis
 * @param {Object} cssRule given CSS Rule
 * @property {String} cssRule.selectorText selector text targetted by given cssRule
 * @property {Object} cssRule.style style
 * @return {Boolean}
 */
function getIsOrientationLocked({ selectorText, style }) {
	if (!selectorText || style.length <= 0) {
		return false;
	}

	const transformStyle =
		style.transform || style.webkitTransform || style.msTransform || false;
	if (!transformStyle) {
		return false;
	}

	/**
	 * get last match/occurence of a transformation function that can affect rotation along Z axis
	 */
	const matches = transformStyle.match(
		/(rotate|rotateZ|rotate3d|matrix|matrix3d)\(([^)]+)\)(?!.*(rotate|rotateZ|rotate3d|matrix|matrix3d))/
	);
	if (!matches) {
		return false;
	}

	const [, transformFn, transformFnValue] = matches;
	const degrees = getRotationInDegrees(transformFn, transformFnValue);
	if (!degrees) {
		return false;
	}

	const locked = degrees % 90 === 0 && degrees % 180 !== 0;
	return !!locked;
}

/**
 * Interpolate rotation along the z axis from a given value to a transform function
 * @param {String} transformFunction CSS transformation function
 * @param {String} transformFnValue value applied to a transform function (contains a unit)
 * @returns {Number}
 */
function getRotationInDegrees(transformFunction, transformFnValue) {
	switch (transformFunction) {
		case 'rotate':
		case 'rotateZ':
			return getAngleInDegrees(transformFnValue);
		case 'rotate3d':
			const [, , z, angleWithUnit] = transformFnValue
				.split(',')
				.map(value => value.trim());
			if (parseInt(z) === 0) {
				// no transform is applied along z axis -> ignore
				return;
			}
			return getAngleInDegrees(angleWithUnit);
		case 'matrix':
		case 'matrix3d':
			return getAngleInDegreesFromMatrixTransform(transformFnValue);
		default:
			return;
	}
}

/**
 * Get angle in degrees from a transform value by interpolating the unit of measure
 * @param {String} angleWithUnit value applied to a transform function (Eg: 1turn)
 * @returns{Number|undefined}
 */
function getAngleInDegrees(angleWithUnit) {
	const [unit] = angleWithUnit.match(/(deg|grad|rad|turn)/);
	if (!unit) {
		return;
	}

	const angle = parseFloat(angleWithUnit.replace(unit, ``));
	switch (unit) {
		case 'rad':
			return convertRadToDeg(angle);
		case 'grad':
			return convertGradToDeg(angle);
		case 'turn':
			return convertTurnToDeg(angle);
		case 'deg':
		default:
			return parseInt(angle);
	}
}

/**
 * Get angle in degrees from a transform value applied to `matrix` or `matrix3d` transform functions
 * @param {String} transformFnValue value applied to a transform function (contains a unit)
 * @returns {Number}
 */
function getAngleInDegreesFromMatrixTransform(transformFnValue) {
	const values = transformFnValue.split(',');

	/**
	 * Matrix 2D
	 * Notes: https://css-tricks.com/get-value-of-css-rotation-through-javascript/
	 */
	if (values.length <= 6) {
		const [a, b] = values;
		const radians = Math.atan2(parseFloat(b), parseFloat(a));
		return convertRadToDeg(radians);
	}

	/**
	 * Matrix 3D
	 * Notes: https://drafts.csswg.org/css-transforms-2/#decomposing-a-3d-matrix
	 */
	const sinB = parseFloat(values[8]);
	const b = Math.asin(sinB);
	const cosB = Math.cos(b);
	const rotateZRadians = Math.acos(parseFloat(values[0]) / cosB);
	return convertRadToDeg(rotateZRadians);
}

/**
 * Convert angle specified in unit radians to degrees
 * See - https://drafts.csswg.org/css-values-3/#rad
 * @param {Number} radians radians
 * @return {Number}
 */
function convertRadToDeg(radians) {
	return parseInt(radians * (180 / Math.PI));
}

/**
 * Convert angle specified in unit grad to degrees
 * See - https://drafts.csswg.org/css-values-3/#grad
 * @param {Number} grad grad
 * @return {Number}
 */
function convertGradToDeg(grad) {
	grad = grad % 400;
	if (grad < 0) {
		grad += 400;
	}
	return parseInt((grad / 400) * 360);
}

/**
 * Convert angle specifed in unit turn to degrees
 * See - https://drafts.csswg.org/css-values-3/#turn
 * @param {Number} turn
 * @returns {Number}
 */
function convertTurnToDeg(turn) {
	return parseInt(360 / (1 / turn));
}

const { text } = axe.commons;

if (!axe._cache.get('context')) {
	const context = document.createElement('canvas').getContext('2d');
	axe._cache.set('context', context);
}
const offscreenContext = axe._cache.get('context');

const accText = text.accessibleText(node).toLowerCase();
if (text.isHumanInterpretable(accText) < 1) {
	return undefined;
}

// get all child text nodes
const textVNodes = getVisibleTextNodes(virtualNode);

performance.clearMarks();
performance.clearMeasures();

performance.mark('start');
textVNodes.forEach(textVNode => {
	const style = window.getComputedStyle(textVNode.parent.actualNode);

	// adjust the font-size to change the "population size" (gives more
	// accurate results but takes more time)
	const font = `5px ${style.getPropertyValue('font-family')}`;
	const curatedValue = text.sanitize(
		curateString(textVNode.actualNode.nodeValue)
	);
	const canvas = offscreenContext.canvas;

	// if the first character of the string draws significantly differently
	// than the entire string, we know it's a ligature font
	offscreenContext.font = font;
	const firstChar = curatedValue.charAt(0);
	const width = offscreenContext.measureText(firstChar).width;
	canvas.width = canvas.height = width;

	// changing the dimensions of the canvas resets all properties include font
	offscreenContext.font = font;
	offscreenContext.fillText(firstChar, 0, width / 2);
	const compareData = offscreenContext.getImageData(0, 0, width, width).data;

	offscreenContext.clearRect(0, 0, width, width);
	offscreenContext.fillText(curatedValue, 0, width / 2);
	const compareWith = offscreenContext.getImageData(0, 0, width, width).data;

	// compare how many differences in pixel data there are
	let differences = 0;
	let size = compareWith.length / 4;
	for (let i = 0; i < compareWith.length; i += 4) {
		for (let j = 0; j < 4; j++) {
			if (compareWith[i + j] !== compareData[i + j]) {
				differences++;
				break;
			}
		}
	}

	// statistical significance = 5%
	if (differences / size > 0.05) {
		console.log('statistically different!');
	}
});
performance.mark('end');
performance.measure('time', 'start', 'end');
console.log(performance.getEntriesByName('time')[0]);

const visibleText = text
	.sanitize(text.visibleVirtual(virtualNode))
	.toLowerCase();
if (text.isHumanInterpretable(visibleText) < 1) {
	if (isStringContained(visibleText, accText)) {
		return true;
	}
	return undefined;
}

return isStringContained(visibleText, accText);

function getVisibleTextNodes(vNode) {
	if (!axe.commons.dom.isVisible(vNode.actualNode)) {
		return;
	}

	let nodes = [];
	vNode.children.forEach(child => {
		if (child.actualNode.nodeType === 3) {
			const nodeValue = child.actualNode.nodeValue;
			const curatedValue = text.sanitize(curateString(nodeValue));
			if (curatedValue) {
				nodes.push(child);
			}
		} else {
			nodes = nodes.concat(getVisibleTextNodes(child));
		}
	});
	return nodes;
}

/**
 * Check if a given text exists in another
 *
 * @param {String} compare given text to check
 * @param {String} compareWith text against which to be compared
 * @returns {Boolean}
 */
function isStringContained(compare, compareWith) {
	const curatedCompareWith = curateString(compareWith);
	const curatedCompare = curateString(compare);
	if (!curatedCompareWith || !curatedCompare) {
		return false;
	}
	return curatedCompareWith.includes(curatedCompare);
}

/**
 * Curate given text, by removing emoji's, punctuations, unicode and trim whitespace.
 *
 * @param {String} str given text to curate
 * @returns {String}
 */
function curateString(str) {
	const noUnicodeStr = text.removeUnicode(str, {
		emoji: true,
		nonBmp: true,
		punctuations: true
	});
	return text.sanitize(noUnicodeStr);
}

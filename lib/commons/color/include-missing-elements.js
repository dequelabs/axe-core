import visuallyOverlaps from '../dom/visually-overlaps';
import { findUp } from '../dom/find-up-virtual';

/**
 * Include nodes missing from initial gathering because
 * document.elementsFromPoint misses some elements we need
 * i.e. TR is missing from table elementStack and leaves out bgColor
 * https://github.com/dequelabs/axe-core/issues/273
 * @private
 * @param {Array} elmStack
 * @param {Element} elm
 * @returns {Array}
 */
function includeMissingElements(elmStack, elm) {
	/*eslint max-depth:["error",7]*/
	const nodeName = elm.nodeName.toUpperCase();
	const elementMap = {
		TD: ['TR', 'THEAD', 'TBODY', 'TFOOT'],
		TH: ['TR', 'THEAD', 'TBODY', 'TFOOT'],
		INPUT: ['LABEL']
	};
	const tagArray = elmStack.map(elm => {
		return elm.nodeName.toUpperCase();
	});
	let bgNodes = elmStack;
	for (let candidate in elementMap) {
		// check that TR or LABEL has paired nodeName from elementMap, but don't expect elm to be that candidate
		if (tagArray.includes(candidate)) {
			for (
				let candidateIndex = 0;
				candidateIndex < elementMap[candidate].length;
				candidateIndex++
			) {
				// look up the tree for a matching candidate
				let ancestorMatch = findUp(elm, elementMap[candidate][candidateIndex]);
				if (ancestorMatch && elmStack.indexOf(ancestorMatch) === -1) {
					// found an ancestor not in elmStack, and it overlaps
					let overlaps = visuallyOverlaps(
						elm.getBoundingClientRect(),
						ancestorMatch
					);
					if (overlaps) {
						// if target is in the elementMap, use its position.
						bgNodes.splice(tagArray.indexOf(candidate) + 1, 0, ancestorMatch);
					}
				}
				// nodeName matches value
				// (such as LABEL, when matching itself. It should be in the list, but Phantom skips it)
				if (
					nodeName === elementMap[candidate][candidateIndex] &&
					tagArray.indexOf(nodeName) === -1
				) {
					bgNodes.splice(tagArray.indexOf(candidate) + 1, 0, elm);
				}
			}
		}
	}
	return bgNodes;
}

// TODO: this function is not part of the color API, but is needed in two
// different functions that are. once the color-contrast perf changes are in
// (https://github.com/dequelabs/axe-core/pull/1842), this function is no longer
// needed and can be removed
export default includeMissingElements;

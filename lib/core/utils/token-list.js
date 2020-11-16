/**
 * Converts space delimited token list to an Array
 * @method tokenList
 * @memberof axe.utils
 * @param  {String} str
 * @return {Array}
 */
function tokenList(str) {
	const trimedStr = (str || '').trim();
	if (!trimedStr) {
		return [];
	}

	return trimedStr.replace(/\s{2,}/g, ' ').split(' ');
}

export default tokenList;

/**
 * From a list of values, find the one with the greatest weight according to
 * the supplied map
 * @param  {object} params Contains 3 properties:
 * - map: a map indicating the order of values to run in
 *        example: ['small', 'medium', 'large']
 * - values: Array of values to take the highest from
 * - initial: optional starting value
 */
axe.utils.aggregate = function (map, values, initial) {
	values = values.slice();
	if (initial) {
		values.push(initial);
	}

	return values.sort((a, b) => {
		return map.indexOf(a) > map.indexOf(b);
	}).pop();
}


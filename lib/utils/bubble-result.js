

utils.bubbleResult = function bubbleResult(checks) {
	'use strict';
	var results = dqre.constants.result;

	if (!checks.length) {
		return results.NA;
	}

	var i, l, check, result;
	for (i = 0, l = checks.length; i < l; i++) {
		check = checks[i];
		if (check.value) {
			if (check.result === results.FAIL) {
				return check.result;
			} else if (check.result === results.WARN) {
				result = check.result;
			} else {
				if (result !== results.WARN) {
					result = check.result;
				}
			}
		}

	}

	return result || results.FAIL;
};
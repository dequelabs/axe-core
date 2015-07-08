/*global helpers */
helpers.formatChecks = function (nodeResult, data) {
	'use strict';

	nodeResult.any = data.any.map(helpers.formatCheck);
	nodeResult.all = data.all.map(helpers.formatCheck);
	nodeResult.none = data.none.map(helpers.formatCheck);
	return nodeResult;
};

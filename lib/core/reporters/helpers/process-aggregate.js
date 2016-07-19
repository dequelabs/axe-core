/*global helpers */
function normalizeRelatedNodes(node, xpath) {
	'use strict';
	['any','all','none'].forEach((type) => {
		if (!Array.isArray(node[type])) {
			return;
		}
		node[type].filter((checkRes) => Array.isArray(checkRes.relatedNodes))
		.forEach((checkRes) => {
			checkRes.relatedNodes = checkRes.relatedNodes.map((relatedNode) => {
				var res = {
					html: relatedNode.source,
					target: relatedNode.selector
				};
				if (xpath) {
					res.xpath = relatedNode.xpath;
				}
				return res;
			});
		});

	});
}

var resultKeys = axe.constants.resultGroups;
helpers.processAggregate = function (results, options) {
	var resultObject = axe.utils.aggregateResult(results);

	resultObject.timestamp = new Date().toISOString();
	resultObject.url = window.location.href;

	resultKeys.forEach(function (key) {
		resultObject[key] = (resultObject[key] || []).map(function (ruleResult) {
			ruleResult = Object.assign({}, ruleResult);

			if (Array.isArray(ruleResult.nodes) && ruleResult.nodes.length > 0) {
				ruleResult.nodes = ruleResult.nodes.map(function (subResult) {
					if (typeof subResult.node === 'object') {
						subResult.html = subResult.node.source;
						subResult.target = subResult.node.selector;

						if (options.xpath) {
							subResult.xpath = subResult.node.xpath;
						}
					}
					delete subResult.result;
					delete subResult.node;

					normalizeRelatedNodes(subResult, options.xpath);

					return subResult;
				});
			}

			resultKeys.forEach((key) => delete ruleResult[key]);
			delete ruleResult.pageLevel;
			delete ruleResult.result;

			return ruleResult;
		});
	});

	return resultObject;
};

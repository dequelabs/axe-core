function normalizeRelatedNodes(node) {
	'use strict';
	['any','all','none'].forEach((type) => {
		if (!Array.isArray(node[type])) {
			return;
		}
		node[type].filter((checkRes) => Array.isArray(checkRes.relatedNodes))
		.forEach((checkRes) => {
			checkRes.relatedNodes = checkRes.relatedNodes.map((relatedNode) => {
				return {
					html: relatedNode.source,
					target: relatedNode.selector
				};
			});
		});
		
	});
}

var resultKeys = ['violations', 'passes', 'inapplicable', 'cantTell'];
helpers.processAggregate = function (results) {
	var resultObject = axe.utils.aggregateResult(results);
	
	resultObject.timestamp = new Date().toISOString();
	resultObject.url = window.location.href;

	resultKeys.forEach(function (key) {
		resultObject[key] = (resultObject[key] || []).map(function (ruleResult) {
			ruleResult = Object.assign({}, ruleResult);

			if (Array.isArray(ruleResult[key]) && ruleResult[key].length > 0) {
				ruleResult.nodes = ruleResult[key].map(function (subResult) {
					if (typeof subResult.node === 'object') {
						subResult.html = subResult.node.source;
						subResult.target = subResult.node.selector;
					}
					delete subResult.result;
					delete subResult.node;

					normalizeRelatedNodes(subResult);

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

/**
 * Run a rule in a non-browser environment
 * @param {String} ruleId  Id of the rule
 * @param {VirtualNode} vNode  The virtual node to run the rule against
 * @param {Object} options  (optional) Set of options passed into rules or checks
 * @return {Object} axe results for the rule run
 */
axe.runVirtualRule = function(ruleId, vNode, options) {
	'use strict';
	let rule = axe._audit.rules.find(rule => rule.id === ruleId);

	if (!rule) {
		return;
	}

	// rule.prototype.gather will try to call axe.utils.isHidden which
	// in turn calls window.getComputedStyle if the rule does not exclude
	// hidden elements and tries to call. we can avoid this call by
	// forcing the rule to not exclude hidden elements
	rule = {
		...rule,
		excludeHidden: false
	};

	const context = {
		include: [
			{
				actualNode: vNode
			}
		]
	};

	const results = rule.runSync(context, options);
	axe.utils.publishMetaData(results);
	return results;
};

/**
 * Run a rule in a non-browser environment
 * @param {String} ruleId  Id of the rule
 * @param {Node}   node  The virtual node to run the rule against
 * @param {Object} options  (optional) Set of options passed into rules or checks
 * @returns {Object} axe results for the rule run
 */
axe.runVirtualRule = function(ruleId, node, options) {
	'use strict';
	let rule = axe._audit.rules.find(rule => rule.id === ruleId);

	if (!rule) {
		return null;
	}

	// rule.prototype.gather will try to call axe.utils.isHidden if the
	// rule does not exclude hidden elements. This function tries to call
	// window.getComputedStyle, so we can avoid this call by forcing the
	// rule to not exclude hidden elements
	rule.excludeHidden = false;

	const context = {
		include: [
			{
				actualNode: node
			}
		]
	};

	const results = rule.runSync(context, options);
	axe.utils.publishMetaData(results);
	return results;
};

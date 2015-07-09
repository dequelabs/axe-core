/*global axe */
var checks, commons;
axe._load = function(r) {
	commons = r.commons;
	checks = r.rules.reduce(function(acc, rule) {
		(rule.any.concat(rule.all).concat(rule.none)).forEach(function(check) {
			acc[check.id] = check;
		});
		return acc;
	}, {});
};

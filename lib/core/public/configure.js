function configureChecksRulesAndBranding(spec) {
	'use strict';
	var audit;

	audit = axe._audit;
	if (!audit) {
		throw new Error('No audit configured');
	}

	if (spec.checks) {
		spec.checks.forEach(function (check) {
			audit.addCheck(check);
		});
	}

	if (spec.rules) {
		spec.rules.forEach(function (rule) {
			audit.addRule(rule);
		});
	}

	if (typeof spec.branding !== 'undefined') {
		audit.setBranding(spec.branding);
	}

	if (spec.tagExclude) {
		audit.tagExclude = spec.tagExclude;
	}
}

axe.configure = configureChecksRulesAndBranding;

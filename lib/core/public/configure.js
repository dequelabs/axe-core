/* global reporters */
function configureChecksRulesAndBranding(spec) {
	'use strict';
	var audit;

	audit = axe._audit;
	if (!audit) {
		throw new Error('No audit configured');
	}

	if (spec.reporter && (typeof spec.reporter === 'function' || reporters[spec.reporter])) {
		audit.reporter = spec.reporter;
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
	} else {
		audit._constructHelpUrls();
	}

	if (spec.tagExclude) {
		audit.tagExclude = spec.tagExclude;
	}
}

axe.configure = configureChecksRulesAndBranding;

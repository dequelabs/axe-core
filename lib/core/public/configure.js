/* global reporters */
function configureChecksRulesAndBranding(spec) {
	/*eslint max-statements: ["error",20]*/
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

	const modifiedRules = [];
	if (spec.rules) {
		spec.rules.forEach(function (rule) {
			modifiedRules.push(rule.id);
			audit.addRule(rule);
		});
	}

	if (spec.disableOtherRules) {
		audit.rules.forEach(rule => {
			if (modifiedRules.includes(rule.id) === false) {
				rule.enabled = false;
			}
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

	// handle preload
	if (typeof spec.preload !== 'undefined') {
		// preload assets requested
		let requestedAssets = null;
		let requestedAssetsTimeout = axe.contants.preloadDefaultTimeout;
		if (spec.preload.assets !== 'undefined' && Array.isArray(spec.preload.assets) && spec.preload.assets.length > 0) {
			requestedAssets = spec.preload.assets
		} else {
			throw new Error('preload configuration property is wrongly set-up.');
		}
	}

}

axe.configure = configureChecksRulesAndBranding;

/*global reporters, injectStyle */
axe.configure = function (spec) {
	/*jshint maxstatements:17 */
	'use strict';

	var audit = axe._audit;
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

	if (spec.tools) {
		spec.tools.forEach(function (tool) {
			audit.addTool(tool);
		});
	}

	if (spec.finders) {
		spec.finders.forEach(function (finder) {
			audit.addFinder(finder);
		});
	}

	if (spec.listeners) {
		spec.listeners.forEach(function (listener) {
			audit.addListener(listener);
		});
	}

	if (spec.style) {
		injectStyle(spec.style);
	}

};

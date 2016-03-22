/*global reporters */
function configureChecksRulesAndBranding(spec, resolve, reject) {
	'use strict';

	var audit = axe._audit;
	if (!audit) {
		throw new Error('No audit configured');
	}

	/*
	 * set up noop functions in case caller wants to use this synchronously
	 */
	reject = reject || function () {};
	resolve = resolve || function () {};

	var q = axe.utils.queue();
	var configErrors = [];

	q.defer(function (res) {
		var rej = function (err) {
			configErrors.push(err);
			res();
		};
		try {
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

			audit.setBranding(spec.branding);
			res();
		} catch(err) {
			rej(err);
		}
	});


	// tell all the frames to also load the configuration
	axe.utils.toArray(document.querySelectorAll('frame, iframe')).forEach(function (frame) {
		q.defer(function (res, rej) {
			return axe.utils.sendCommandToFrame(frame, {
				command: 'configure',
				spec: spec
			}, res, rej);
		});
	});

	q.then(function () {
		if (configErrors.length === 0) {
			resolve();
		} else {
			reject(configErrors);
		}
	})
	.catch(reject);
}

axe.configure = configureChecksRulesAndBranding;

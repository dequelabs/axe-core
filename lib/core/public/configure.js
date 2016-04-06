function configureChecksRulesAndBranding(spec, resolve, reject) {
	'use strict';
	var frames= [], audit, q, configErrors;

	audit = axe._audit;
	if (!audit) {
		throw new Error('No audit configured');
	}
	
	if (document) {
		frames = axe.utils.toArray(document.querySelectorAll('frame, iframe')).filter(function (el) {
			return !axe.utils.areStylesSet(el, [{
				property: 'visibility',
				value: 'hidden'
			},{
				property: 'display',
				value: 'none'
			}], 'body');
		});
	}
	/*
	 * If there are visible frames, force async
	 */
	if (frames.length && !resolve) {
		throw new Error('there are visble frames on the page, please pass in a resolve function');
	}
	/*
	 * set up noop functions in case caller wants to use this synchronously
	 */
	reject = reject || function () {};
	resolve = resolve || function () {};

	q = axe.utils.queue();
	configErrors = [];

	q.defer(function (res) {
		var rej = function (err) {
			configErrors.push(err);
			res();
		};
		try {
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
			res();
		} catch(err) {
			rej(err);
		}
	});


	// tell all the frames to also load the configuration
	frames.forEach(function (frame) {
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

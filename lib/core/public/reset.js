/*global axe */
function resetConfiguration(resolve, reject) {
	'use strict';
	var audit, frames, q, resetErrors;

	audit = axe._audit;
	if (!audit) {
		throw new Error('No audit configured');
	}
	frames = axe.utils.toArray(document.querySelectorAll('frame, iframe')).filter(function (frame) {
		return !axe.utils.areStylesSet(frame, [{
			property: 'visibility',
			value: 'hidden'
		},{
			property: 'display',
			value: 'none'
		}], 'body');
	});
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

	resetErrors = [];

	q.defer(function (res) {
		var rej = function (err) {
			resetErrors.push(err);
			res();
		};
		try {
			res(audit.resetRulesAndChecks());
		} catch(err) {
			rej(err);
		}
	});

	frames.forEach(function (frame) {
		q.defer(function (res, rej) {
			return axe.utils.sendCommandToFrame(frame, {
				command: 'reset'
			}, res, rej);
		});
	});

	q.then(function () {
		if (resetErrors.length === 0) {
			resolve();
		} else {
			reject(resetErrors);
		}
	})
	.catch(reject);
}

axe.reset = resetConfiguration;
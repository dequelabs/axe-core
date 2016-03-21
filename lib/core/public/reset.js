/*global axe */
function resetConfiguration(resolve, reject) {
	'use strict';
	var audit = axe._audit;
	if (!audit) {
		throw new Error('No audit configured');
	}
	var q = axe.utils.queue();
	// If a plugin fails it's cleanup, we still want the others to run
	var resetErrors = [];

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

	axe.utils.toArray(document.querySelectorAll('frame, iframe')).forEach(function (frame) {
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
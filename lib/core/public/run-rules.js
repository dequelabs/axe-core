/*global Context, getReporter, Promise */
/*exported runRules */

/**
 * Starts analysis on the current document and its subframes
 * @private
 * @param  {Object}   context  The `Context` specification object @see Context
 * @param  {Array}    options  Optional RuleOptions
 * @param  {Function} callback The function to invoke when analysis is complete; receives an array of `RuleResult`s
 */
function runRules(context, options, resolve, reject) {
	'use strict';
	context = new Context(context);

	var q = utils.queue();
	var audit = axe._audit;

	if (context.frames.length) {
		q.defer(function (res, rej) {
			utils.collectResultsFromFrames(context, options, 'rules', null, res, rej);
		});
	}
	q.defer(function (res, rej) {
		audit.run(context, options, res, rej);
	});
	q.then(function (data) {
		// Add wrapper object so that we may use the same "merge" function for results from inside and outside frames
		var results = utils.mergeResults(data.map(function (d) {
			return {
				results: d
			};
		}));

		// after should only run once, so ensure we are in the top level window
		if (context.initiator) {
			results = audit.after(results, options);
			results = results.map(utils.finalizeRuleResult);
		}

		resolve(results);
	}).catch(reject);
}

axe._runRules = runRules;

axe.a11yCheck = function (context, options, callback) {
	'use strict';
	if (typeof options === 'function') {
		callback = options;
		options = {};
	}

	if (!options || typeof options !== 'object') {
		options = {};
	}

	var audit = axe._audit;
	if (!audit) {
		throw new Error('No audit configured');
	}
	var reporter = getReporter(options.reporter || audit.reporter);
	runRules(context, options, function (results) {
		reporter(results, callback);
	}, function () {});
};

axe.run = function (arg1, arg2, arg3) {
	'use strict';
	var context, options, callback;
	var typeErr = new TypeError('axe.run arguments are invalid');

	// Determine the context
	if (typeof arg1 ===  'string' || Array.isArray(arg1) ||
		(typeof arg1 === 'object' &&
			(arg1.include !== undefined || arg1.exclude !== undefined))) {
		context = arg1;
	} else if (arg3 === undefined) {
		// Set default and shift one over
		context = document;
		arg3 = arg2;
		arg2 = arg1;
	} else {
		throw typeErr;
	}

	// Determine the options
	if (typeof arg2 === 'object') {
		options = arg2;
	} else if (arg3 === undefined) {
		// Set default and shift one over
		options = {};
		arg3 = arg2;
	} else {
		throw typeErr;
	}

	// Set the callback or noop;
	if (typeof arg3 === 'function' || arg3 === undefined) {
		callback = arg3 || function () {};
	} else {
		throw typeErr;
	}

	var p, reject, resolve;
	if (window.Promise) {
		p = new Promise(function (_resolve, _reject) {
			reject = _reject;
			resolve = _resolve;
		});
	}

	axe._runRules(context, options, function (result) {
		callback(null, result);
		resolve(result);
	}, function (err) {
		callback(err);
		reject(err);
	});

	return p;
};
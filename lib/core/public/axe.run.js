/* global Promise, getReporter */

function isContext(potential) {
	'use strict';
	switch (true) {
		case (typeof potential === 'string'):
		case (Array.isArray(potential)):
		case Node && potential instanceof Node:
		case NodeList && potential instanceof NodeList:
			return true;

		case typeof potential !== 'object':
			return false;

		case potential.include !== undefined:
		case potential.exclude !== undefined:
		case typeof potential.length === 'number':
			return true;

		default:
			return false;
	}
}

axe.run = function (arg1, arg2, arg3) {
	// jshint maxstatements:25
	'use strict';
	if (!axe._audit) {
		throw new Error('No audit configured');
	}

	var context, options, callback;
	var typeErr = new TypeError('axe.run arguments are invalid');
	var noop = function () {};

	// Determine the context
	if (isContext(arg1)) {
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
		callback = arg3 || noop;
	} else {
		throw typeErr;
	}

	var p;
	var reject = noop;
	var resolve = noop;

	if (window.Promise && callback === noop) {
		p = new Promise(function (_resolve, _reject) {
			reject = _reject;
			resolve = _resolve;
		});
	}

	axe._runRules(context, options, function (rawResults) {
		var reporter = getReporter(options.reporter || axe._audit.reporter);
		try {
			reporter(rawResults, function (results) {
				callback(null, results);
				resolve(results);
			});
		} catch (err) {
			callback(err);
			reject(err);
		}
	}, function (err) {
		callback(err);
		reject(err);
	});

	return p;
};
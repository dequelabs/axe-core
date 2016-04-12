/* global Promise */

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


/**
 * Normalize the optional params of axe.run()
 * @param  {object}   context
 * @param  {object}   options
 * @param  {Function} callback
 * @return {object}            With 3 keys: context, options, callback
 */
function normalizeRunParams(context, options, callback) {
	var typeErr = new TypeError('axe.run arguments are invalid');
	var noop = function () {};

	// Determine the context
	if (!isContext(context)) {
		if (callback !== undefined) {
			// Either context is invalid or there are too many params
			throw typeErr;
		}
		// Set default and shift one over
		callback = options;
		options = context;
		context = document;
	}

	// Determine the options
	if (typeof options !== 'object') {
		if (callback !== undefined) {
			// Either options is invalid or there are too many params
			throw typeErr;
		}
		// Set default and shift one over
		callback = options;
		options = {};
	}

	// Set the callback or noop;
	if (typeof callback === 'function' || callback === undefined) {
		callback = callback || noop;
	} else {
		throw typeErr;
	}
	return {
		context: context,
		options: options,
		callback: callback
	};
}


/**
 * Runs a number of rules against the provided HTML page and returns the
 * resulting issue list
 *
 * @param  {Object}   context  (optional) Defines the scope of the analysis
 * @param  {Object}   options  (optional) Set of options passed into rules or checks
 * @param  {Function} callback (optional) The callback when axe is done, given 2 params:
 *                             - Error    If any errors occured, otherwise null
 *                             - Results  The results object / array, or undefined on error
 * @return {Promise}           Resolves with the axe results. Only available when natively supported
 */
axe.run = function (context, options, callback) {
	if (!axe._audit) {
		throw new Error('No audit configured');
	}
	var args = normalizeRunParams(context, options, callback);
	context = args.context;
	options = args.options;
	callback = args.callback;

	// set defaults:
	options.reporter = options.reporter || 'v1';

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
		var respond = function (results) {
			callback(null, results);
			resolve(results);
		};

		try {
			var reporter = axe.getReporter(options.reporter);
			var results = reporter(rawResults, respond);
			if (results !== undefined) {
				respond(results);
			}
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
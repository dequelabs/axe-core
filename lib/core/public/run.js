import { getReporter } from './reporter';
import { getAudit } from '../globals';
import { performanceTimer } from '../utils';
import runRules from './run-rules';
import log from '../log';

function isContext(potential) {
	'use strict';
	switch (true) {
		case typeof potential === 'string':
		case Array.isArray(potential):
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

const noop = function() {};
let running = false;

/**
 * Normalize the optional params of axe.run()
 * @param  {object}   context
 * @param  {object}   options
 * @param  {Function} callback
 * @return {object}            With 3 keys: context, options, callback
 */
function normalizeRunParams(context, options, callback) {
	'use strict';
	let typeErr = new TypeError('axe.run arguments are invalid');

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
	if (typeof callback !== 'function' && callback !== undefined) {
		throw typeErr;
	}

	return {
		context: context,
		options: options,
		callback: callback || noop
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
function run(context, options, callback) {
	const audit = getAudit();
	if (!audit) {
		throw new Error('No audit configured');
	}

	let args = normalizeRunParams(context, options, callback);
	context = args.context;
	options = args.options;
	callback = args.callback;

	// set defaults:
	options.reporter = options.reporter || audit.reporter || 'v1';

	if (options.performanceTimer) {
		performanceTimer.start();
	}
	let p;
	let reject = noop;
	let resolve = noop;

	if (typeof Promise === 'function' && callback === noop) {
		p = new Promise(function(_resolve, _reject) {
			reject = _reject;
			resolve = _resolve;
		});
	}

	if (running) {
		const err =
			'Axe is already running. Use `await axe.run()` to wait ' +
			'for the previous run to finish before starting a new run.';
		callback(err);
		reject(err);
		return p;
	}

	running = true;
	runRules(
		context,
		options,
		function(rawResults, cleanup) {
			let respond = function(results) {
				running = false;
				cleanup();
				try {
					callback(null, results);
				} catch (e) {
					log(e);
				}
				resolve(results);
			};
			if (options.performanceTimer) {
				performanceTimer.end();
			}

			try {
				let reporter = getReporter(options.reporter);
				let results = reporter(rawResults, options, respond);
				if (results !== undefined) {
					respond(results);
				}
			} catch (err) {
				running = false;
				cleanup();
				callback(err);
				reject(err);
			}
		},
		function(err) {
			running = false;
			callback(err);
			reject(err);
		}
	);

	return p;
}

export default run;

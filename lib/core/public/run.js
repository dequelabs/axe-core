import { getReporter } from './reporter';
import normalizeRunParams from './run/normalize-run-params';
import { setupGlobals } from './run/globals-setup';
import { assert } from '../utils';
import performanceTimer from '../utils/performance-timer';

const noop = () => {};

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
export default function run(...args) {
  setupGlobals(args[0]);
  const { context, options, callback = noop } = normalizeRunParams(args);
  const { thenable, resolve, reject } = getPromiseHandlers(callback);
  try {
    assert(axe._audit, 'No audit configured');
    assert(
      !axe._running,
      'Axe is already running. Use `await axe.run()` to wait ' +
        'for the previous run to finish before starting a new run.'
    );
  } catch (e) {
    return handleError(e, callback);
  }

  axe._running = true;
  if (options.performanceTimer) {
    performanceTimer.start();
  }

  function handleRunRules(rawResults, teardown) {
    const respond = results => {
      if (options.performanceTimer) {
        performanceTimer.mark('reporterEnd');
        performanceTimer.measure('reporter', 'reporterStart', 'reporterEnd');
        performanceTimer.logMeasures('reporter');
        performanceTimer.end();
      }
      axe._running = false;
      teardown();
      try {
        resolve(results);
      } catch (e) {
        axe.log(e);
      }
    };
    const wrappedReject = err => {
      axe._running = false;
      teardown();
      try {
        reject(err);
      } catch (e) {
        axe.log(e);
      }
    };

    try {
      if (options.performanceTimer) {
        performanceTimer.mark('reporterStart');
      }
      createReport(rawResults, options, respond, wrappedReject);
    } catch (err) {
      wrappedReject(err);
    }
  }

  function errorRunRules(err) {
    if (options.performanceTimer) {
      performanceTimer.end();
    }
    axe._running = false;
    callback(err);
    reject(err);
  }

  axe._runRules(context, options, handleRunRules, errorRunRules);
  return thenable;
}

function getPromiseHandlers(callback) {
  let thenable, reject, resolve;
  if (typeof Promise === 'function' && callback === noop) {
    thenable = new Promise((_resolve, _reject) => {
      reject = _reject;
      resolve = _resolve;
    });
  } else {
    resolve = result => callback(null, result);
    reject = err => callback(err);
  }
  return { thenable, reject, resolve };
}

function createReport(rawResults, options, respond, reject) {
  const reporter = getReporter(options.reporter);
  const results = reporter(rawResults, options, respond, reject);
  if (results !== undefined) {
    respond(results);
  }
}

function handleError(err, callback) {
  if (typeof callback === 'function' && callback !== noop) {
    callback(err.message);
    return;
  }
  throw err;
}

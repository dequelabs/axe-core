import Audit from '../base/audit';
import cleanup from './cleanup';
import runRules from './run-rules';
import respondable from '../utils/respondable';
import nodeSerializer from '../utils/node-serializer';

/**
 * Sets up Rules, Messages and default options for Checks, must be invoked before attempting analysis
 * @param  {Object} audit The "audit specification" object
 * @private
 */
export default function load(audit) {
  axe._audit = new Audit(audit);
}

function runCommand(data, keepalive, callback) {
  const resolve = callback;
  const reject = function reject(err) {
    if (err instanceof Error === false) {
      err = new Error(err);
    }
    callback(err);
  };

  const context = (data && data.context) || {};
  if (context.hasOwnProperty('include') && !context.include.length) {
    context.include = [document];
  }
  const options = (data && data.options) || {};

  switch (data.command) {
    case 'rules':
      return runRules(
        context,
        options,
        (results, cleanupFn) => {
          // Serialize all DqElements
          results = nodeSerializer.mapRawResults(results);
          resolve(results);
          // Cleanup AFTER resolve so that selectors can be generated
          cleanupFn();
        },
        reject
      );
    case 'cleanup-plugin':
      return cleanup(resolve, reject);
    default:
      // go through the registered commands
      if (
        axe._audit &&
        axe._audit.commands &&
        axe._audit.commands[data.command]
      ) {
        return axe._audit.commands[data.command](data, callback);
      }
  }
}

if (window.top !== window) {
  respondable.subscribe('axe.start', runCommand);
  respondable.subscribe('axe.ping', (data, keepalive, respond) => {
    respond({
      axe: true
    });
  });
}

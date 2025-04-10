import { clone, isContextSpec } from '../../utils';

/**
 * Normalize the optional params of axe.run()
 * @param  {object}   context
 * @param  {object}   options
 * @param  {Function} callback
 * @return {object}            With 3 keys: context, options, callback
 */
export default function normalizeRunParams([context, options, callback]) {
  const typeErr = new TypeError('axe.run arguments are invalid');

  // Determine the context
  if (!isContextSpec(context)) {
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

  options = clone(options);
  options.reporter = options.reporter ?? axe._audit?.reporter ?? 'v1';
  return { context, options, callback };
}

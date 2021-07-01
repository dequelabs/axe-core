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

  options.reporter = options.reporter ?? axe._audit?.reporter ?? 'v1';
  return { context, options, callback };
}

export function isContext(potential) {
  switch (true) {
    case typeof potential === 'string':
    case Array.isArray(potential):
    case window.Node && potential instanceof window.Node:
    case window.NodeList && potential instanceof window.NodeList:
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

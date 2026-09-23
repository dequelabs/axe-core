export const reporters = {};

export function hasReporter(reporterName) {
  return reporters.hasOwnProperty(reporterName);
}

export function getReporter(reporter) {
  if (typeof reporter === 'string' && reporters[reporter]) {
    return reporters[reporter];
  }

  if (typeof reporter === 'function') {
    return reporter;
  }

  return reporters.v1;
}

/**
 * Register a reporter by name.
 * @param {String} name Name to use as the `reporter` option
 * @param {Function} cb The reporter function
 * @param {Boolean} [isDefault] Also make it the reporter used when none is passed,
 * as `axe.configure({ reporter: name })` does. `axe.reset()` restores the default.
 */
export function addReporter(name, cb, isDefault) {
  reporters[name] = cb;
  if (isDefault) {
    axe.configure({ reporter: name });
  }
}

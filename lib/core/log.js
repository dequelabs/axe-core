let logger;

/**
 * Logs a message to the developer console (if it exists and is active).
 */
export default function log(...args) {
  if (logger) {
    logger(...args);
  } else if (typeof console === 'object' && console.log) {
    console.log(...args);
  }
}

/**
 * Set the logger. Exposed for testing.
 * @private
 */
export function setLogger(fn) {
  logger = fn;
}

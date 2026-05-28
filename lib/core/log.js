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

export function setLogger(fn) {
  logger = fn;
}

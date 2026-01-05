import constants from '../constants';

/**
 * Serializes an error to a JSON object
 * @param e - The error to serialize
 * @returns A JSON object representing the error
 */
export default function serializeError(err, iteration = 0) {
  if (typeof err !== 'object' || err === null) {
    return { message: String(err) };
  }
  const serial = {};
  for (const prop of constants.serializableErrorProps) {
    if (['string', 'number', 'boolean'].includes(typeof err[prop])) {
      serial[prop] = err[prop];
    }
  }
  // Recursively serialize cause up to 10 levels deep
  if (err.cause) {
    serial.cause =
      iteration < 10 ? serializeError(err.cause, iteration + 1) : '...';
  }
  return serial;
}

/**
 * Serializes an error to a JSON object
 * @param e - The error to serialize
 * @returns A JSON object representing the error
 */
export default function serializeError(err, iteration = 0) {
  if (typeof err !== 'object' || err === null) {
    return { message: String(err) };
  }
  const serial = { ...err }; // Copy all "own" properties
  // Copy error.message / name / stack, these don't serialize otherwise
  for (const prop of ['message', 'stack', 'name']) {
    if (typeof err[prop] === 'string') {
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

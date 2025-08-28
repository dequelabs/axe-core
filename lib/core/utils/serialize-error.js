/**
 * Serializes an error to a JSON object
 * @param e - The error to serialize
 * @returns A JSON object representing the error
 */
export default function serializeError(e, iteration = 0) {
  if (typeof e !== 'object' || e === null) {
    return { message: String(e) };
  }
  const err = e; // Instead of "object"}
  const serial = { ...err };
  delete serial.errorNode; // We expose this separately
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

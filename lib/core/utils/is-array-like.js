/**
 * Checks if a value is array-like.
 *
 * @param {any} arr - The value to check.
 * @returns {boolean} - Returns true if the value is array-like, false otherwise.
 */
export default function isArrayLike(arr) {
  return (
    !!arr &&
    typeof arr === 'object' &&
    typeof arr.length === 'number' &&
    // Avoid DOM weirdness
    arr instanceof window.Node === false
  );
}

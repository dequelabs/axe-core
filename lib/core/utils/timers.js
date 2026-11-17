/*
 * Keep a reference to the timer functions as they were when axe-core loaded.
 * Test tools such as `jest.useFakeTimers()` or `sinon.useFakeTimers()` replace
 * the globals after axe has loaded, and since axe waits on `setTimeout`
 * between rules, `axe.run` would otherwise never resolve.
 * @see https://github.com/dequelabs/axe-core/issues/3055
 */
const originalSetTimeout = globalThis.setTimeout;
const originalClearTimeout = globalThis.clearTimeout;

/**
 * Call `setTimeout` as it was when axe-core loaded, unaffected by fake timers
 * installed afterwards.
 * @private
 * @param {Function} callback Function to call once the timer expires
 * @param {Number} [delay] Number of milliseconds to wait
 * @param {...*} [args] Arguments to pass to the callback
 * @return {*} Timer ID to pass to `clearAxeTimeout`
 */
export function setAxeTimeout(callback, delay, ...args) {
  return originalSetTimeout.call(globalThis, callback, delay, ...args);
}

/**
 * Call `clearTimeout` as it was when axe-core loaded, to cancel a timer
 * started by `setAxeTimeout`.
 * @private
 * @param {*} timeoutId Timer ID returned by `setAxeTimeout`
 */
export function clearAxeTimeout(timeoutId) {
  return originalClearTimeout.call(globalThis, timeoutId);
}

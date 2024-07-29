import queue from './queue';
import sendCommandToFrame from './send-command-to-frame';
import mergeResults from './merge-results';

/**
 * Sends a message to axe running in frames to start analysis and collate results (via `mergeResults`)
 * @private
 * @param  {Context}  parentContent   The resolved Context object
 * @param  {Object}   options   Options object (as passed to `runRules`)
 * @param  {string}   command   Command sent to all frames
 * @param  {Array}    parameter Array of values to be passed along side the command
 * @param  {Function} callback  Function to call when results from all frames have returned
 */
export default function collectResultsFromFrames(
  parentContent,
  options,
  command,
  parameter,
  resolve,
  reject
) {
  // elementRefs can't be passed across frame boundaries
  options = { ...options, elementRef: false };

  const q = queue();
  const frames = parentContent.frames;

  // Tell each axe running in each frame to collect results
  frames.forEach(({ node: frameElement, ...context }) => {
    q.defer((res, rej) => {
      const params = { options, command, parameter, context };
      function callback(results) {
        if (!results) {
          return res(null);
        }
        return res({ results, frameElement });
      }

      sendCommandToFrame(frameElement, params, callback, rej);
    });
  });

  // Combine results from all frames and give it back
  q.then(data => {
    resolve(mergeResults(data, options));
  }).catch(reject);
}

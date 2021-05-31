import { getReporter } from './reporter';
import { setupGlobals, resetGlobals } from './run/globals-setup';
import { DqElement } from '../utils';
import Context from '../base/context';
import teardown from './teardown';
import {
  getSelectorData,
  performanceTimer,
  mergeResults,
  publishMetaData,
  finalizeRuleResult
} from '../utils';

export function runInWindow(
  context = document,
  options = {},
  initiator = false
) {
  // TODO: Identify when something is running in the initiator window.
  // TODO: Better default arguments

  // assert(axe._audit, 'No audit configured')
  // assert(!axe._running,
  //   'Axe is already running. Use `await axe.run()` to wait ' +
  //   'for the previous run to finish before starting a new run.'
  // );

  return new Promise((res, rej) => {
    // Setup(), using the context
    setupGlobals();
    context = new Context(context);
    axe._tree = context.flatTree;
    axe._selectorData = getSelectorData(context.flatTree);
    // Run axe
    axe._audit.run(context, options, res, rej);
  })
    .then(data => {
      // TODO: Proper copy with .toJSON call instead of this;
      const results = JSON.parse(JSON.stringify(data));
      const frames = getFrameData(context, options);
      return { results, frames, initiator };
    })
    .finally(() => {
      resetGlobals();
      teardown();
    });
}

export function combineResults(data, options = {}) {
  setFrameSpec(data);
  let results = mergeResults(data);

  results = axe._audit.after(results, options);
  results.forEach(publishMetaData);
  results = results.map(finalizeRuleResult);

  return new Promise(resolve => {
    const reporter = getReporter(options.reporter || 'v1');
    reporter(results, options, resolve);
  });
}

function getFrameData(context, options) {
  // focusable: parentContent.focusable === false ? false : focusable,
  // boundingClientRect: {
  //   width: width,
  //   height: height
  // },

  return context.frames.map(({ node }) => {
    return { spec: new DqElement(node, options).toJSON() };
  });
}

function setFrameSpec(data) {
  let frameStack = [];
  for (let winResults of data) {
    winResults.frameSpec = frameStack.shift() || null;
    frameStack.unshift(...winResults.frames);
  }
}

// 0. Top Window
//   1. iframe
//   2. iirame
//     3. iframe
//     4. iframe
//       5. iframe
//   6. iframe

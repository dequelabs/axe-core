import { getReporter } from './reporter';
import {
  mergeResults,
  publishMetaData,
  finalizeRuleResult,
  DqElement,
  clone
} from '../utils';

export default function finishRun(partialResults, options = {}) {
  options = clone(options);
  const { environmentData } = partialResults.find(r => r.environmentData) || {};

  // normalize the runOnly option for the output of reporters toolOptions
  axe._audit.normalizeOptions(options);
  options.reporter = options.reporter ?? axe._audit?.reporter ?? 'v1';

  setFrameSpec(partialResults);
  let results = mergeResults(partialResults);
  results = axe._audit.after(results, options);
  results.forEach(publishMetaData);
  results = results.map(finalizeRuleResult);

  return createReport(results, { environmentData, ...options });
}

function setFrameSpec(partialResults) {
  const frameStack = [];
  for (const partialResult of partialResults) {
    const frameSpec = frameStack.shift();
    if (!partialResult) {
      continue;
    }

    partialResult.frameSpec = frameSpec ?? null;
    const frameSpecs = getMergedFrameSpecs(partialResult);
    frameStack.unshift(...frameSpecs);
  }
}

function getMergedFrameSpecs({
  frames: childFrameSpecs,
  frameSpec: parentFrameSpec
}) {
  if (!parentFrameSpec) {
    return childFrameSpecs;
  }
  // Include the selector/ancestry/... from the parent frames
  return childFrameSpecs.map(childFrameSpec => {
    return DqElement.mergeSpecs(childFrameSpec, parentFrameSpec);
  });
}

function createReport(results, options) {
  return new Promise(resolve => {
    const reporter = getReporter(options.reporter);
    reporter(results, options, resolve);
  });
}

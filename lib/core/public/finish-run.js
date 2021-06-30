import { getReporter } from './reporter';
import {
  mergeResults,
  publishMetaData,
  finalizeRuleResult,
  DqElement
} from '../utils';

export default function finishRun(partialResults, options = {}) {
  partialResults = Array.isArray(partialResults)
    ? partialResults
    : [partialResults];

  setFrameSpec(partialResults);
  let results = mergeResults(partialResults);
  results = axe._audit.after(results, options);
  results.forEach(publishMetaData);
  results = results.map(finalizeRuleResult);

  return createReport(results, options);
}

function setFrameSpec(partialResults) {
  const frameStack = [];
  for (const partialResult of partialResults) {
    partialResult.frameSpec = frameStack.shift() ?? null;
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

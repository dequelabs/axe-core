import { processAggregate, failureSummary } from './helpers';
import { getEnvironmentData, performanceTimer } from '../utils';

const v1Reporter = (results, options, callback) => {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  const { environmentData, ...toolOptions } = options;

  if (options.performanceTimer) {
    performanceTimer.mark('generateSelector:start');
  }

  const out = processAggregate(results, options);

  if (options.performanceTimer) {
    performanceTimer.mark('generateSelector:end');
    performanceTimer.measure('generateSelector', 'generateSelector:start', 'generateSelector:end');
    const req = performance.getEntriesByName('generateSelector')[0];
    console.log('Measure ' + req.name + ' took ' + req.duration + 'ms');
  }

  const addFailureSummaries = result => {
    result.nodes.forEach(nodeResult => {
      nodeResult.failureSummary = failureSummary(nodeResult);
    });
  };

  out.incomplete.forEach(addFailureSummaries);
  out.violations.forEach(addFailureSummaries);

  callback({
    ...getEnvironmentData(environmentData),
    toolOptions,
    ...out
  });
};

export default v1Reporter;

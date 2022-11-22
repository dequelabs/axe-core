import { processAggregate, failureSummary } from './helpers';
import { getEnvironmentData } from '../utils';

const v1Reporter = (results, options, callback) => {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  const { environmentData, ...toolOptions } = options;
  const out = processAggregate(results, options);

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

import { processAggregate } from './helpers';
import { getEnvironmentData } from '../utils';

const noPassesReporter = (results, options, callback) => {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  const environmentData = options.environmentData;
  delete options.environmentData
  // limit result processing to types we want to include in the output
  options.resultTypes = ['violations'];

  var out = processAggregate(results, options);

  callback({
    ...getEnvironmentData(environmentData),
    toolOptions: options,
    violations: out.violations
  });
};

export default noPassesReporter;

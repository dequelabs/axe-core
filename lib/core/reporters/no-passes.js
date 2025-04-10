import { processAggregate } from './helpers';
import { getEnvironmentData } from '../utils';

const noPassesReporter = (results, options, callback) => {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  const { environmentData, ...toolOptions } = options;
  // limit result processing to types we want to include in the output
  options.resultTypes = ['violations'];

  const { violations } = processAggregate(results, options);

  callback({
    ...getEnvironmentData(environmentData),
    toolOptions,
    violations
  });
};

export default noPassesReporter;

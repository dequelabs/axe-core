import { processAggregate } from './helpers';
import { getEnvironmentData } from '../utils';

// @deprecated
const naReporter = (results, options, callback) => {
  console.warn(
    '"na" reporter will be deprecated in axe v4.0. Use the "v2" reporter instead.'
  );
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  const { environmentData, ...toolOptions } = options;
  callback({
    ...getEnvironmentData(environmentData),
    toolOptions,
    ...processAggregate(results, options)
  });
};

export default naReporter;

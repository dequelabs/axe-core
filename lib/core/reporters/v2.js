import { processAggregate } from './helpers';
import { getEnvironmentData, getSelector } from '../utils';

const v2Reporter = (results, options, callback) => {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  const { environmentData, ...toolOptions } = options;
  const out = processAggregate(results, options);
  getSelector._logTime();
  callback({
    ...getEnvironmentData(environmentData),
    toolOptions,
    ...out
  });
};

export default v2Reporter;

import { processAggregate } from './helpers';
import { getEnvironmentData } from '../utils';

const v2Reporter = (results, options, callback) => {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  const { environmentData, ...toolOptions } = options;
  var out = processAggregate(results, options);
  callback({
    ...getEnvironmentData(environmentData),
    toolOptions,
    ...out
  });
};

export default v2Reporter;

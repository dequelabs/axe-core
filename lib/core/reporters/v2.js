import { processAggregate } from './helpers';
import { getEnvironmentData, performanceTimer } from '../utils';

const v2Reporter = (results, options, callback) => {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  const { environmentData, ...toolOptions } = options;
  if (options.performanceTimer) {
    performance.mark('generateSelector:start');
  }

  const out = processAggregate(results, options);

  if (options.performanceTimer) {
    performance.mark('generateSelector:end');
    performance.measure('generateSelector', 'generateSelector:start', 'generateSelector:end');
  }
  callback({
    ...getEnvironmentData(environmentData),
    toolOptions,
    ...out
  });
};

export default v2Reporter;

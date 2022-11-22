import { getEnvironmentData } from '../utils';
import rawReporter from './raw';

const rawEnvReporter = (results, options, callback) => {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  const { environmentData, ...toolOptions } = options;
  rawReporter(results, toolOptions, raw => {
    const env = getEnvironmentData(environmentData);
    callback({ raw, env });
  });
};

export default rawEnvReporter;

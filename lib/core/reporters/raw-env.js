import { getEnvironmentData } from '../utils';
import rawReporter from './raw';

const rawEnvReporter = (results, options, callback) => {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  const environmentData = options.environmentData;
  delete options.environmentData
  function rawCallback(raw) {
    const env = getEnvironmentData(environmentData);
    callback({ raw, env });
  }

  rawReporter(results, options, rawCallback);
};

export default rawEnvReporter;

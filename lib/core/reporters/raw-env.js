import { getReporter } from '../public';
import { getEnvironmentData } from './helpers';

function rawEnvReporter(results, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  function rawCallback(raw) {
    const env = getEnvironmentData();
    callback({ raw, env });
  }
  getReporter('raw')(results, options, rawCallback);
}

export default rawEnvReporter;

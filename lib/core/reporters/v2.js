import { processAggregate } from './helpers';
import { getEnvironmentData } from '../utils';

const v2Reporter = (results, options, callback) => {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  const environmentData = options.environmentData;
  delete options.environmentData;

  var out = processAggregate(results, options);
  callback({
    ...getEnvironmentData(environmentData),
    toolOptions: options,
    violations: out.violations,
    passes: out.passes,
    incomplete: out.incomplete,
    inapplicable: out.inapplicable
  });
};

export default v2Reporter;

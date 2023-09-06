import { nodeSerializer } from '../utils';

const rawReporter = (results, options, callback) => {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  // Guard against tests which don't pass an array as the first param here.
  if (!results || !Array.isArray(results)) {
    return callback(results);
  }

  const transformedResults = results.map(result => {
    const transformedResult = { ...result };
    const types = ['passes', 'violations', 'incomplete', 'inapplicable'];
    for (const type of types) {
      transformedResult[type] = nodeSerializer.mapRawNodeResults(
        transformedResult[type]
      );
    }

    return transformedResult;
  });

  callback(transformedResults);
};

export default rawReporter;

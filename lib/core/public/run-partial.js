import Context from '../base/context';
import teardown from './teardown';
import {
  nodeSerializer,
  getSelectorData,
  assert,
  getEnvironmentData
} from '../utils';
import normalizeRunParams from './run/normalize-run-params';

export default function runPartial(...args) {
  const { options, context } = normalizeRunParams(args);
  assert(axe._audit, 'Axe is not configured. Audit is missing.');
  assert(
    !axe._running,
    'Axe is already running. Use `await axe.run()` to wait ' +
      'for the previous run to finish before starting a new run.'
  );

  const contextObj = new Context(context, axe._tree);
  axe._tree = contextObj.flatTree;
  axe._selectorData = getSelectorData(contextObj.flatTree);
  axe._running = true;

  // Even in the top frame, we don't support this with runPartial
  options.elementRef = false;

  return (
    new Promise((res, rej) => {
      axe._audit.run(contextObj, options, res, rej);
    })
      .then(results => {
        results = nodeSerializer.mapRawResults(results);
        const frames = contextObj.frames.map(({ node }) => {
          return nodeSerializer.toSpec(node);
        });
        let environmentData;
        if (contextObj.initiator) {
          environmentData = getEnvironmentData();
        }
        axe._running = false;
        teardown();
        return { results, frames, environmentData };
      })
      // Avoid .finally() to deal with Mocha 9 + IE issues
      .catch(err => {
        axe._running = false;
        teardown();
        return Promise.reject(err);
      })
  );
}

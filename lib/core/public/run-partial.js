import Context from '../base/context';
import teardown from './teardown';
import { DqElement, getSelectorData, assert } from '../utils';
import normalizeRunParams from './run/normalize-run-params'

export default function runPartial(...args) {
  let { options, context } = normalizeRunParams(args)
  assert(axe._audit, 'Axe is not configured. Audit is missing.')
  assert(!axe._running,
    'Axe is already running. Use `await axe.run()` to wait ' +
    'for the previous run to finish before starting a new run.'
  );

  context = new Context(context, axe._tree);
  axe._tree = context.flatTree;
  axe._selectorData = getSelectorData(context.flatTree);
  axe._running = true;

  return new Promise((res, rej) => {
    axe._audit.run(context, options, res, rej);
  })
  .then(results => {
    results = results.map(({ nodes, ...result }) => ({
      nodes: nodes.map(serializeNode),
      ...result
    }));
    const frames = context.frames.map(({ node }) => {
      return new DqElement(node, options).toJSON()
    });
    return { results, frames };
  })
  .finally(() => {
    axe._running = false;
    teardown();
  })
}

function serializeNode({ node, ...nodeResult }) {
  nodeResult.node = node.toJSON();
  for (const type of ['any', 'all', 'none']) {
    nodeResult[type] = nodeResult[type].map(({ relatedNodes, ...checkResult }) => ({
      ...checkResult,
      relatedNodes: relatedNodes.map(node => node.toJSON())
    }))
  }
  return nodeResult;
}

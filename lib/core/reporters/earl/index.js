import context from './context';
import earlAssertion from './earl-assertion';
import { getEnvironmentData } from '../../utils';

const AXE_TO_EARL_OUTCOME = {
  passes: 'passed',
  violations: 'failed',
  incomplete: 'cantTell',
  inapplicable: 'inapplicable'
};
const RESULT_GROUPS = ['passes', 'incomplete', 'inapplicable', 'violations'];

/**
 * EARL reporter. Produces a W3C EARL (Evaluation and Report Language) report as
 * a JSON-LD document of the shape `{ "@context", "@graph" }`, where `@graph` is
 * an array of EARL Assertions — one per tested node, plus one per inapplicable
 * rule. Opt in with `axe.run(document, { reporter: 'earl' })`.
 *
 * @see https://www.w3.org/TR/EARL10-Schema/
 */
export default function earlReporter(results, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  // Mirror the raw reporter: a non-array first argument (e.g. an error object
  // the results pipeline forwarded) is passed through untouched, not crashed on.
  if (!results || !Array.isArray(results)) {
    return callback(results);
  }

  const { environmentData } = options;
  const source = getEnvironmentData(environmentData).url ?? '';
  const version = axe.version;

  const graph = [];
  results.forEach(ruleResult => {
    const { id: ruleId, tags = [], result } = ruleResult;

    if (result === 'inapplicable') {
      graph.push(
        earlAssertion({
          outcome: 'inapplicable',
          ruleId,
          source,
          tags,
          version
        })
      );
      return;
    }

    RESULT_GROUPS.forEach(group => {
      (ruleResult[group] || []).forEach(() => {
        graph.push(
          earlAssertion({
            outcome: AXE_TO_EARL_OUTCOME[group] ?? group,
            ruleId,
            tags,
            source,
            version
          })
        );
      });
    });
  });

  callback({
    '@context': context,
    '@graph': graph
  });
}

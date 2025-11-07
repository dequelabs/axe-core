import { processAggregate, failureSummary } from './helpers';
import { getEnvironmentData } from '../utils';

const v3Reporter = (results, options, callback) => {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  const { environmentData, ...toolOptions } = options;
  const out = processAggregate(results, options);

  const addFailureSummaries = result => {
    result.nodes.forEach(nodeResult => {
      nodeResult.failureSummary = failureSummary(nodeResult);
    });
  };

  out.incomplete.forEach(addFailureSummaries);
  out.violations.forEach(addFailureSummaries);

  const mergedIssues = [...out.violations, ...out.incomplete];

  const byImpactMap = {};
  mergedIssues.forEach(issue => {
    const key = issue.impact || 'none';
    if (!byImpactMap[key]) {byImpactMap[key] = [];}
    byImpactMap[key].push(issue);
  });

  const impactOrder = ['critical', 'serious', 'moderate', 'minor', 'none'];
  const byImpact = impactOrder
    .map(impact => ({
      impact,
      issues: byImpactMap[impact] || []
    }))
    .filter(group => group.issues.length > 0);

  callback({
    ...getEnvironmentData(environmentData),
    toolOptions,
    ...out,
    byImpact
  });
};

export default v3Reporter;

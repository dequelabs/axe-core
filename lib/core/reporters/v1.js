import { processAggregate, failureSummary } from './helpers';
import { getEnvironmentData, getSelector, performanceTimer } from '../utils';

let reporterStart;
let processAggregateStart;
let failureSummaryStart;
let getEnvironmentDataStart;

let reporterTime = 0;
let processAggregateTime = 0;
let failureSummaryTime = 0;
let getEnvironmentDataTime = 0;

const v1Reporter = (results, options, callback) => {
  reporterStart = window.performance.now();
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  const { environmentData, ...toolOptions } = options;

  processAggregateStart = window.performance.now();
  const out = processAggregate(results, options);
  processAggregateTime += window.performance.now() - processAggregateStart;

  const addFailureSummaries = result => {
    result.nodes.forEach(nodeResult => {
      nodeResult.failureSummary = failureSummary(nodeResult);
    });
  };

  failureSummaryStart = window.performance.now();
  out.incomplete.forEach(addFailureSummaries);
  out.violations.forEach(addFailureSummaries);
  failureSummaryTime += window.performance.now() - failureSummaryStart;


  getEnvironmentDataStart = window.performance.now();
  const envData = getEnvironmentData(environmentData);
  getEnvironmentDataTime += window.performance.now() - getEnvironmentDataStart;

  reporterTime += window.performance.now() - reporterStart;
  callback({
    ...envData,
    toolOptions,
    ...out
  });
};
v1Reporter._logTime = function() {
  performanceTimer._log('Measure reporter#reporter took ' + reporterTime + 'ms');
  performanceTimer._log('Measure reporter#processAggregate took ' + processAggregateTime + 'ms');
  performanceTimer._log('Measure reporter#failureSummary took ' + failureSummaryTime + 'ms');
  performanceTimer._log('Measure reporter#getEnvironmentData took ' + getEnvironmentDataTime + 'ms');

  getSelector._logTime();
  processAggregate._logTime();
}

export default v1Reporter;

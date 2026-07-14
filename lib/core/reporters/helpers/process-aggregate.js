import constants from '../../constants';
import { nodeSerializer, performanceTimer } from '../../utils';

const resultKeys = constants.resultGroups;

/**
 * Configures the processing of axe results.
 *
 * @typedef ProcessOptions
 * @property {Array} resultsTypes limit the types of results to process ('passes', 'violations', etc.)
 * @property {Boolean} elementRef display node's element references
 * @property {Boolean} selectors display node's selectors
 * @property {Boolean} xpath display node's xpaths
 */

/**
 * Aggregate and process the axe results,
 * adding desired data to nodes and relatedNodes in each rule result.
 *
 * Prepares result data for reporters.
 *
 * @method processAggregate
 * @memberof helpers
 * @param	{Array} results
 * @param	{ProcessOptions} options
 * @return {Object}
 *
 */
let aggregateResultStart;
let objectAssignStart;
let trimElementSpecProcessStart;
let normalizeRelatedNodesStart;

let aggregateResultTime = 0;
let objectAssignTime = 0;
let trimElementSpecProcessTime = 0;
let normalizeRelatedNodesTime = 0;

export default function processAggregate(results, options) {
  aggregateResultStart = window.performance.now();
  const resultObject = axe.utils.aggregateResult(results);
  aggregateResultTime += window.performance.now() - aggregateResultStart;

  resultKeys.forEach(key => {
    if (options.resultTypes && !options.resultTypes.includes(key)) {
      // If the user asks us to, truncate certain finding types to maximum one finding
      (resultObject[key] || []).forEach(ruleResult => {
        if (Array.isArray(ruleResult.nodes) && ruleResult.nodes.length > 0) {
          ruleResult.nodes = [ruleResult.nodes[0]];
        }
      });
    }

    resultObject[key] = (resultObject[key] || []).map(ruleResult => {
      objectAssignStart = window.performance.now();
      ruleResult = Object.assign({}, ruleResult);
      objectAssignTime += window.performance.now() - objectAssignStart;

      if (Array.isArray(ruleResult.nodes) && ruleResult.nodes.length > 0) {
        ruleResult.nodes = ruleResult.nodes.map(subResult => {
          if (typeof subResult.node === 'object') {
            trimElementSpecProcessStart = window.performance.now();
            const serialElm = trimElementSpec(subResult.node, options);
            trimElementSpecProcessTime += window.performance.now() - trimElementSpecProcessStart;

            objectAssignStart = window.performance.now();
            Object.assign(subResult, serialElm);
            objectAssignTime += window.performance.now() - objectAssignStart;
          }
          delete subResult.result;
          delete subResult.node;

          normalizeRelatedNodesStart = window.performance.now();
          normalizeRelatedNodes(subResult, options);
          normalizeRelatedNodesTime += window.performance.now() - normalizeRelatedNodesStart;

          return subResult;
        });
      }

      resultKeys.forEach(resultKey => delete ruleResult[resultKey]);
      delete ruleResult.pageLevel;
      delete ruleResult.result;

      return ruleResult;
    });
  });

  return resultObject;
}

function normalizeRelatedNodes(node, options) {
  ['any', 'all', 'none'].forEach(type => {
    if (!Array.isArray(node[type])) {
      return;
    }
    node[type]
      .filter(checkRes => Array.isArray(checkRes.relatedNodes))
      .forEach(checkRes => {
        checkRes.relatedNodes = checkRes.relatedNodes.map(relatedNode => {
          return trimElementSpec(relatedNode, options);
        });
      });
  });
}

let nodeSerializerStart;
let sourceStart;
let elementStart;
let selectorStart;
let ancestryStart;
let xpathStart;

let nodeSerializerTime = 0;
let sourceTime = 0;
let elementTime = 0;
let selectorTime = 0;
let ancestryTime = 0;
let xpathTime = 0;

function trimElementSpec(elmSpec = {}, runOptions) {
  // Pass options to limit which properties are calculated
  nodeSerializerStart = window.performance.now();
  elmSpec = nodeSerializer.dqElmToSpec(elmSpec, runOptions);
  nodeSerializerTime += window.performance.now() - nodeSerializerStart;

  const serialElm = {};
  if (axe._audit.noHtml) {
    serialElm.html = null;
  } else {
    sourceStart = window.performance.now();
    serialElm.html = elmSpec.source ?? 'Undefined';
    sourceTime += window.performance.now() - sourceStart;
  }

  if (runOptions.elementRef && !elmSpec.fromFrame) {
    elementStart = window.performance.now();
    serialElm.element = elmSpec.element ?? null;
    elementTime += window.performance.now() - elementStart;
  }

  if (runOptions.selectors !== false || elmSpec.fromFrame) {
    selectorStart = window.performance.now();
    serialElm.target = elmSpec.selector ?? [':root'];
    selectorTime += window.performance.now() - selectorStart;
  }

  if (runOptions.ancestry) {
    ancestryStart = window.performance.now();
    serialElm.ancestry = elmSpec.ancestry ?? [':root'];
    ancestryTime += window.performance.now() - ancestryStart;
  }

  if (runOptions.xpath) {
    xpathStart = window.performance.now();
    serialElm.xpath = elmSpec.xpath ?? ['/'];
    xpathTime += window.performance.now() - xpathStart;
  }
  return serialElm;
}

processAggregate._logTime = function() {
  performanceTimer._log('Measure reporter#processAggregate_aggregateResult took ' + aggregateResultTime + 'ms');
  performanceTimer._log('Measure reporter#processAggregate_objectAssign took ' + objectAssignTime + 'ms');
  performanceTimer._log('Measure reporter#processAggregate_trimElementSpecProcess took ' + trimElementSpecProcessTime + 'ms');
  performanceTimer._log('Measure reporter#processAggregate_normalizeRelatedNodes took ' + normalizeRelatedNodesTime + 'ms');
  performanceTimer._log('Measure reporter#processAggregate_trimElementSpec_nodeSerializer took ' + nodeSerializerTime + 'ms');
  performanceTimer._log('Measure reporter#processAggregate_trimElementSpec_source took ' + sourceTime + 'ms');
  performanceTimer._log('Measure reporter#processAggregate_trimElementSpec_element took ' + elementTime + 'ms');
  performanceTimer._log('Measure reporter#processAggregate_trimElementSpec_selector took ' + selectorTime + 'ms');
  performanceTimer._log('Measure reporter#processAggregate_trimElementSpec_ancestry took ' + ancestryTime + 'ms');
  performanceTimer._log('Measure reporter#processAggregate_trimElementSpec_xpath took ' + xpathTime + 'ms');

  nodeSerializer._logTime();
}
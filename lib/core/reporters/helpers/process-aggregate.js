import constants from '../../constants';
import { nodeSerializer } from '../../utils';

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
export default function processAggregate(results, options) {
  const resultObject = axe.utils.aggregateResult(results);

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
      ruleResult = Object.assign({}, ruleResult);

      if (Array.isArray(ruleResult.nodes) && ruleResult.nodes.length > 0) {
        ruleResult.nodes = ruleResult.nodes.map(subResult => {
          if (typeof subResult.node === 'object') {
            const serialElm = trimElementSpec(subResult.node, options);
            Object.assign(subResult, serialElm);
          }
          delete subResult.result;
          delete subResult.node;

          normalizeRelatedNodes(subResult, options);

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

function trimElementSpec(elmSpec = {}, runOptions) {
  // Pass options to limit which properties are calculated
  elmSpec = nodeSerializer.dqElmToSpec(elmSpec, runOptions);
  const serialElm = {};
  if (axe._audit.noHtml) {
    serialElm.html = null;
  } else {
    serialElm.html = elmSpec.source ?? 'Undefined';
  }
  if (runOptions.elementRef && !elmSpec.fromFrame) {
    serialElm.element = elmSpec.element ?? null;
  }
  if (runOptions.selectors !== false || elmSpec.fromFrame) {
    serialElm.target = elmSpec.selector ?? [':root'];
  }
  if (runOptions.ancestry) {
    serialElm.ancestry = elmSpec.ancestry ?? [':root'];
  }
  if (runOptions.xpath) {
    serialElm.xpath = elmSpec.xpath ?? ['/'];
  }
  return serialElm;
}

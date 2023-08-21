import assert from './assert';
import DqElement from './dq-element';

let customSerializer = null;

const nodeSerializer = {
  /**
   * @param {Object} newSerializer
   * @property {Function} toSpec (Optional) Converts a DqElement to a "spec", a form
   * suitable for JSON.stringify to consume. Output must include all properties
   * that DqElement.toJSON() would have. Will always be invoked from the
   * input element's original page context.
   * @property {Function} mergeSpecs (Optional) Merges two specs (produced by toSpec) which
   * represent element's parent frame and an element, respectively. Will
   * *not* necessarily be invoked from *either* node's original page context.
   * This operation must be associative, that is, these two expressions must
   * produce the same result:
   * - mergeSpecs(a, mergeSpecs(b, c))
   * - mergeSpecs(mergeSpecs(a, b), c)
   */
  update(serializer) {
    assert(typeof serializer === 'object', 'serializer must be an object');
    customSerializer = serializer;
  },

  /**
   * Converts an Element or VirtualNode to something that can be serialized.
   * @param {Element|VirtualNode} node
   * @return {Object} A "spec", a form suitable for JSON.stringify to consume.
   */
  toSpec(node) {
    return nodeSerializer.dqElmToSpec(new DqElement(node));
  },

  /**
   * Converts an DqElement to a serializable object. Optionally provide runOptions
   * to limit which properties are included.
   * @param {DqElement|SpecObject} dqElm
   * @param {Object} runOptions (Optional) Set of options passed into rules or checks
   * @param {Boolean} runOptions.selectors (Optional) Include selector in output
   * @param {Boolean} runOptions.ancestry (Optional) Include ancestry in output
   * @param {Boolean} runOptions.xpath (Optional) Include xpath in output
   * @return {SpecObject} A "spec", a form suitable for JSON.stringify to consume.
   */
  dqElmToSpec(dqElm, runOptions) {
    if (dqElm instanceof DqElement === false) {
      return dqElm;
    }
    // Optionally remove selector, ancestry, xpath
    // to prevent unnecessary calculations
    if (runOptions) {
      dqElm = cloneLimitedDqElement(dqElm, runOptions);
    }

    if (typeof customSerializer?.toSpec === 'function') {
      return customSerializer.toSpec(dqElm);
    }
    return dqElm.toJSON();
  },

  /**
   * Merges two specs (produced by toSpec) which represent
   * element's parent frame and an element,
   * @param {Object} nodeSpec
   * @param {Object} parentFrameSpec
   * @returns {Object} The merged spec
   */
  mergeSpecs(nodeSpec, parentFrameSpec) {
    if (typeof customSerializer?.mergeSpecs === 'function') {
      return customSerializer.mergeSpecs(nodeSpec, parentFrameSpec);
    }
    return DqElement.mergeSpecs(nodeSpec, parentFrameSpec);
  },

  /**
   * Convert DqElements in RawResults to serialized nodes
   * @param {undefined|RawNodeResult[]} rawResults
   * @returns {undefined|RawNodeResult[]}
   */
  mapRawResults(rawResults) {
    return rawResults.map(rawResult => ({
      ...rawResult,
      nodes: nodeSerializer.mapRawNodeResults(rawResult.nodes)
    }));
  },

  /**
   * Convert DqElements in RawNodeResults to serialized nodes
   * @param {undefined|RawNodeResult[]} rawResults
   * @returns {undefined|RawNodeResult[]}
   */
  mapRawNodeResults(nodeResults) {
    return nodeResults?.map(({ node, ...nodeResult }) => {
      nodeResult.node = nodeSerializer.dqElmToSpec(node);

      for (const type of ['any', 'all', 'none']) {
        nodeResult[type] = nodeResult[type].map(
          ({ relatedNodes, ...checkResult }) => {
            checkResult.relatedNodes = relatedNodes.map(
              nodeSerializer.dqElmToSpec
            );
            return checkResult;
          }
        );
      }
      return nodeResult;
    });
  }
};

export default nodeSerializer;

/**
 * Create a new DqElement with only the properties we actually want serialized
 * This prevents nodeSerializer from generating selectors / xpath / ancestry
 * when it's not needed. The rest is dummy data to prevent possible errors.
 */
function cloneLimitedDqElement(dqElm, runOptions) {
  const fromFrame = dqElm.fromFrame;
  const { ancestry: hasAncestry, xpath: hasXpath } = runOptions;
  const hasSelectors = runOptions.selectors !== false || fromFrame;

  dqElm = new DqElement(dqElm.element, runOptions, {
    source: dqElm.source,
    nodeIndexes: dqElm.nodeIndexes,
    selector: hasSelectors ? dqElm.selector : [':root'],
    ancestry: hasAncestry ? dqElm.ancestry : [':root'],
    xpath: hasXpath ? dqElm.xpath : '/'
  });

  dqElm.fromFrame = fromFrame;
  return dqElm;
}

import assert from './assert';
import DqElement from './dq-element';

let customSerializer = null;

const nodeSerializer = {
  /**
   * @param {Object} newSerializer
   * @property {Function} toSpec (Optional) Converts an Element or VirtualNode to a "spec", a form
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
   * Converts an DqElement to a serializable object
   * @param {DqElement|SpecObject} dqElm
   * @return {SpecObject} A "spec", a form suitable for JSON.stringify to consume.
   */
  dqElmToSpec(dqElm) {
    if (dqElm instanceof DqElement === false) {
      return dqElm;
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

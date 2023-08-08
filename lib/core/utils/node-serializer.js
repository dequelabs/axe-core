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
   * @param {DqElement} node
   * @return {Object} A "spec", a form suitable for JSON.stringify to consume.
   */
  dqElmToSpec(dqElm) {
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
   * Convert DqElement on RawResult to serialized nodes
   * @param {RawResult[]} rawResults
   * @returns {RawResult[]}
   */
  mapRawResults(rawResults) {
    return rawResults.map(({ nodes, ...result }) => {
      result.nodes = nodeSerializer.mapRawNodeResults(nodes);
      return result;
    });
  },

  /**
   * Convert DqElement on RawNodeResult to serialized nodes
   * @param {RawNodeResult[]} rawResults
   * @returns {RawNodeResult[]}
   */
  mapRawNodeResults(nodeResults) {
    return nodeResults.map(({ node, ...nodeResult }) => {
      // Elements could already be serialized.
      if (node instanceof DqElement) {
        node = nodeSerializer.dqElmToSpec(node);
      }
      nodeResult.node = node;

      for (const type of ['any', 'all', 'none']) {
        nodeResult[type] = nodeResult[type].map(
          ({ relatedNodes, ...checkResult }) => {
            checkResult.relatedNodes = relatedNodes.map(relatedNode => {
              if (relatedNode instanceof DqElement) {
                return nodeSerializer.dqElmToSpec(relatedNode);
              }
              return relatedNode;
            });
            return checkResult;
          }
        );
      }
      return nodeResult;
    });
  }
};

export default nodeSerializer;

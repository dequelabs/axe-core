import assert from './assert';
import DqElement from './dq-element';

let serializer = null;

export default {
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
  update(newSerializer) {
    assert(typeof serializer === 'object', 'serializer must be an object');
    serializer = newSerializer;
  },

  /**
   * Converts an Element or VirtualNode to something that can be serialized.
   * @param {Element|VirtualNode} node
   * @return {Object} A "spec", a form suitable for JSON.stringify to consume.
   */
  toSpec(node) {
    const dqElm = new DqElement(node);
    if (typeof serializer?.toSpec === 'function') {
      return serializer.toSpec(dqElm);
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
    if (typeof serializer?.mergeSpecs === 'function') {
      return serializer.mergeSpecs(nodeSpec, parentFrameSpec);
    }
    return DqElement.mergeSpecs(nodeSpec, parentFrameSpec);
  }
};

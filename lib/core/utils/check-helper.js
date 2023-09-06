import toArray from './to-array';
import DqElement from './dq-element';
import AbstractVirtualNode from '../base/virtual-node/abstract-virtual-node';

/**
 * Helper to denote which checks are asyncronous and provide callbacks and pass data back to the CheckResult
 * @param  {CheckResult}   checkResult The target object
 * @param  {Function} callback    The callback to expose when `this.async()` is called
 * @return {Object}               Bound to `this` for a check's fn
 */
function checkHelper(checkResult, options, resolve, reject) {
  return {
    isAsync: false,
    async() {
      this.isAsync = true;
      return result => {
        if (result instanceof Error === false) {
          checkResult.result = result;
          resolve(checkResult);
        } else {
          reject(result);
        }
      };
    },
    data(data) {
      checkResult.data = data;
    },
    relatedNodes(nodes) {
      if (!window.Node) {
        return;
      }
      if (
        nodes instanceof window.Node ||
        nodes instanceof AbstractVirtualNode
      ) {
        nodes = [nodes];
      } else {
        nodes = toArray(nodes);
      }
      checkResult.relatedNodes = [];
      nodes.forEach(node => {
        if (node instanceof AbstractVirtualNode) {
          node = node.actualNode;
        }
        if (node instanceof window.Node) {
          const dqElm = new DqElement(node);
          checkResult.relatedNodes.push(dqElm);
        }
      });
    }
  };
}

export default checkHelper;

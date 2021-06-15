import getSelector from './get-selector';
import getAncestry from './get-ancestry';
import getXpath from './get-xpath';
import getNodeFromTree from './get-node-from-tree';
import AbstractVirtualNode from '../base/virtual-node/abstract-virtual-node';

function truncate(str, maxLength) {
  maxLength = maxLength || 300;

  if (str.length > maxLength) {
    var index = str.indexOf('>');
    str = str.substring(0, index + 1);
  }

  return str;
}

function getSource(element) {
  if (!element?.outerHTML) {
    return '';
  }
  var source = element.outerHTML;
  if (!source && typeof XMLSerializer === 'function') {
    source = new XMLSerializer().serializeToString(element);
  }
  return truncate(source || '');
}

/**
 * "Serialized" `HTMLElement`. It will calculate the CSS selector,
 * grab the source (outerHTML) and offer an array for storing frame paths
 * @param {HTMLElement} element The element to serialize
 * @param {Object} spec Properties to use in place of the element when instantiated on Elements from other frames
 */
function DqElement(elm, options = {}, spec = {}) {
  this.spec = spec;
  if (elm instanceof AbstractVirtualNode) {
    this._virtualNode = elm;
    this._element = elm.actualNode;
  } else {
    this._element = elm;
    this._virtualNode = getNodeFromTree(elm);
  }

  /**
   * Whether DqElement was created from an iframe
   * @type {boolean}
   */
  this.fromFrame = this.spec.selector?.length > 1;

  if (options.absolutePaths) {
    this._options = { toRoot: true };
  }

  /**
   * Number by which nodes in the flat tree can be sorted
   * @type {Number}
   */
  this.nodeIndexes = [];
  if (Array.isArray(this.spec.nodeIndexes)) {
    this.nodeIndexes = this.spec.nodeIndexes;
  } else if (typeof this._virtualNode?.nodeIndex === 'number') {
    this.nodeIndexes = [this._virtualNode.nodeIndex];
  }

  /**
   * The generated HTML source code of the element
   * @type {String|null}
   */
  this.source = null;
  // TODO: es-modules_audit
  if (!axe._audit.noHtml) {
    this.source = this.spec.source ?? getSource(this._element);
  }
}

DqElement.prototype = {
  /**
   * A unique CSS selector for the element, designed for readability
   * @return {String}
   */
  get selector() {
    return this.spec.selector || [getSelector(this.element, this._options)];
  },

  /**
   * A unique CSS selector for the element, including its ancestors down to the root node
   * @return {String}
   */
  get ancestry() {
    return this.spec.ancestry || [getAncestry(this.element)];
  },

  /**
   * Xpath to the element
   * @return {String}
   */
  get xpath() {
    return this.spec.xpath || [getXpath(this.element)];
  },

  /**
   * Direct reference to the `HTMLElement` wrapped by this `DQElement`.
   */
  get element() {
    return this._element;
  },

  toJSON() {
    return {
      selector: this.selector,
      source: this.source,
      xpath: this.xpath,
      ancestry: this.ancestry,
      nodeIndexes: this.nodeIndexes
    };
  }
};

DqElement.fromFrame = function fromFrame(node, options, frame) {
  const spec = {
    ...node,
    selector: [...frame.selector, ...node.selector],
    ancestry: [...frame.ancestry, ...node.ancestry],
    xpath: [...frame.xpath, ...node.xpath],
    nodeIndexes: [...frame.nodeIndexes, ...node.nodeIndexes]
  };
  return new DqElement(frame.element, options, spec);
};

export default DqElement;

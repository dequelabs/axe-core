const whitespaceRegex = /[\t\r\n\f]/g;

// Monotonically increasing id, used to give every virtual node a unique string
// form. Deliberately not `nodeIndex`: that counter resets to 0 whenever a
// parentless VirtualNode is constructed, which happens mid-run in create-grid,
// so two live nodes can share a nodeIndex within a single run.
let uid = 0;

class AbstractVirtualNode {
  constructor() {
    this.parent = undefined;
    this._uid = String(uid++);
  }

  /**
   * Unique string form of the node, so that memoized functions taking a
   * virtual node can use memoizee's primitive mode.
   * @return {String}
   */
  toString() {
    return this._uid;
  }

  get props() {
    throw new Error(
      'VirtualNode class must have a "props" object consisting ' +
        'of "nodeType" and "nodeName" properties'
    );
  }

  get attrNames() {
    throw new Error('VirtualNode class must have an "attrNames" property');
  }

  attr() {
    throw new Error('VirtualNode class must have an "attr" function');
  }

  hasAttr() {
    throw new Error('VirtualNode class must have a "hasAttr" function');
  }

  hasClass(className) {
    // get the value of the class attribute as svgs return a SVGAnimatedString
    // if you access the className property
    const classAttr = this.attr('class');
    if (!classAttr) {
      return false;
    }

    const selector = ' ' + className + ' ';
    return (
      (' ' + classAttr + ' ').replace(whitespaceRegex, ' ').indexOf(selector) >=
      0
    );
  }
}

export default AbstractVirtualNode;

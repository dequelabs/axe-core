/* global axe, dom */
/**
 * Get elements from point across shadow dom boundaries
 * @method shadowElementsFromPoint
 * @memberof axe.commons.dom
 * @instance
 * @param {Number} nodeX X coordinates of point
 * @param {Number} nodeY Y coordinates of point
 * @param {Object} [root] Shadow root or document root
 * @return {Array}
 */
dom.shadowElementsFromPoint = function(nodeX, nodeY, root = document) {
  return root.elementsFromPoint(nodeX, nodeY)
    .reduce((stack, elm) => {
      if (axe.utils.isShadowRoot(elm)) {
        const shadowStack = dom.shadowElementsFromPoint(nodeX, nodeY, elm.shadowRoot);
        stack = stack.concat(shadowStack);
        // filter host nodes which get included regardless of overlap
        // TODO: refactor multiline overlap checking inside shadow dom
        if (stack.length && axe.commons.dom.visuallyContains(stack[0], elm)) {
        	stack.push(elm);
        }
      } else {
      	stack.push(elm);
      }
      return stack;
    }, []);
};

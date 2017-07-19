/* global axe, dom */
/**
 * Find elements referenced from a given context
 * 
 * @param object {
 *    context:  Node    Element in the same context
 *    value:    String  attribute value to search for
 *    attr:     String  attribute name to search for
 *    elm:      String  ndoeName to search for (optional)
 *  }
 * @return Array[Node]  
 */
dom.findElmsInContext = function ({ context, value, attr, elm = '' }) {
  let root;
  const escapedValue = axe.utils.escapeSelector(value);

  if (context.nodeType === 9 || context.nodeType === 11) { // It's already root
    root = context;
  } else {
    root = dom.getRootNode(context);
  }
  return Array.from(
    root.querySelectorAll(elm + '[' + attr + '=' + escapedValue + ']')
  );
};

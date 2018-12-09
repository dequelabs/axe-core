/* global matches */
matches.attributes = function matchesAttributes (node, matcher) {
  node = node.actualNode || node;
  return matches.fromFunction(
    attrName => node.getAttribute(attrName),
    matcher
  )
}

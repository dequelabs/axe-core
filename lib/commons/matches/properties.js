/* global matches */
matches.properties = function matchesProperties (node, matcher) {
  node = node.actualNode || node;
  const out = matches.fromFunction(
    propName => node[propName],
    matcher
  )
  return out
}

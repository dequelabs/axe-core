/* global matches */
const matchers = [
  'nodeName',
  'attributes',
  'properties',
  'condition'
]

matches.fromDefinition = function matchFromDefinition (node, definition) {
  node = node.actualNode || node;
	if (Array.isArray(definition)) {
		return definition.some(definition => matches(node, definition));
  }
	if (typeof definition === 'string') {
		return axe.utils.matchesSelector(node, definition);
  }

  return Object.keys(definition)
  .every(matcherName => {
    if (!matchers.includes(matcherName)) {
      console.log(definition)
      throw new Error(`Unknown matcher type "${matcherName}"`)
    }
    const matchMethod = matches[matcherName]
    const matcher = definition[matcherName]
    return matchMethod(node, matcher)
  })
}

matches.condition = function (node, condition) {
  return !condition || condition(node)
}

function scopeValueEvaluate(node, options, virtualNode) {
  const value = virtualNode.attr('scope').toLowerCase();

  return options.values.indexOf(value) !== -1;
}

export default scopeValueEvaluate;

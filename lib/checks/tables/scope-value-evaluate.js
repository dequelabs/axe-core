function scopeValueEvaluate(node, options) {
  const value = node.getAttribute('scope').toLowerCase();

  return options.values.indexOf(value) !== -1;
}

export default scopeValueEvaluate;

const base = axe.utils.DqElement.defaultSerializer;
axe.utils.DqElement.setSerializer({
  toSpec: function toSpec(dqElm) {
    const result = base.toSpec(dqElm);
    result.source = dqElm.element.id;
    return result;
  },
  mergeSpecs: function mergeSpecs(parentSpec, childSpec) {
    const result = base.mergeSpecs(parentSpec, childSpec);
    result.source = `${parentSpec.source} > ${childSpec.source}`;
    return result;
  }
});

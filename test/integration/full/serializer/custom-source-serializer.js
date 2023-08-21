axe.utils.nodeSerializer.update({
  toSpec(dqElm) {
    const result = dqElm.toJSON();
    result.source = dqElm.element.id;
    return result;
  },
  mergeSpecs(childSpec, parentSpec) {
    const result = axe.utils.DqElement.mergeSpecs(childSpec, parentSpec);
    result.source = `${parentSpec.source} > ${childSpec.source}`;
    return result;
  }
});

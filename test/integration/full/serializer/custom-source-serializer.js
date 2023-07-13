axe.utils.DqElement.setSerializer({
  serializeNode: function customSerializeNode(node) {
    const result = axe.utils.DqElement.defaultSerializer.serializeNode(node);
    result.id = node.element.id;
    return result;
  },
  mergeSpecs: function customMergeSpecs(nodeSpec, frameSpec) {
    const result = axe.utils.DqElement.defaultSerializer.mergeSpecs(
      nodeSpec,
      frameSpec
    );
    result.source = `${frameSpec.source}\n\n# Inside ${frameSpec.id}.contentWindow:\n${nodeSpec.source}`;
    return result;
  }
});

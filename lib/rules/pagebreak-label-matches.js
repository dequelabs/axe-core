function pagebreakLabelMatches(node) {
  // selector: '[*|type~="pagebreak"], [role~="doc-pagebreak"]',
  return (
    (node.hasAttribute('role') &&
      node.getAttribute('role').match(/\S+/g).includes('doc-pagebreak')) ||
    (node.hasAttributeNS('http://www.idpf.org/2007/ops', 'type') &&
      node
        .getAttributeNS('http://www.idpf.org/2007/ops', 'type')
        .match(/\S+/g)
        .includes('pagebreak'))
  );

  return false;
}

export default pagebreakLabelMatches;

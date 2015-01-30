
var index = node.src.lastIndexOf('/'),
  displayName = node.src.substr(index + 1);

return {
  classifiedType: null,
  displayName: displayName,
  properties: {
    altText: node.alt
  }
};

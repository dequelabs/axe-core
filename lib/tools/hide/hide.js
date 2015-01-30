
var hidden = [];
return {
  run: function (node, options, callback) {
    hidden.push({
      node: node,
      style: node.style.visibility
    });
    node.style.visibility = 'hidden';
    callback();
  },
  cleanup: function (callback) {
    hidden.forEach(function (element) {
      element.node.style.visibility = element.style;
    });
    hidden = [];
    callback();
  }
};

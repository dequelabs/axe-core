var skip = ['SPAN'];
if (!axe.commons.dom.isVisible(node, true) && skip.indexOf(node.nodeName.toUpperCase()) > -1) {
  return true;
}
return undefined;

let nodeText = axe.commons.text.accessibleText(node);
let nodeDescibedBy = axe.commons.aria.ariaDescribedby(node);

let elems = axe.utils.querySelectorAll(axe._tree, 'a[href]');
return !Array.from(elems).some(function(element) {
  return (
    nodeText === axe.commons.text.accessibleText(element.actualNode) &&
    nodeDescibedBy === axe.commons.aria.ariaDescribedby(element.actualNode) &&
    node.title === element.actualNode.title &&
    node.href !== element.actualNode.href
  );
});

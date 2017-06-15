let styles = window.getComputedStyle(node);
let nodeName = node.nodeName.toUpperCase();
let skipOver = ['HEAD', 'TEMPLATE', 'SCRIPT'];

if (skipOver.indexOf(nodeName) < 0 && axe.commons.dom.hasContent(node)) {
  if (styles.getPropertyValue('display') === 'none') {
    return undefined;
  } else if (styles.getPropertyValue('visibility') === 'hidden') {
    if (node.parentNode) {
      var parentStyle = window.getComputedStyle(node.parentNode);
    }
    if (!parentStyle || parentStyle.getPropertyValue('visibility') !== 'hidden') {
      return undefined;
    }
  }
}
return true;

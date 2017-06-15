let styles = window.getComputedStyle(node);

let whitelist = ['SCRIPT', 'HEAD', 'TITLE', 'NOSCRIPT', 'STYLE', 'TEMPLATE'];
if (!whitelist.includes(node.tagName.toUpperCase()) && axe.commons.dom.hasContent(node)) {
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

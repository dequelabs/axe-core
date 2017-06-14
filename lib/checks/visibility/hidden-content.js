let styles = window.getComputedStyle(node);

if (axe.commons.dom.hasContent(node)) {
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

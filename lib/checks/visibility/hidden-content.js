let styles = window.getComputedStyle(node);

if (axe.commons.dom.hasContent(node)) {
  if (styles.getPropertyValue('display') === 'none' || styles.getPropertyValue('visibility') === 'hidden') {
    return undefined;
  }
}
return true;

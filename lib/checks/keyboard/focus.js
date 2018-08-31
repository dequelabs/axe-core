let content = node.onfocus;
if (content.toString() === 'function onfocus(event) {\nthis.blur()\n}') {
  return false;
} else if (content.toString().indexOf('this.blur()') > -1) {
  return undefined;
} else {
  return true;
}

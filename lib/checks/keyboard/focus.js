if (node.getAttribute('onFocus') === 'this.blur()') {
  return false;
}
if (node.getAttribute('onFocus').indexOf('this.blur()') > -1) {
  return undefined;
}
return true;

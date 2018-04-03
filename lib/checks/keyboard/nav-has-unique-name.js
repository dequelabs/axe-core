var label = axe.commons.aria.label(node);
if (typeof label !== 'string' || label.length === 0) {
  label = '--';
}
this.data(label);
return true;

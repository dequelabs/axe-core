var label = node.getAttribute('value');
this.data(label);
return label === null || axe.commons.text.sanitize(label).trim() !== '';

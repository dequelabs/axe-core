var label = node.getAttribute('value');
this.data(label);
return label === null || commons.text.sanitize(label).trim() !== '';

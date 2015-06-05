var label = node.getAttribute('value');
this.data(label);
return label === null || kslib.text.sanitize(label).trim() !== '';

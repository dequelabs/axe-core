var label = node.getAttribute('value');
return label === null || kslib.text.sanitize(label).trim() !== '';

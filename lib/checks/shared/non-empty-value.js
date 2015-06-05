var label = node.getAttribute('value');
return !!(label ? kslib.text.sanitize(label).trim() : '');

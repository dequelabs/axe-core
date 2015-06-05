var label = node.getAttribute('value');
return !!(label ? commons.text.sanitize(label).trim() : '');

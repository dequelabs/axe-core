var label = node.getAttribute('alt');
return !!(label ? commons.text.sanitize(label).trim() : '');
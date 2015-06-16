var label = node.getAttribute('aria-label');
return !!(label ? commons.text.sanitize(label).trim() : '');
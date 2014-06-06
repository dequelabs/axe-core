var label = node.getAttribute('title');
return !!(label ? kslib.text.sanitize(label).trim() : '');
var label = node.getAttribute('alt');
return !!(label ? kslib.text.sanitize(label).trim() : '');
var label = node.getAttribute('aria-label');
return !!(label ? kslib.text.sanitize(label).trim() : '');
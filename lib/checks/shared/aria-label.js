var label = node.getAttribute('aria-label');
return !!(label ? axe.commons.text.sanitize(label).trim() : '');
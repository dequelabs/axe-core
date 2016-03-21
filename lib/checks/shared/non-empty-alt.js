var label = node.getAttribute('alt');
return !!(label ? axe.commons.text.sanitize(label).trim() : '');

var label = node.ownerDocument.querySelector('label[for="' + kslib.utils.escapeSelector(node.id) + '"]');
return !!(label ? kslib.text.sanitize(label.innerText).trim() : '');

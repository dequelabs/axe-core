
var label = node.ownerDocument.querySelector('label[for="' + kslib.utils.escapeSelector(node.id) + '"]');
return !!kslib.text.accessibleText(label);

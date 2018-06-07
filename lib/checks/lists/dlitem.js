var parent = axe.commons.dom.getComposedParent(node);
return parent.nodeName.toUpperCase() === 'DL' && !parent.getAttribute('role');


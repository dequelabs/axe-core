var parent = axe.commons.dom.getComposedParent(node);
return (['UL', 'OL'].includes(parent.nodeName.toUpperCase()) ||
    (parent.getAttribute('role') || '').toLowerCase() === 'list');
  
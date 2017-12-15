const target = axe.commons.dom.getElementByReference(node, 'href');
return !!target && axe.commons.dom.isFocusable(target);

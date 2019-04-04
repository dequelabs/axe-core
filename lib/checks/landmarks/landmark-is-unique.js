let role = axe.commons.aria.getRole(node);
let accessibleText = axe.commons.text.accessibleText(node);
accessibleText = accessibleText ? accessibleText.toLowerCase() : null;
this.data({ role: role, accessibleText: accessibleText });
this.relatedNodes([node]);

return true;
